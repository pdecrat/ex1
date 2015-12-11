(function(){
'use strict';

   angular
      .module('app')
      .controller('ProjectViewCtrl', ProjectViewCtrl);

   ProjectViewCtrl.$inject = ['$meteor', '$scope', '$stateParams'];

   function ProjectViewCtrl($meteor, $scope, $stateParams) {
      $scope.$meteorSubscribe('project', $stateParams.id).then(function(){
         $scope.project = $scope.$meteorObject(Project, $stateParams.id, false);
      })
   }

})();
