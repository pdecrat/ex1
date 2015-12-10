
// Gather data from database, executes each actions on each targets,
//  and updates the database.
//
// Arguments:
//   origin: {origin._id, origin.type},
//   actions: [{action.name, action.params}],
//   targets: [{target._id, target.type}]


Actions.do = function(origin, actions, targets) {

  // Gathers documents related to the targets
  //
  // Arguments:
  //   references: targets
  // Returns:
  //   targets: [Mongo documents]
  var getDocs = function(references) {
    references.forEach(function(ref, i) {
      references[i] = Collectivz[ref.type].findOne(ref);
    });
    return references;
  };
  origin = Collectivz[origin.type].findOne(origin);


// Apply an array of action to an array of target
  if (Array.isArray(actions) && Array.isArray(targets)) {
    targets = getDocs(targets);
    targets.forEach(function(target) {
        actions.forEach(function(action) {
          Actions[action.name](origin, target, action.params);
        });
    });

    // Apply an array of action to a single target
  } else if (Array.isArray(actions)) {
    // console.log(Collectivz.findOne(targets));
    if (targets)
      targets = Collectivz[targets.type].findOne(targets);
    actions.forEach(function(action) {
      Actions[action.name](origin, targets, action.params);
    });

    // Apply an action to an array of target
  } else if (Array.isArray(targets)) {
    targets = getDocs(targets);
    targets.forEach(function(target) {
      Actions[actions.name](origin, target, actions.params);
    });

    // Apply an action to a single target
  } else {
    if (targets)
      targets = Collectivz[targets.type].findOne(targets);
    Actions[actions.name](origin, targets, actions.params);
  }


  // Update documents if no error is thrown during action phase
  Collectivz[origin.type].update(origin._id, origin);
  if (Array.isArray(targets)) {
    targets.forEach(function(el) {
      Collectivz[el.type].update(el._id, el);
    })
  } else if (targets) {
    Collectivz[targets.type].update(targets._id, targets);
  }
};
