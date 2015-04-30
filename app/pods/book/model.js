import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  theme: DS.belongsTo('theme', {async: true}),
  elements: DS.hasMany('element', {async: true})

});
