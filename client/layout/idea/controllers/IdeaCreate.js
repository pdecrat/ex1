(function(){

   angular
      .module('app')
      .controller('IdeaCreateCtrl', IdeaCreateCtrl);

   IdeaCreateCtrl.$inject = ['$scope', '$meteor'];

   function IdeaCreateCtrl($scope, $meteor) {
      $scope.saveIdea = saveIdea;
      $scope.audienceSize = '5';
      $scope.error = '';
      $scope.success = '';
      $scope.newIdea = {
         name: '',
         content: '',
         users: [],
         objBackers: 10,
         image: ''
      }

      $scope.$watch('audienceSize', function() {
         $scope.newIdea.objBackers = parseInt($scope.audienceSize);
      })


      function saveIdea() {
         console.log($scope.newIdea);
         $meteor.call('insertIdea', $scope.newIdea).then(
           function(data){
             $scope.success = "nice - " + data;
           },
           function(err){
             $scope.error = 'Une erreur est survenue pendant la mise à jour - ' + err;
           }
         );

      }

   }

})();
