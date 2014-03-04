var app = app || {};

app.ServiceItem = Backbone.Model.extend({
  defaults: {
    device: '',
    brand: '',
    serie: '',
    model: '',
    desc: 'desc',
    details: '',
    price: 0,
    duration: 0
  }
});