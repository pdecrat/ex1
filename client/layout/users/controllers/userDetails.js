(function(){
'use strict';

   angular
      .module('app')
      .controller("UsersListCtrl", UserDetailsCtrl);

   UserDetailsCtrl.$inject = ['$scope', '$meteor', '$rootScope', '$state', '$modal', '$filter'];

   function UserDetailsCtrl($scope, $meteor, $rootScope, $state, $modal, $filter) {
      console.log('this is the Users DetailsCtrl');
   }

})();
