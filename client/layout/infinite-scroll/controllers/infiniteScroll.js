angular.module('app').controller('InfiniteScrollCtrl', ['$scope', '$meteor',
function($scope, $meteor) {

   $scope.sort = {name: 1};
   $scope.orderProperty = '1';

   var page = 15;

   $meteor.subscribe('images', {
      skip: 0,
      limit: parseInt(2 * page),
      sort: $scope.getReactively('sort')
   }, $scope.getReactively('search'));

   $scope.images = $meteor.collection(function() {
      return Scroll.find({}, {
         sort : $scope.getReactively('sort')
      });
   });

   $scope.loadMore = function() {
      var len = $scope.images.length;
      $meteor.subscribe('scroll', {
         skip: parseInt(len),
         limit: parseInt(page),
         sort: $scope.getReactively('sort')
      }, $scope.getReactively('search'));
   };

   $scope.$watch('orderProperty', function(){
     if ($scope.orderProperty)
       $scope.sort = {name: parseInt($scope.orderProperty)};
   });

}]);
