Actions.giveCredits = function (origin, target, params) {
  if (origin._id != target._id) {
    if (origin.character.credits < params.cost) {
      throw new Meteor.Error('not-enough-minerals', 'the target needs more credits');
    } else {
      if (!target.credits) {
        target.credits = params.cost;
      } else {
        target.credits += params.cost;
      }
      origin.character.credits -=  params.cost;
    }
  } else {
    throw new Meteor.Error('cannot-credit-yourself', 'the target is the origin');
  }
};

Actions.pay = function(origin, target, params) {
  if (origin.character.credits > params.cost) {
    origin.character.credits -= params.cost;
  } else {
    throw new Meteor.Error('not-enough-credits', "You cannot afford that.");
  }
}
