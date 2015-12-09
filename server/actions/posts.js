Actions.post = function(origin, target, params) {
  var post = {};
  var wall = Collectivz.findOne({
    type: 'Wall',
    attachedTo: {
    '_id': target._id,
    'type': target.type
  }
 });

  post.content = params.post;
  post.inCharge = origin.username;
  post.createdAt = new Date();
  if (wall === undefined) {
    wall = {
      posts: [post],
      type: 'Wall'
    };
    wall.attachedTo = {_id: target._id, type: target.type};
    Actions.create(wall)
  } else {
    wall.posts.push(post);
    Collectivz.update(wall);
  }
}
