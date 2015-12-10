(function(){
'use strict';

   angular
      .module('app')
      .controller('ProjectListCtrl', ProjectListCtrl);

   ProjectListCtrl.$inject = ['$scope', '$meteor'];

   function ProjectListCtrl($scope, $meteor) {
      $scope.projects = $scope.$meteorCollection(Project, false).subscribe('project');
   }


})();
