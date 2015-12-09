Meteor.publish("idea", function () {
   return Idea.find({});
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
  }
});
