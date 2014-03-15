App = Ember.Application.create()

App.API_URL = 'https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv'

App.Project = DS.Model.extend
  thumbnailURL: ->
    url = this.get('website')
    urlMD5 = CryptoJS.MD5(url)
    "images/thumbnails/#{urlMD5}.png"

App.ProjectView = Ember.View.extend
  templateName: 'project'

  style: (-> "background-image:url(#{this.project.thumbnail}); background-size: 300px 200px;").property()

  click: (event) ->
    window.open(@project.website)

App.IndexRoute = Ember.Route.extend
  model: ->
    Ember.$.get(App.API_URL).then (data) =>
      projects = _.filter Ember.$.csv.toObjects(data), (object) -> object.website
      _.each projects, (object) ->
        unless object.thumbnail
          url = object.website
          urlMD5 = CryptoJS.MD5(url)
          object.thumbnail = "images/thumbnails/#{urlMD5}.png"
      projects
