var App;

App = Ember.Application.create();

App.API_URL = 'https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv';

App.ProjectView = Ember.View.extend({
  templateName: 'project',
  style: (function() {
    return "background-image:url(" + this.project.thumbnailUrl + "); background-size: 300px 200px;";
  }).property(),
  click: function(event) {
    return window.open(this.project.website);
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.get(App.API_URL).then((function(_this) {
      return function(data) {
        var projects;
        projects = _.filter(Ember.$.csv.toObjects(data), function(object) {
          return object.website;
        });
        _.each(projects, function(object) {
          var url, urlMD5;
          if (!object.thumbnailUrl) {
            url = object.website;
            urlMD5 = CryptoJS.MD5(url);
            return object.thumbnailUrl = "images/thumbnails/" + urlMD5 + ".png";
          }
        });
        return projects;
      };
    })(this));
  }
});
