Accounts.validateLoginAttempt(function(info) {
   var userObj = info.user;

   if (Meteor.settings.public.verifyEmail == true) {
      //Meteor.settings.public is defined in "server/config.js"
      if(info.allowed && !userObj.emails[0].verified) {
         //if login request is going to be succesful and email isn't verified
         if (userObj.services.email && userObj.services.email.verificationTokens) {
            //user already has a verification tokens
            throw new Meteor.Error(401, "Votre compte n'a pas été vérifié, un mail vous a été envoyé le "
            + userObj.services.email.verificationTokens[0].when.toTimeString());
         } else {
            // this should not be reached since sendVerificationEmail() is called on
            // accounts creation and email modification (just being extra safe)
            Accounts.sendVerificationEmail(user._id);
            throw new Meteor.Error(401, 'Un nouveau mail de vérification viens de vous être envoyé.');
         }
      }
   }
   return true;
})


// userObj.services.email.verificationTokens :
// [
//    { token: 'String',
//      address: 'String',
//      when: Date
//    }
// ]

// delete verification token manually and validate email =>
// delete userObj['services']['email'];
// userObj.emails[0].verified = true;
