angular.module('app').directive('gtToggle', function () {
   return {
      restrict: 'C',
      link: function(scope, element) {
         element.on('click', function(event) {
            event.preventDefault();
            var msb = $('#main-sidebar');
            msb
               .toggleClass('msb-toggle');

            if (msb.hasClass('msb-toggle-remove')) {
               msb
                  .removeClass('msb-toggle-remove')
                  .addClass('msb-toggle-add')
            } else if (msb.hasClass('msb-toggle-add')) {
               msb
                  .removeClass('msb-toggle-add')
                  .addClass('msb-toggle-remove')
            }
            else {
               msb
                  .addClass('msb-toggle-add');
            }
         });
      }
   };
});
