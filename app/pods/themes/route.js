import Ember from 'ember';
//import DS from 'ember-data';

export default Ember.Route.extend({
  model: function() {
    var result = this.store.findAll('theme', {
      page: 1
    });
    
    var meta = this.store.metadataFor('theme');
    
    if (meta.next) {
      this.store.find('theme', {page: meta.next})
    }
    
    return result;
  }
  
});
