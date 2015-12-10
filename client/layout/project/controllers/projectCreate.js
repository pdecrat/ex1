(function(){
'use strict';

   angular
      .module('app')
      .controller('ProjectCreateCtrl', ProjectCreateCtrl);

   ProjectCreateCtrl.$inject = ['$scope', '$meteor'];

   function ProjectCreateCtrl($scope, $meteor) {
      $scope.success = '';
      $scope.error = '';
      $scope.newProject = {
         name: '',
         content: ''
      }
      $scope.saveProject = saveProject;

      function saveProject() {
         console.log($scope.newProject);
         $meteor.call('insertProject', $scope.newProject).then(
           function(data){
             $scope.success = "nice - " + data;
           },
           function(err){
             $scope.error = 'Une erreur est survenue pendant la mise à jour - ' + err;
           }
         );
      }
   }


})();
