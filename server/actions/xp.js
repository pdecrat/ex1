Actions.getXp = function(origin, target, params) {
  if (origin.character.experience)
    origin.character.experience += params.xp;
  else
    origin.character.experience = params.xp;
}
