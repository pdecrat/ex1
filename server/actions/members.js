Actions.freeForMembers = function(origin, target, params) {
  if (!_.contains(target.members, origin.username))
    Actions.giveCredits(origin, target, params);
}

Actions.becomeMember = function(origin, target, params) {
  if (!_.contains(target.members, origin.username)) {
      //  throw new Meteor.Error('already-member', "You are already a member.");
     if (target.members)
       target.members.push(origin.username);
     else {
       target.members = [origin.username];
     }
  }
}
