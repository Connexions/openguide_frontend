import DRFSerializer from './drf';
import DS from 'ember-data';

export default DRFSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    theme: {embedded: 'always'},
    books: {embedded: 'always'},
    elementAttributes: {embedded: 'always'},
  }
});

//export default
//DS.RESTSerializer.extend({
//  normalizeHash: {
//    attributes: function(hash) {
//      hash.elementAttributes = hash.attributes;
//      delete hash.attributes;
//
//      return hash;
//    }
//  }
//});