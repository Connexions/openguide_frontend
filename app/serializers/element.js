import DRFSerializer from './drf';
import DS from 'ember-data';

export default DRFSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    theme: {embedded: 'always'},
    books: {embedded: 'always'}
  }
});
