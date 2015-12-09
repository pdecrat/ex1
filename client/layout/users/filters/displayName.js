(function(){
'use strict';
   angular
      .module('app')
      .filter('displayName', displayName)

      function displayName() {
         return selectName;
      }

      function selectName(user) {
         if (!user)
            return;
         if (user.username)
            return user.username;
         else if (user.profile && user.profile.name)
            return user.profile.name;
         else if (user.emails)
            return user.emails[0].address;
         else
            return user;
      }

})();
