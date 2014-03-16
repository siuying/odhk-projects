var App, ProjectAPIAdapter;

App = Ember.Application.create();

App.API_URL = 'https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv';

App.ProjectView = Ember.View.extend({
  templateName: 'project',
  style: (function() {
    return "background-image:url(" + this.project.bannerUrl + "); background-size: cover;";
  }).property(),
  click: function(event) {
    return window.open(this.project.website);
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.get(App.API_URL).then(function(data) {
      return _.shuffle(ProjectAPIAdapter.projectsWithCSV(data));
    });
  }
});

ProjectAPIAdapter = (function() {
  function ProjectAPIAdapter() {}

  ProjectAPIAdapter.API_MAPPINGS = {
    "Project Name": "name",
    "Description": "description",
    "Project website (if applicable)": "website",
    "Main contact name": "contactName",
    "GitHub URL": "githubUrl",
    "Project Banner": "bannerUrl"
  };

  ProjectAPIAdapter.projectsWithCSV = function(data) {
    var projects;
    projects = $.csv.toObjects(data);
    _.each(projects, (function(_this) {
      return function(object) {
        var key, url, urlMD5, value, _ref;
        _ref = _this.API_MAPPINGS;
        for (key in _ref) {
          value = _ref[key];
          if (object[key]) {
            object[value] = object[key];
          }
        }
        if (!object.bannerUrl) {
          url = object.website;
          urlMD5 = CryptoJS.MD5(url);
          return object.bannerUrl = "images/thumbnails/" + urlMD5 + ".png";
        }
      };
    })(this));
    projects = _.filter(projects, function(object) {
      return object.website;
    });
    return projects;
  };

  return ProjectAPIAdapter;

})();
