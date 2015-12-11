(function(){
'use strict';

   angular
      .module('app')
      .controller('ProjectListCtrl', ProjectListCtrl);

   ProjectListCtrl.$inject = ['$scope', '$meteor'];

   function ProjectListCtrl($scope, $meteor) {
      $scope.$meteorSubscribe('project').then(function() {
         $scope.projects = $scope.$meteorCollection(function() {
            return Project.find({});
         });
      });
   }


})();
