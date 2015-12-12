(function(){

   angular
      .module('app')
      .controller('IdeaListCtrl', IdeaListCtrl);

   IdeaListCtrl.$inject = ['$scope', '$meteor', '$rootScope'];

   function IdeaListCtrl($scope, $meteor, $rootScope) {
     $scope.becomeMember = becomeMember;
     $scope.$meteorSubscribe('users').then(function() {
        $scope.user = $scope.$meteorObject(Meteor.users, $rootScope.currentUser._id, false);
        console.log($scope.user);
     });
      $scope.$meteorSubscribe('idea').then(function() {
         $scope.ideas = $scope.$meteorCollection(function() {
            return Idea.find({});
         });
      });
    function becomeMember() {
       $meteor.call('becomeMember', {_id: this.idea._id, type: this.idea.type}, function(err, res) {});
     }
   }
})();

//
// $scope.$meteorSubscribe('getPopularPosts',  _.defaults(DEFAULT_QUERY_OPTIONS, limit: 5).then(-> {
//       $scope.posts = $scope.$meteorCollection(->
//           Posts.find();
//       )
// })
