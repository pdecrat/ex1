(function(){
'use strict';

   angular
      .module('app')
      .directive('gtWall', GetWall)

   GetWall.$inject = ['$stateParams'];

   function GetWall($stateParams) {
      return {
         restrict: 'E',
         scope: {
            itemType: '@parentType',
         },
         controller: GetWallCtrl,
         templateUrl: 'client/layout/wall/wall.html',
         link: function (scope, element, attrs) {
            scope.itemId = $stateParams.id;
         }
      };
   }

   GetWallCtrl.$inject = ['$meteor', '$scope', '$rootScope', '$filter', '$state', '$stateParams', '$element'];

   function GetWallCtrl($meteor, $scope, $rootScope, $filter, $state, $stateParams, $element) {
      $scope.success = '';
      $scope.error = '';
      $scope.newComment = '';
      $scope.saveComment = saveComment;
      $scope.wall = $meteor.object(Wall, { attachedTo: { _id: $stateParams.id, type: $scope.itemType }}, false);
      $scope.$meteorSubscribe('wall', { _id: $stateParams.id, type: $scope.itemType });

      console.log($scope.itemType);
      function saveComment() {
         var target = {_id: $scope.itemId, type: $scope.itemType};
         $meteor.call('post', target, $scope.newComment).then(
           function(data){
             $scope.success = "All good - " + data;
           },
           function(err){
             $scope.error = 'Une erreur est survenue pendant la mise à jour - ' + err;
           }
         );
      }
   }

})();
