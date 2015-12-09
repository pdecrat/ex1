(function(){
'use strict';

   angular
      .module('app')
      .controller('VerifyEmail', VerifyEmail);

   VerifyEmail.$inject = ['$scope', '$meteor', '$stateParams', '$state', '$rootScope'];

   function VerifyEmail($scope, $meteor, $stateParams, $state, $rootScope) {
      $scope.msg = '';
      if ($rootScope.currentUser) {
         console.log("go dash");
         $state.go('dashboard');
      } else if (!$stateParams.token){
         console.log("go log");
         $state.go('login');
      } else {
         $meteor.verifyEmail($stateParams.token).then(function() {
            $scope.msg = "Félicitations votre compte a été validé !";
         }, function() {
            $scope.msg = "Votre compte n'a pas pu être validé..";
         });
      }
   }

})();
