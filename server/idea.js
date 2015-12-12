Meteor.publish("idea", function (id) {
   check(id, Match.OneOf(String, undefined));

   if (id) {
      return Idea.find({_id: id});
   }
   else {
      return Idea.find({});
   }
});

Meteor.methods({
  'insertIdea': function (data) {

     data.type = 'Idea';

     console.log(data);
    var exist = Idea.findOne( {name: data.name });
    var user = Meteor.users.findOne({_id: this.userId});

    if (!this.userId) {
     state.go('/login');
     return;
    }
    if (!exist){
      data.members = [user.username];
      data.inCharge = [user.username];
      data.templates = [
        {name: 'Description', template: 'IdeaDescription'},
        {name: 'Mise à jour', template: 'IdeaUpdate'},
        {name: 'Commentaires', template: 'Wall'},
        {name: 'Supporters', template: 'IdeaSupporters'},
      ]
      Actions.create(data);
    }
  },
  becomeMember: function(target) {
    var user = Meteor.user();
    var actions = [
      {name: 'giveCredits', params: {cost: 1}},
      {name: 'getXp', params: {xp: 10}},
      {name: 'becomeMember', params: {}},
      {name: 'notifyMembers', params: {
        message: user.username + " est devenu membre."}},
    ];

    Actions.do(user, actions, target);
  }
});
