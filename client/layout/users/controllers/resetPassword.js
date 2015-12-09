(function(){
'use strict';

   angular
      .module('app')
      .controller("ResetCtrl", ResetCtrl);

   ResetCtrl.$inject = ['$meteor', '$state'];

   function ResetCtrl($meteor, $state) {
      var vm = this;
      vm.reset = reset;
      vm.error = '';
      vm.success = '';
      vm.credentials = { email: '' };

      function reset() {
         if (vm.credentials.email && emailOk(vm.credentials.email)) {
            $meteor.forgotPassword(vm.credentials).then(
              function () {
                 vm.success = "Un mail viens de vous être envoyé."
              },
              function (err) {
                 if (err.reason == "User not found")
                     vm.error = "Cet email n'existe pas dans notre base de donnée.";
                 else
                     vm.error = 'Une erreur inattendue est survenue';
              }
            );
         } else {
            vm.error = "Merci d'indiquer un email valide";
         }
      }

      function emailOk(email)
      {
          var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return re.test(email);
      }
   }

})();
