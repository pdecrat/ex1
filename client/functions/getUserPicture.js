(function(){
'use strict';

   angular
      .module('app')
      .directive('gtUserPicture', GetPictureDirective)

   GetPictureDirective.$inject = ['$filter', '$rootScope'];

   function GetPictureDirective($filter, $rootScope) {
      return {
         restrict: 'C',
         controller: getPictureCtrl,
         link: function (scope, element, attrs) {
            scope.url = "background-image: url('anonymous.png')";
            scope.img = $filter('filter')(scope.images, { _id: scope.userImg });
            if (scope.img && scope.img[0]) {
               scope.url = "background-image: url(" + scope.img[0].url() + ");";
            }
            attrs.$set('style', scope.url);
         }
      };
   }

   getPictureCtrl.$inject = ['$meteor', '$scope', '$rootScope', '$filter', '$state'];

   function getPictureCtrl($meteor, $scope, $rootScope, $filter, $state) {
      $scope.images = $meteor.collectionFS(UsersImage, false, UsersImage);
      $scope.userImg = $rootScope.currentUser.profile.image || '';
   }

})();
