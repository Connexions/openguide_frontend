import DS from 'ember-data';

export default DS.Model.extend({
  element: DS.belongsTo('element', {async: true}),
  label: DS.attr('string'),
  text: DS.attr('string'),
  image: DS.attr('string'),
  thumb: DS.attr('string'),
});
