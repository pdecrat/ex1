UsersImage.allow({
   // userId is not comming from the client, you can trust it to manage authorization
   download: function (userId, fileObj) {
      return (userId && fileObj.owner == userId )? true : false ;
   },
   insert: function (userId, fileObj) {
      return (userId && fileObj.owner == userId )? true : false ;
   },
   update: function (userId, fileObj) {
      return (userId && fileObj.owner == userId )? true : false ;
   }
})

UsersImage.deny({
   remove: function (userId) {
      return false;
   }
});

Meteor.publish('users-image', function(options) {
   check(options, Match.Optional({ 'id': String }));
   if (options)
      return UsersImage.find({_id: options.id});
   return UsersImage.find({owner: this.userId});
});

Meteor.methods({
   'updateProfilePic': function (userId, newPicId) {
      check(userId, String);
      check(newPicId, String);
      if (this.userId && userId == this.userId) {
         var user = Meteor.users.findOne(this.userId);
         var oldPic = user.profile.image || null;
         Meteor.users.update(this.userId, {$set: {'profile.image': newPicId}});
         if (oldPic) {
            // remove old picture every time a new one is uploaded
            UsersImage.remove({_id: oldPic});
         }
      }
   }
});
