App = Ember.Application.create()

App.API_URL = 'https://docs.google.com/spreadsheet/pub?key=0Allabz1cdhpXdDZaVW9BaFJsUUZQeGhsZmJQM2oyWGc&single=true&gid=1&output=csv'

App.ProjectView = Ember.View.extend
  templateName: 'project'

  style: (-> "background-image:url(#{this.project.bannerUrl}); background-size: cover;").property()

  click: (event) ->
    window.open(@project.website)

App.IndexRoute = Ember.Route.extend
  model: ->
    Ember.$.get(App.API_URL).then (data) ->
      ProjectAPIAdapter.projectsWithData(data)
