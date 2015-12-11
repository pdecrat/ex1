(function(){
'use strict';

   angular
      .module('app')
      .directive('gtWall', GetWall)

   GetWall.$inject = ['$stateParams', '$meteor'];

   function GetWall($stateParams, $meteor) {
      return {
         restrict: 'E',
         scope: true,
         templateUrl: 'client/layout/wall/wall.html',
         link: function(scope, element, attrs) {
            scope.success = '';
            scope.error = '';
            scope.newComment = '';
            scope.saveComment = saveComment;
            scope.itemType = attrs.parentType;
            attrs.$observe('parentId', function(value) {
               scope.itemId = value;
              scope.$meteorSubscribe('wall', { _id: scope.itemId, type: scope.itemType }).then(function() {
                 scope.wall = $meteor.object(Wall, { attachedTo: { _id: scope.itemId, type: scope.itemType }}, false);
              })
           });

           function saveComment() {
              var target = {_id: scope.itemId, type: scope.itemType};
              $meteor.call('post', target, scope.newComment).then(
                function(data){
                  scope.success = "All good - " + data;
                },
                function(err){
                  scope.error = 'Une erreur est survenue pendant la mise à jour - ' + err;
                }
              );
           }
         }
      };
   }

})();
