(function() {
   'use strict';

   angular
   .module('app')
   .controller("LoginCtrl", LoginCtrl);

   LoginCtrl.$inject = ['$meteor', '$state'];

   function LoginCtrl($meteor, $state) {
      var vm = this;
      vm.login = login;
      vm.credentials = {
         username: '',
         password: ''
      };
      vm.error = '';

      function login() {

         if (!vm.credentials.username || !vm.credentials.password) {
            vm.error = "Merci de remplir tout les champs";
            return;
         }
         $meteor.loginWithPassword(vm.credentials.username, vm.credentials.password).then(
            function () {
               $state.go('dashboard');
            },
            function (err) {
               console.log(err);
               if (err.error == 403)
                  vm.error = "Nom d'utilisateur ou mot de passe incorrect";
               else if (err.error == 401)
                  vm.error = err.reason;
               else
                  vm.error = "Une erreur inattendue est survenue - " + err;
            }
         );
      }
   }

})();
