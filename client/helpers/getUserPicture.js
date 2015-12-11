(function(){
'use strict';

   angular
      .module('app')
      .directive('gtUserPicture', GetPictureDirective)

   GetPictureDirective.$inject = ['$filter', '$rootScope', '$meteor'];

   function GetPictureDirective($filter, $rootScope, $meteor) {
      return {
         restrict: 'C',
         link: function (scope, element, attrs) {
            scope.$meteorSubscribe('users-image').then(function() {
               scope.images = $meteor.collectionFS(UsersImage, false, UsersImage)
               scope.userImg = $rootScope.currentUser.profile.image || '';
               scope.url = "background-image: url('anonymous.png')";
               scope.img = $filter('filter')(scope.images, { _id: scope.userImg });
               if (scope.img && scope.img[0]) {
                  scope.url = "background-image: url(" + scope.img[0].url() + ");";
               }
               attrs.$set('style', scope.url);
            })
         }
      };
   }

})();
