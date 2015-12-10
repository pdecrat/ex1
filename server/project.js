Meteor.publish("project", function (id) {

   check(id, Match.OneOf(String, undefined));

   if (id) {
      return Project.find({_id: id});
   }
   else {
      return Project.find({});
   }
});

Meteor.methods({
  'insertProject': function (data) {
     data.type = 'Project';
     var user = Meteor.users.findOne({_id: this.userId});
     data.members = [user.username];
     data.inCharge = [user.username];

     Project.insert(data);
  }
});
