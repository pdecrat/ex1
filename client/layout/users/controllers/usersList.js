(function(){
'use strict';

   angular
      .module('app')
      .controller("UsersListCtrl", UsersListCtrl);

   UsersListCtrl.$inject = ['$scope', '$meteor', '$rootScope', '$state', '$modal', '$filter'];

   function UsersListCtrl($scope, $meteor, $rootScope, $state, $modal, $filter) {
      console.log('this is the UsersListCtrl');
   }

})();
