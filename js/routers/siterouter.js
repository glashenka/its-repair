var app = app || {};

app.SiteRouter = Backbone.Router.extend({
    routes: {
      "about": "aboutSection",
      "service": "serviceSection",
      "stores": "storeSection",
      "promo": "promoSection",
      "*other": "promoSection"
    },
    
    // promo section event catcher
    // @method promoSection
    // @param NONE
    // @return NONE
    promoSection: function(){
      this.switchSection('PromoSection');
    },
    
    // about section event catcher
    // @method aboutSection
    // @param NONE
    // @return NONE
    aboutSection: function(){
      this.switchSection('AboutSection');
    },

    // service section event catcher
    // @method serviceSection
    // @param NONE
    // @return NONE
    serviceSection: function(){
      this.switchSection('ServiceSection');
      
      //initial item list render
      $('.ListView', this.el).hide();
      $('#MobileListView', this.el).show();

      //initial menu render
      $('.ListSwitch').removeClass('active');
      $('.ListSwitch:first').addClass('active');

      // switch between mobile, tablet and laptop views
      $('.ListSwitch', this.el).click(function(event){
        
        //item list re-render
        $('.ListView', this.el).hide();
        $('.ListSwitch').removeClass('active');
        
        // menu re-render
        $(this).addClass('active');
        $('#' + event.target.getAttribute('value'), this.el).show();
      });      
    },

    // store section event catcher
    // @method storeSection
    // @param NONE
    // @return NONE
    storeSection: function(){
        this.switchSection('StoreSection');
        var sv = new app.StoreView();
        $("#map-canvas").width($(window).width());
        $("#map-canvas").height($(window).height());

        $(window).resize(function(){
            $("#map-canvas").width($(window).width());
            $("#map-canvas").height($(window).height());
        }); 
    },    

    // section switcher
    // @method switchSection
    // @param "sectionName"
    // @return NONE
    switchSection: function(sectionName){
        $('section').fadeOut(0);
        $('#' + sectionName).fadeIn(0);
        $('.navbar').removeClass().addClass('navbar').addClass('navbar' + sectionName);
        $('body').removeClass().addClass(sectionName + 'BodyStyle');
    }

});