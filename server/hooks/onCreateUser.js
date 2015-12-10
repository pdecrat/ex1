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

   user.type = "Person";
   user.roles = [];
   user.profile = blankProfile;
   user.notification = [];
   user.character = {
      experience: 0,
      level: 0,
      class: "",
      credits: 100
   };
   return user;
});
