(function(){
   'use strict';

   angular
   .module('app')
   .controller('UpdateModalCtrl', ProfilePicEditCtrl);

   ProfilePicEditCtrl.$inject = ['$scope', '$meteor', '$rootScope', '$state', '$modalInstance'];

   function ProfilePicEditCtrl($scope, $meteor, $rootScope, $state, $modalInstance) {
      $scope.step = true;
      $scope.imgSrc = undefined;
      $scope.myCroppedImage = '';
      $scope.getImage = getImage;
      $scope.updateImage = updateImage;

      function getImage(files) {
         if (files.length > 0) {
            var reader = new FileReader();

            reader.onload = function (e) {
               $scope.$apply(function () {
                  $scope.imgSrc = e.target.result;
                  $scope.step = false;
               });
            };
            reader.readAsDataURL(files[0]);
         }
      }

      function updateImage() {
         if ($scope.myCroppedImage !== '') {
            var fsFile = new FS.File($scope.myCroppedImage);
            fsFile.owner = $rootScope.currentUser._id;
            UsersImage.insert(fsFile, function (err, fileObj) {
               if (err)
                  $modalInstance.close('error - ' + err);
               else
                  linkImgToUser(fileObj._id);
            });
         }
         $scope.step = true;
         $scope.myCroppedImage = '';
      }

      function linkImgToUser(fileObjId) {
         $meteor.call('updateProfilePic', $rootScope.currentUser._id, fileObjId).then(
            function(data){
               $modalInstance.close('success');
            },
            function(err){
               $modalInstance.close('error - ' + err);
            }
         );
      }
   }

})();
