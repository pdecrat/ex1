Actions.notifyMembers = function(origin, target, params) {
  var members = Meteor.users.find({username: {$in: target.members}}).fetch();
  var notif = {
    content: params.message,
    title: "Activité sur " + target.name,
    link: target.url,
    seen: false,
  }

  members.forEach(function(member) {
    notif._id = member.notification.length + 1;
    member.notification.push(notif);
    Collectivz.update(member);
  });
}

Actions.notifyInCharge = function(origin, target, params) {
  var inCharge = Meteor.users.find({username: {$in: target.inCharge}}).fetch();
  var notif = {
    content: params.message,
    title: "Activité sur " + target.title,
    link: target.url,
    seen: false,
  }

  inCharge.forEach(function(responsable) {
    notif._id = responsable.notification.length + 1;
    responsable.notification.push(notif);
    Collectivz.update(responsable);
  });
}
