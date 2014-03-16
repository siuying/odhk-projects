class ProjectAPIAdapter
  @API_MAPPINGS:
    "Project Name": "name"
    "Description": "description"
    "Project website (if applicable)": "website"
    "Main contact name": "contactName"
    "GitHub URL": "githubUrl"
    "Project Banner": "bannerUrl"

  @projectsWithCSV: (data) ->
    projects = $.csv.toObjects(data)

    _.each projects, (object) =>
      for key, value of @API_MAPPINGS
        object[value] = object[key] if object[key]

      # set a fallback banner
      unless object.bannerUrl
        url = object.website
        urlMD5 = CryptoJS.MD5(url)
        object.bannerUrl = "images/thumbnails/#{urlMD5}.png"

    projects = _.filter projects, (object) -> object.website
    projects

