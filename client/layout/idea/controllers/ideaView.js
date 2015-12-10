(function(){

   angular
      .module('app')
      .controller('IdeaViewCtrl', IdeaViewCtrl);

   IdeaViewCtrl.$inject = ['$scope', '$meteor', '$stateParams'];

   function IdeaViewCtrl($scope, $meteor, $stateParams) {
      $scope.idea = $meteor.object(Idea, $stateParams.id, false);
      $scope.$meteorSubscribe('idea', $stateParams.id);

   }

})();
