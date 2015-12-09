(function(){
   'use strict';

   angular
      .module('app')
      .controller("RegisterCtrl", RegisterCtrl);

   RegisterCtrl.$inject = ['$meteor', '$state', '$rootScope'];

   function RegisterCtrl($meteor, $state, $rootScope) {
      var vm = this;
      vm.register = register;
      vm.credentials = {
        email: '',
        password: '',
        username: '',
        profile: {
           firstName: '',
           lastName: ''
        }
      };
      vm.check = { password: '' };
      vm.error = '';

      $rootScope.$watch('currentUser', function() {
         if($rootScope.currentUser) {
            $state.go('dashboard');
         }
      })

      function register() {
         if (!vm.credentials.email || !vm.credentials.username || !vm.credentials.password || !vm.check.password) {
            vm.error = "Seuls les champs prénom et nom sont facultatifs."
            return;
         }
         if (!emailOk(vm.credentials.email)) {
            vm.error = 'Merci de renseigner un email valide.';
            return;
         }
         if (vm.check.password !== vm.credentials.password) {
            vm.error = 'Vos mots de passe ne correspondent pas.';
            return;
         }
         $meteor.createUser(vm.credentials).then(
           function () {
             $state.go('dashboardUpdate');
           },
           function (err) {
             console.log(err);
             if (err.error == 401)
               vm.error = "Votre compte a besoin d'être vérifié, un mail vient de vous être envoyé";
             else if (err.error == 403)
               vm.error = "Ce login ou cette adresse mail existe déjà."
             else
               vm.error = err.reason;
           }
         );
      }

      function emailOk(email)
      {
          var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return re.test(email);
      }

   }

})();
