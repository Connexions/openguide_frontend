import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  books: DS.hasMany('book', {async: true}),
  elements: DS.hasMany('element', {async: true})

});
