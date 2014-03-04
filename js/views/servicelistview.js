var app = app || {};

app.ServiceListView = Backbone.View.extend({
    itemsPerPage: 10, // number of items per page
    currentPage: 0,
    brands:[], // list of brands to show
    series:[], // list of series to show
    subset:[], // array of rendering items

    events: {
      // 'click button#add': 'addItem',
      'click li.paginator': 'changePage',
      'click a.brand': 'changeBrand',
      'click a.serie': 'changeSerie',
      'click button.ListSwitch': 'changeList'
    },

    // @method initialize
    // @param {el, url} necessary arguments
    // @return NONE
    initialize: function(arg){
        
      // el has to be defined as an argument
      this.el = arg.el;

      // number of items per page
      if(arg.items != undefined) {
        this.itemsPerPage = arg.items;
      }

      // hide serie-dropdown initially
      $('.SerieDropDown', this.el).hide();

      // initializing of the collection to render
      this.collection = new app.ServiceList({url:arg.url});

      // fetch event to render binding
      this.collection.on('success', this.render, this);
    },

    // @method render
    // @param {brand, serie} restraining arguments
    // @return NONE
    render: function(arg){

    // LOGIC PART 1/2
      // case of set restraining arguments
      if (arg != undefined) {
        if (arg.brand == 'All') {
            this.brand = undefined;
            this.serie = undefined;
            $('.BrandListTitle', this.el).html('All <span class="caret"></span>');
            this.subset = this.collection.models;
            this.currentPage = 0;
          $('.SerieDropDown', this.el).hide();

        }

        // particular brand case
        if ((arg.brand != undefined) && (arg.brand != 'All')) {
            this.serie = undefined;
          this.brand = arg.brand;
          $('.BrandListTitle', this.el).html(this.brand + ' <span class="caret"></span>');
          $('.SerieListTitle', this.el).html('All <span class="caret"></span>');
          this.subset = this.collection.where({'brand': this.brand});
          this.currentPage = 0;
          $('.SerieDropDown', this.el).show();
        }

        // particular brand and particular serie case
        if ((arg.serie != undefined) && (arg.serie != 'All')) {
          this.serie = arg.serie;
          $('.SerieListTitle', this.el).html(this.serie + ' <span class="caret"></span>');
          this.subset = this.collection.where({'serie': this.serie, 'brand':this.brand});
          this.currentPage = 0;
          $('.SerieDropDown', this.el).show();
        }

        // particular brand and ALL series case
        if ((arg.serie != undefined) && (arg.serie == 'All')) {
          this.serie = undefined;
          $('.SerieListTitle', this.el).html('All <span class="caret"></span>');
          this.subset = this.collection.where({'brand': this.brand});
          this.currentPage = 0;
        }

      // restraining arguments are set before: works for pagination
      } else {

        // brand and serie restraints are unset 
        if (this.brand == undefined) {
            this.subset = this.collection.models;
        }

        // brand restraint is set
        if (this.brand != undefined) {
            this.subset = this.collection.where({'brand': this.brand});
        }

        // brand and serie restraints are set
        if ((this.brand != undefined) && (this.serie != undefined)){
            this.subset = this.collection.where({'serie': this.serie, 'brand':this.brand});
        }
      }

    // RENDER PART 2/2
      var self = this,
          item, // used in all rendered lists as an item
          firstItemN = this.currentPage*this.itemsPerPage, // starting item number
          lastItemN = (this.currentPage+1)*this.itemsPerPage, // last item number
          len = this.subset.length, // total number of items
          pagesN = Math.ceil(len/this.itemsPerPage); // total number of pages

      // case when number of pages more than number of items
      if(lastItemN > len) {
        lastItemN = len;
      }

      // list of available brands
      this.brands  = _.uniq(this.collection.pluck('brand')).sort();

      // list of available series
      this.series = [];
      this.subset.forEach(function(item){self.series.push(item.get('serie'))});
      this.series = _.uniq(this.series);

      // list of all series
      // this.series  = _.uniq(this.collection.pluck('serie')).sort();

      // show brand-dropdown if there are more than 2 brand names in the list
      if(this.brands.length > 1) {

        // brand list rendering  
        $('ul.BrandList', this.el).html('<li role="presentation"><a class="brand" role="menuitem" tabindex="-1" href="#">All</a></li>');
          _.each(this.brands, function(item){
              $('ul.BrandList', this.el).append('<li role="presentation"><a class="brand" role="menuitem" tabindex="-1" href="#" value="'+item+'">'+item+'</a></li>');
          }, this);

      } else {

        // don't show brand-dropdown if there are less than 2 brand names in the list
        $('.dropdown:first', this.el).hide();
      }

      // serie list render
      $('ul.SerieList', this.el).html('<li role="presentation"><a class="serie" role="menuitem" tabindex="-1" href="#">All</a></li>');
        _.each(this.series, function(item){
            $('ul.SerieList', this.el).append('<li role="presentation"><a class="serie" role="menuitem" tabindex="-1" href="#" value="'+item+'">'+item+'</a></li>');
        }, this);

      // page console info
      console.log('Page: '+this.currentPage + ' (Items: ' + firstItemN +'-' + lastItemN +')');

      // item list render
      $('ul.ItemList', this.el).html('');
      for (var i = firstItemN; i < lastItemN; i++) {
        item = this.subset[i];
        this.appendItem(item);
      };

      // pagenumber list render
      $('ul.PageList', this.el).html('');

      for (var i = 0; i < pagesN; i++) {
        // current page class
        a = (i == this.currentPage)?'active':'';
        $('ul.PageList', this.el).append('<li role="presentation" class="paginator ' + a + '"><a role="menuitem" tabindex="-1" href="#" value="'+i+'">'+(i+1)+'</a></li>');
      }; 
    },

    // adding an item to collection, so far isn't used
    // @method addItem
    // @param NONE
    // @return NONE
    addItem: function(){
      // console.log(this.collection.length);
      var item = new ServiceItem();
      this.collection.add(item);
    },

    // render an item in the view
    // @method appendItem
    // @param {item}
    // @return NONE
    appendItem: function(item){
      var itemView = new app.ServiceItemView({
        model: item
      });
      $('ul.ItemList', this.el).append(itemView.render().el);
    },

    // pagination event catcher
    // @method changeSerie
    // @param {event}
    // @return NONE
    changePage: function(event){
      this.currentPage = Math.round(event.target.innerText)-1;
      console.log('changePage:', this.currentPage);
      event.preventDefault();
      this.render();
    },

    // brand change event catcher
    // @method changeBrand
    // @param {event}
    // @return NONE
    changeBrand: function(event){
      console.log('changeBrand:', event.target.text);
      event.preventDefault();
      this.render({brand: event.target.text});
    },

    // serie change event catcher
    // @method changeSerie
    // @param {event}
    // @return NONE
    changeSerie: function(event){
      console.log('changeSerie:', event.target.text);
      event.preventDefault();      
      this.render({serie: event.target.text});
    },

    // serie change event catcher
    // @method changeSerie
    // @param {event}
    // @return NONE
    changeList: function(event){
      // console.log('aaa');
      // console.log('changeView:', event.target.value);
      console.log('changeList:', event.target.text);
      $('.ListView').hide();
      // $('#' + event.target.value).show();
    }
  });