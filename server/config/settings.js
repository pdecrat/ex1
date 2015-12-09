// public object will always be defined on client & server
// making it extra usefull to designe alternative behaviour

Meteor.settings.public.release = "v0.1";

Meteor.settings.public.verifyEmail = false;
Accounts.config({
    sendVerificationEmail: false
});
