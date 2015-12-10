angular.module('app').directive('gtCloseNav', function ($window) {
   return {
      restrict: 'C',
      link: function(scope, element) {
         element.find('li').on('click', function(event, element) {

            $('#content-sidebar').find('li').removeClass('selected-sub-menu');
            $(event.currentTarget)
               .addClass('selected-sub-menu')

            if(angular.element($window).width() <= 786) {
               $('#main-sidebar').addClass('msb-toggle')
            }
         });
      }
   };
});
