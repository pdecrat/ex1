Actions.survey = function(origin, target, params) {
  var survey = Collectivz.findOne({
    type: 'Survey',
    attachedTo: {
    '_id': target._id,
    'type': target.type
    },
    title: params.title
 });

  if (survey === undefined) {
    survey = params;
    survey.type = 'Survey';
    survey.attachedTo = {_id: target._id, type: target.type};
    Actions.create(survey);
  }
}
