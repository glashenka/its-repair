var app = app || {};

app.mobileListView = new app.ServiceListView({
el:'#MobileListView', 
url: 'mobiles.json'
});

app.tabletListView = new app.ServiceListView({
el:'#TabletListView', 
url: 'tablets.json'
});

app.laptopListView = new app.ServiceListView({
el:'#LaptopListView', 
url: 'laptops.json', 
items: 5
});

// app.sv = new StoreView();
app.router = new app.SiteRouter();
Backbone.history.start();
