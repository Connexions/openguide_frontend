import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var result = this.store.findAll('element', {
      page: 1
    });
    
    var meta = this.store.metadataFor('element');

    if (meta.next) {
      this.store.find('element', {page: meta.next})
    }
    
    return result;
  }
});
