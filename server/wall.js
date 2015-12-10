Meteor.publish("wall", function (params) {

   check(params, Match.Optional({
      _id: String,
      type: String
   }));

   if (Match.test(params, Object))
      return Wall.find({ 'attachedTo': {_id: params._id, type: params.type }});
});

Meteor.methods({
  post: function(target, content) {
    if (!this.userId)
      throw new Meteor.Error('not-logged-in', "Vous devez vous identifier pour poster un commentaire.");

    var user = Meteor.user();
    var actions = [
      {name: 'freeForMembers', params: {cost: 2}},
      {name: 'getXp', params: {xp: 25}},
      {name: 'notifyMembers', params: {
        message: user.username + " a posté un message."}},
      {name: 'post', params: {post: content}}
    ];
    Actions.do(user, actions, target);
  }
});
