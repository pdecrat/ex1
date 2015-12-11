(function(){

   angular
      .module('app')
      .controller('IdeaListCtrl', IdeaListCtrl);

   IdeaListCtrl.$inject = ['$scope', '$meteor'];

   function IdeaListCtrl($scope, $meteor) {
      $scope.$meteorSubscribe('idea').then(function() {
         $scope.ideas = $scope.$meteorCollection(function() {
            return Idea.find({});
         });
      });
   }

})();

//
// $scope.$meteorSubscribe('getPopularPosts',  _.defaults(DEFAULT_QUERY_OPTIONS, limit: 5).then(-> {
//       $scope.posts = $scope.$meteorCollection(->
//           Posts.find();
//       )
// })
