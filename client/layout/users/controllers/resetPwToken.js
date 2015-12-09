(function(){
'use strict';

   angular
      .module('app')
      .controller('ResetPwToken', resetpwtoken);

   resetpwtoken.$inject = ['$meteor', '$stateParams', '$state', '$rootScope'];

   function resetpwtoken($meteor, $stateParams, $state, $rootScope) {
      var vm = this;
      vm.linkNewPwd = linkNewPwd;
      vm.credentials = {
         newPwd: '',
         newPwdBis: ''
      };
      vm.error = '';
      vm.forgot = false;

      if ($rootScope.currentUser) {
         $state.go('dashboard');
      } else if (!$stateParams.token){
         $state.go('login');
      }

      function linkNewPwd() {
         vm.error = '';
         if (vm.credentials.newPwd && vm.credentials.newPwdBis) {
            if (vm.credentials.newPwd == vm.credentials.newPwdBis) {
               $meteor.resetPassword($stateParams.token, vm.credentials.newPwd).then(
                  function () {
                    $state.go('dashboard');
                 }, function (err) {
                    console.log('here');
                   vm.error = 'Ce token semble invalide';
                   vm.forgot = true;
               });
            } else {
               vm.error = "Les mots de passe doivent être identiques.";
            }
         } else {
            vm.error = "Merci de renseigner tout les champs";
         }
      }



   }

})();

//
// if ($scope.credentials.oldPwd && $scope.credentials.newPwd && $scope.credentials.newPwdBis) {
//    if ($scope.credentials.newPwd === $scope.credentials.newPwdBis) {
//       $meteor.changePassword($scope.credentials.oldPwd, $scope.credentials.newPwd).then(
//         function () {
//            $scope.success = 'Votre mot de passe a été changé!';
//         },
//         function (err) {
//           $scope.error = 'Votre ancien mot de passe semble invalide';
//         }
//       );
//    } else {
//       $scope.error = 'Les mots de passe ne correspondent pas..';
//    }
// } else {
//    $scope.error = 'Tous les champs sont obligatoires..';
// }
