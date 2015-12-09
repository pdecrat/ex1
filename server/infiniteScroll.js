Meteor.publish('scroll', function(options, searchString) {
   check(options, Match.Optional({
      "skip": Number,
      "limit": Number,
      "sort": { name: Number}
   }));

   check(searchString,Match.OneOf(String, null, undefined));

   if (searchString == null || searchString == undefined)
     searchString = '';

    return Scroll.find({
      'name': { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
   }, options);
});
