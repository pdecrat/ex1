angular.module('app').directive('gtMenu', function () {
 return {
   restrict: 'C',
   link: function(scope, element, state) {
     element.on('click', function(event) {
       var link = $(event.currentTarget);
      link
         .addClass('selected-menu')
         .siblings('li')
         .removeClass('selected-menu')
     });
   }
 };
});
