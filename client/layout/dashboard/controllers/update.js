(function() {
   'use strict';

   angular
   .module('app')
   .controller("UpdateCtrl", UpdateCtrl);

   UpdateCtrl.$inject = ['$scope', '$rootScope', '$meteor', '$state', '$modal', '$filter'];

   function UpdateCtrl($scope, $rootScope, $meteor, $state, $modal, $filter) {
      $scope.user = $meteor.object(Meteor.users, $rootScope.currentUser._id, false);
      $scope.$meteorSubscribe('users');
      $scope.images = $meteor.collectionFS(UsersImage, false, UsersImage).subscribe('users-image');
      $scope.error = '';
      $scope.success = '';
      $scope.credentials = { oldPwd: '', newPwd: '', newPwdBis: '' };
      $scope.saveInformation = saveInformation;
      $scope.saveSecurity = saveSecurity;
      $scope.getPicture = getPicture;
      $scope.updatePicModal = updatePicModal;
      var oldEmail = $rootScope.currentUser.emails[0].address;

      console.log(oldEmail);


      function saveInformation() {
         resetNotification();
         var updatedUser = {
            'username': $scope.user.username,
            'email': $scope.user.emails[0].address,
            'profile': {
               'lastName': $scope.user.profile.lastName,
               'firstName': $scope.user.profile.firstName,
               'homePhone': $scope.user.profile.homePhone,
               'mobilePhone': $scope.user.profile.mobilePhone,
               'birthDate': $scope.user.profile.birthDate || undefined
            }
         };

         $meteor.call('updateProfileInfo', updatedUser).then(
           function(data){
             if (Meteor.settings.public.verifyEmail && $scope.user.emails[0].address != oldEmail)
                  $scope.success = 'Votre profile a été mis à jour ! Pensez à vérifier votre nouvelle adresse email pour le prochain login';
            else {
               $scope.success = 'Votre profile a été mis à jour !';
            }
           },
           function(err){
             $scope.error = 'Une erreur est survenue pendant la mise à jour - ' + err;
           }
         );
      }

      function saveSecurity() {
         resetNotification();
         if ($scope.credentials.oldPwd && $scope.credentials.newPwd && $scope.credentials.newPwdBis) {
            if ($scope.credentials.newPwd === $scope.credentials.newPwdBis) {
               $meteor.changePassword($scope.credentials.oldPwd, $scope.credentials.newPwd).then(
                 function () {
                    $scope.success = 'Votre mot de passe a été changé!';
                 },
                 function (err) {
                   $scope.error = 'Votre ancien mot de passe semble invalide';
                 }
               );
            } else {
               $scope.error = 'Les mots de passe ne correspondent pas..';
            }
         } else {
            $scope.error = 'Tous les champs sont obligatoires..';
         }
      }

      function getPicture(user) {
         if (user && user.profile && user.profile.image) {
            var img = $filter('filter')($scope.images, {_id: user.profile.image});
            if (img && img[0]) {
               var url = img[0].url();
               return { 'background-image': 'url("' + url + '")' };
            }
         }
         return { 'background-image': 'url("anonymous.png")' }
      }

      function updatePicModal() {
         resetNotification()
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'client/layout/dashboard/views/update-modal.html',
          controller: 'UpdateModalCtrl'
         });

        modalInstance.result.then(function (returnValue) {
          if(returnValue == 'success')
            $scope.success = 'Votre photo de profile a été modifié avec succès !';
          else
            $scope.error = returnValue;
       });
     }

     function resetNotification() {
        $scope.success = '';
        $scope.error = '';
     }



   }

})();
