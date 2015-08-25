/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'openguide-frontend',
    podModulePrefix: 'openguide-frontend/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    torii: {
      // a 'session' property will be injected on routes and controllers
      sessionServiceName: 'session',
      providers: {
        'github-oauth2': {
          apiKey:      '7a212c1b8e78245d0345',
          redirectUri: 'http://localhost:4200' // default is the current URL
        }
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
     contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' http://openguide.com:35729",
      'font-src': "'self' http://fonts.gstatic.com",
      'connect-src': "'self' http://dev.openguide.com http://openguide.com:35729 http://openguide.cnx.org ws://openguide.com:35729/",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    //ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://openguide.dev';
    ENV.APP.API_NAMESPACE = 'data/v1';
    // ENV.torii = {
    //   sessionServiceName: 'session',
    //   providers: {
    //     'github-oauth2': {
    //       apiKey: '7a212c1b8e78245d0345',
    //       redirectUri: 'http://localhost:4200',
    //     }
    //   }
    // };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'http://openguide.cnx.org';
    ENV.APP.API_NAMESPACE = 'data/v1';
  }

  return ENV;
};
