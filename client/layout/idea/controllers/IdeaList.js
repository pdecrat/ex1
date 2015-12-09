(function(){

   angular
      .module('app')
      .controller('IdeaListCtrl', IdeaListCtrl);

   IdeaListCtrl.$inject = ['$scope', '$meteor'];

   function IdeaListCtrl($scope, $meteor) {
      $scope.ideas = $scope.$meteorCollection(Idea, false).subscribe('idea');

      console.log($scope.ideas);
   }

})();
