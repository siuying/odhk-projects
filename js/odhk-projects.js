var App;

App = Ember.Application.create();

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
      {
        "name": "Legco app",
        "URL": "https://play.google.com/store/apps/details?id=com.siulun.LegcoVotes",
        "contact name": "Allen Chan"
      }, {
        "name": "Gazetteer",
        "URL": "http://gazetteer.hk",
        "Main contact name": "Han Xu"
      }, {
        "name": "MTR delay",
        "URL": "http://mtrdelay.reality.hk/",
        "Main contact name": "Francis Chong"
      }, {
        "name": "Legco app",
        "URL": "https://play.google.com/store/apps/details?id=com.siulun.LegcoVotes",
        "Main contact name": "Allen Chan"
      }, {
        "name": "Gazetteer",
        "URL": "http://gazetteer.hk",
        "Main contact name": "Han Xu"
      }, {
        "name": "MTR delay",
        "URL": "http://mtrdelay.reality.hk/",
        "Main contact name": "Francis Chong"
      }, {
        "name": "Legco app",
        "URL": "https://play.google.com/store/apps/details?id=com.siulun.LegcoVotes",
        "Main contact name": "Allen Chan"
      }, {
        "name": "Gazetteer",
        "URL": "http://gazetteer.hk",
        "Main contact name": "Han Xu"
      }, {
        "name": "MTR delay",
        "URL": "http://mtrdelay.reality.hk/",
        "Main contact name": "Francis Chong"
      }
    ];
  }
});
