import Ember from 'ember';

export default Ember.Route.extend({
model: function() {
  return Ember.RSVP.hash({
    themes: this.store.findAll('theme'),
    books: this.store.findAll('book'),
    elements: this.store.findAll('element')
  });    
  }
})
  ;
