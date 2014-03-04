var app = app || {};

app.ServiceList = Backbone.Collection.extend({
    model: app.ServiceItem,

    initialize: function(arg){
      var self = this;
      
      // if argument and url is set the json is fetched
      if ((arg) && (arg.url)) {

        // taking an URL of the JSON from a function argument
        this.url = arg.url;
        this.fetch({

          success: function(collection){
            self.trigger('success');
            console.log('Collection fetched');
          },

          error: function(e){
              console.error(e, 'Collection fetch error');
          }
        });
      }
    }
  });