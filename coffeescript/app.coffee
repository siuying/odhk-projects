App = Ember.Application.create()

App.API_URL = 'https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv'

App.ProjectView = Ember.View.extend
  templateName: 'project'

  style: (-> "background-image:url(#{this.project.thumbnailUrl}); background-size: cover;").property()

  click: (event) ->
    window.open(@project.website)

App.IndexRoute = Ember.Route.extend
  model: ->
    Ember.$.get(App.API_URL).then (data) =>
      projects = _.filter Ember.$.csv.toObjects(data), (object) -> object.website
      _.each projects, (object) ->
        unless object.thumbnailUrl
          url = object.website
          urlMD5 = CryptoJS.MD5(url)
          object.thumbnailUrl = "images/thumbnails/#{urlMD5}.png"
      projects
