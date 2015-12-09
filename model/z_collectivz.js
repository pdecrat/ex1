Collectivz = {};

Collectivz.collections = {
  Person: Meteor.users,
  Idea: Idea,
  // Project: Project,
  // Challenge: Challenge,
  // Election: Election,
  // Mission: Mission,
  // Survey: Survey,
  // Team: Team,
  // Wall: Wall
};


// Collectivz provides all basic functions for its collections

// query must have a type field set to a value that matches a
//  field name in Collectivz.collections

// query can have a field options which is an object

Collectivz.find = function (query) {
  //il se passe un truc chelou quand je passe l'object query dans le find : il retrouve pas tout les objets !
  //du coup j'ai rajouté un champs options
  //  options = query.options || {};
    return Collectivz.collections[query.type].find(query);
};

Collectivz.findOne = function (query) {
  //  options = query.options || {};
  return Collectivz.collections[query.type].findOne(query);
};

Collectivz.insert = function (query) {
    return Collectivz.collections[query.type].insert(query);
};

Collectivz.update = function (query) {
    return Collectivz.collections[query.type].update(query._id, query);
};

Collectivz.remove = function (query) {
  return Collectivz.collections[query.type].remove(query._id);
};

/*
** Collectivz.templateSub(context, options)
** context <=> this (dataContext from calling template)
** options <=> undefined, null or {search: Boolean}
**
**
** You can invoke Collectivz.templateSub(this) in any template to automatically
** subscribe to a collection depending on the current route.
** You can then access Template.instance().getItems() if action <=> list
** or Template.instance().getItem() if action <=> view
** to get the matching element(s)
** if options.search = true, setting Template.instance().search (default value: '')
** to the an input value will take care of returning the matching values.
**
*/

// Collectivz.templateSub = function (self) {
//    var type = FlowRouter.getParam('type');
//    var action = FlowRouter.getParam('action');
//    var _id = FlowRouter.getParam('_id');
//
//    self.autorun(function() {
//       self.subscribe(type, {action: action, _id: _id});
//    });
// }
