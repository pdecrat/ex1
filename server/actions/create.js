Actions = {};

Actions.create = function(data) {
  var newId = new Mongo.ObjectID();

  data._id = newId._str;
  data.url = '/' + data.type + 'View/' + data._id;
  data.createdAt = new Date();
  return Collectivz[data.type].insert(data);
}
