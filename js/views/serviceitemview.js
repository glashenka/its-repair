var app = app || {};

app.ServiceItemView = Backbone.View.extend({
    tagName: 'li', // name of tag to be created
    className:"list-group-item",
    template:$("#ServiceListItem").html(),     

    events: {
      // 'click span.delete': 'remove',
      'click a': 'modalOrder'
    },    


    initialize: function(){
      this.model.on('remove', this.unrender, this);
    },

    // @method render
    // @param NONE
    // @return self
    render: function(){
      var tmpl = _.template(this.template); 
        this.$el.html(tmpl(this.model.toJSON())); 
        return this; 
    },

    // @method unrender
    // @param NONE
    // @return NONE
    unrender: function(){
      $(this.el).remove();
    },

    // @method remove
    // @param NONE
    // @return NONE
    remove: function(){
      this.model.destroy();
    }, 


    // @method modalOrder
    // @param NONE
    // @return NONE
    modalOrder: function(event){
      $("#oServiceName").val(event.target.getAttribute('value').trim());
      console.log('modalOrder', event.target.getAttribute('value'));      
    } 
  });