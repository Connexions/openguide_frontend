import Ember from 'ember';
import config from '../config/environment';

// export default Ember.Object.extend({
//   open: function(authorization){
//     var temporaryCode = authorization.authorizationCode;
//
//     return new Ember.RSVP.Promise(function(resolve, reject){
//       Ember.$.ajax({
//         url: /,
//         type: "POST",
//         data: { 'github-auth-code': temporaryCode },
//         dataType: 'json',
//         success: Ember.run.bind(null, resolve),
//         error: function(jqXHR, textStatus, errorThrown){
//           Ember.run.bind(null, reject({ 'message': errorThrown }));
//         }
//       });
//     });
//   }
// });
export default Ember.Object.extend({
  open: function(authentication){
    var authorizationCode = authentication.authorizationCode;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: 'http://openguide.dev/data/v1/users',
        data: { 'github-auth-code': authorizationCode },
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    }).then(function(user){
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      console.log(user);
      return {
        currentUser: user
      };
    });
  }
});
