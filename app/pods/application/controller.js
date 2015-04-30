import Ember from 'ember';

export default Ember.Controller.extend({
  search: '',
  actions: {
    query: function() {
      //the current value of the field
      var query = this.get('search');
      this.transitionToRoute('search', {query: query });
    }
  }
});
