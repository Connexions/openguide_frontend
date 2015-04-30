import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  theme: DS.belongsTo('theme', {async: true}),
  books: DS.hasMany('book', {async: true})

});
