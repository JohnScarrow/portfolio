'use strict';
var app = app || {};
var projects = [];

(function (module){
  function Project (projectsObj) {
    this.title = projectsObj.title;
    this.link = projectsObj.link;
    this.description = projectsObj.description;
  }

  Project.prototype.toHtml = function() {
    var template = Handlebars.compile($('#project-template').text());
    return template(this);
  };
  projectData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
  projectData.forEach(function(projectObject) {
    projects.push(new Project(projectObject));
  })
  projects.forEach(function(project){
    $('#project').append(project.toHtml())
  });
  var headerNav = function() {
    $('#tabs').on('click', '.tab', function() {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });
  };

  headerNav();

  const storeData = function (){
    localStorage.setItem('projectData', JSON.stringify(projectData));
  }

  storeData();

}(app));