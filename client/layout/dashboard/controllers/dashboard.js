(function() {
'use strict';

   angular
      .module('app')
      .controller("DashboardCtrl", DashboardCtrl);

   DashboardCtrl.$inject = ['$scope', '$state', '$modal'];

   function DashboardCtrl($scope, $state, $modal) {
      $scope.tarace = '';

      $scope.$watch('tarace', function() {
      })

   }

})();
