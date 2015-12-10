(function(){
'use strict';

   angular
      .module('app')
      .directive('gtWall', GetWall)

   GetWall.$inject = ['$filter', '$rootScope', '$stateParams'];

   function GetWall($filter, $rootScope, $stateParams) {
      return {
         restrict: 'E',
         scope: {
            itemType: '@parentType',
            itemId: '@parentId'
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

      console.log($scope.itemId);
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
//
// var target = {_id: this._id, type: this.type};
// var content = e.target.content.value;
// Meteor.call('post', target, content, function(err, res) {
