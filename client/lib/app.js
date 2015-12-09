angular
   .module('app', [
      'angular-meteor',
      'ui.router',
      'ui.bootstrap',
      'infinite-scroll',
      'ngFileUpload',
      'ngImgCrop',
   ]);

angular
   .module('infinite-scroll')
   .value('THROTTLE_MILLISECONDS', 500);

function onReady() {
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
