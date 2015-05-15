import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    
    var result = this.store.findAll('book', {
      page: 1
    });
    
    var meta = this.store.metadataFor('book');

    if (meta.next) {
      this.store.find('book', {page: meta.next})
    }
    
    return result;
  }
});
