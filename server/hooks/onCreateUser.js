Accounts.onCreateUser(function(options, user) {

   // this hook needs to return the user so this is necessary not to lose the profile object...
   var blankProfile = {
      lastName: '',
      firstName: '',
      homePhone: '',
      mobilePhone: '',
      birthDate: undefined
   };

   if(options.profile && options['profile']['lastName'])
      blankProfile['lastName'] = options['profile']['lastName'];
   if (options.profile && options['profile']['firstName'])
      blankProfile['firstName'] = options['profile']['firstName'];

   user.profile = blankProfile;
   return user;
});
