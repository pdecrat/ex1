(function(){
'use strict';

   angular
      .module('app')
      .controller('ProjectViewCtrl', ProjectViewCtrl);

   ProjectViewCtrl.$inject = ['$meteor', '$scope', '$stateParams'];

   function ProjectViewCtrl($meteor, $scope, $stateParams) {
      $scope.project = $meteor.object(Project, $stateParams.id, false);
      $scope.$meteorSubscribe('project', $stateParams.id);

      

   }

})();
