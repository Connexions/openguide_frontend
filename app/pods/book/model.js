import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  pub_date: DS.attr('date'),
  mod_date: DS.attr('date'),
  theme: DS.belongsTo('theme', {async: true}),
  elements: DS.hasMany('element', {async: true})

});
