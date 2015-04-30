import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('books', function() {});
  this.resource('book', {path: '/books/:book_id'}, function() {});
  this.resource('themes', function() {});
  this.resource('theme', {path: '/themes/:theme_id'}, function() {});
  this.resource('elements', function() {});
  this.resource('element', {path: '/elements/:element_id'}, function() {});
});
