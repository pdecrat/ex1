Meteor.publish("users", function () {
   return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
});

Meteor.users.deny({
   update: function() {
      return true;
   }
});

Meteor.methods({
   'updateProfileInfo': function(userObj) {
      check(userObj, {
         "username": String,
         "email": String,
         "profile": {
            'firstName': Match.Optional(String),
            'lastName': Match.Optional(String),
            'homePhone': Match.Optional(String),
            'mobilePhone': Match.Optional(String),
            'birthDate': Match.Optional(Date)
         }
      });

      var flag = false;
      if(userObj.email && !emailOk(userObj.email))
         flag = true;
      if (userObj.homePhone && !phoneOk(userObj.homePhone))
         flag = true;
      if (userObj.mobilePhone && !phoneOk(userObj.mobilePhone))
         flag = true;

      if (this.userId && !flag) {
         var user = Meteor.users.findOne(this.userId);
         if (user.username != userObj.username)
            Accounts.setUsername(user._id, userObj.username);
         if (user.emails[0].address != userObj.email) {
            Accounts.removeEmail(user._id, user.emails[0].address);
            Accounts.addEmail(user._id, userObj.email);
            if (Meteor.settings.public.verifyEmail == true)
               Accounts.sendVerificationEmail(user._id);
         }
         Meteor.users.update(this.userId, {$set: {
             'profile.firstName': userObj.profile.firstName,
             'profile.lastName': userObj.profile.lastName,
             'profile.homePhone': userObj.profile.homePhone,
             'profile.mobilePhone': userObj.profile.mobilePhone,
             'profile.birthDate': userObj.profile.birthDate
          }});
      } else {
         throw new Meteor.Error(501, 'email or phones format is incorrect.');
      }

      function emailOk(email) {
          var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return re.test(email);
      }
      function phoneOk(phone) {
          var re = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i;
          return re.test(phone);
      }
   }
});
