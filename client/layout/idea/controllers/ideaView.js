(function(){

   angular
      .module('app')
      .controller('IdeaViewCtrl', IdeaViewCtrl);

   IdeaViewCtrl.$inject = ['$scope', '$meteor', '$stateParams'];

   function IdeaViewCtrl($scope, $meteor, $stateParams) {
      $scope.$meteorSubscribe('idea', $stateParams.id).then(function(){
         $scope.idea = $scope.$meteorObject(Idea, $stateParams.id, false);
      })

   }

})();
