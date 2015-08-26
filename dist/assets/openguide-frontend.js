"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('openguide-frontend/acceptance-tests/main', ['exports', 'ember-cli-sri/acceptance-tests/main'], function (exports, main) {

	'use strict';



	exports['default'] = main['default'];

});
define('openguide-frontend/adapters/application', ['exports', 'openguide-frontend/adapters/drf'], function (exports, DRFAdapter) {

  'use strict';

  exports['default'] = DRFAdapter['default'].extend({
    coalesceFindRequests: true
  });

});
define('openguide-frontend/adapters/drf', ['exports', 'ember-django-adapter/adapters/drf', 'openguide-frontend/config/environment'], function (exports, DRFAdapter, ENV) {

  'use strict';

  exports['default'] = DRFAdapter['default'].extend({
    host: (function () {
      return ENV['default'].APP.API_HOST;
    }).property(),

    namespace: (function () {
      return ENV['default'].APP.API_NAMESPACE;
    }).property()
  });

});
define('openguide-frontend/adapters/github-organization', ['exports', 'ember-data-github/adapters/github-organization'], function (exports, githubOrganization) {

	'use strict';

	exports['default'] = githubOrganization['default'];

});
define('openguide-frontend/adapters/github-repository', ['exports', 'ember-data-github/adapters/github-repository'], function (exports, githubRepository) {

	'use strict';

	exports['default'] = githubRepository['default'];

});
define('openguide-frontend/adapters/github-user', ['exports', 'ember-data-github/adapters/github-user'], function (exports, githubUser) {

	'use strict';

	exports['default'] = githubUser['default'];

});
define('openguide-frontend/adapters/github', ['exports', 'ember-data-github/adapters/github'], function (exports, github) {

	'use strict';

	exports['default'] = github['default'];

});
define('openguide-frontend/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'openguide-frontend/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('openguide-frontend/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'openguide-frontend/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('openguide-frontend/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('openguide-frontend/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('openguide-frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'openguide-frontend/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('openguide-frontend/initializers/ember-moment', ['exports', 'ember-moment/helpers/moment', 'ember-moment/helpers/ago', 'ember-moment/helpers/duration', 'ember'], function (exports, moment, ago, duration, Ember) {

  'use strict';

  var initialize = function initialize() /* container, app */{
    var registerHelper;

    if (Ember['default'].HTMLBars) {
      registerHelper = function (helperName, fn) {
        Ember['default'].HTMLBars._registerHelper(helperName, Ember['default'].HTMLBars.makeBoundHelper(fn));
      };
    } else {
      registerHelper = Ember['default'].Handlebars.helper;
    };

    registerHelper('moment', moment['default']);
    registerHelper('ago', ago['default']);
    registerHelper('duration', duration['default']);
  };

  exports['default'] = {
    name: 'ember-moment',

    initialize: initialize
  };

  exports.initialize = initialize;

});
define('openguide-frontend/initializers/export-application-global', ['exports', 'ember', 'openguide-frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('openguide-frontend/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, RedirectHandler) {

  'use strict';

  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(container, app) {
      app.deferReadiness();
      RedirectHandler['default'].handle(window)['catch'](function () {
        app.advanceReadiness();
      });
    }
  };

});
define('openguide-frontend/initializers/initialize-torii-session', ['exports', 'torii/configuration', 'torii/bootstrap/session'], function (exports, configuration, bootstrapSession) {

  'use strict';

  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(container) {
      if (configuration['default'].sessionServiceName) {
        bootstrapSession['default'](container, configuration['default'].sessionServiceName);
        container.injection('adapter', configuration['default'].sessionServiceName, 'torii:session');
      }
    }
  };

});
define('openguide-frontend/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration'], function (exports, bootstrapTorii, configuration) {

  'use strict';

  var initializer = {
    name: 'torii',
    initialize: function initialize(container, app) {
      bootstrapTorii['default'](container);
      app.inject('route', 'torii', 'torii:main');
    }
  };

  if (window.DS) {
    initializer.after = 'store';
  }

  exports['default'] = initializer;

});
define('openguide-frontend/models/github-organization', ['exports', 'ember-data-github/models/github-organization'], function (exports, githubOrganization) {

	'use strict';

	exports['default'] = githubOrganization['default'];

});
define('openguide-frontend/models/github-repository', ['exports', 'ember-data-github/models/github-repository'], function (exports, githubRepository) {

	'use strict';

	exports['default'] = githubRepository['default'];

});
define('openguide-frontend/models/github-user', ['exports', 'ember-data-github/models/github-user'], function (exports, githubUser) {

	'use strict';

	exports['default'] = githubUser['default'];

});
define('openguide-frontend/pods/application/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    search: '',
    hasGithub: false,
    actions: {
      query: function query() {
        //the current value of the field
        var query = this.get('search');
        this.transitionToRoute('search', { query: query });
      }
    }
  });

});
define('openguide-frontend/pods/application/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      signInViaGithub: function signInViaGithub() {
        var route = this;

        this.get('session').open('github-oauth2').then(function () {
          route.controller.set('hasGithub', true);
          alert('success!');
        }, function (error) {
          route.controller.set('error', 'Could not sign you in: ' + error.message);
        });
      }
    }
  });

});
define('openguide-frontend/pods/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 16
            },
            "end": {
              "line": 16,
              "column": 43
            }
          },
          "moduleName": "openguide-frontend/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Themes");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 16
            },
            "end": {
              "line": 17,
              "column": 41
            }
          },
          "moduleName": "openguide-frontend/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Books");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 16
            },
            "end": {
              "line": 18,
              "column": 47
            }
          },
          "moduleName": "openguide-frontend/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Elements");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 16
            },
            "end": {
              "line": 21,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n  One sec while we get you signed in...\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 25,
                "column": 2
              }
            },
            "moduleName": "openguide-frontend/pods/application/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("logout");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 25,
                "column": 2
              },
              "end": {
                "line": 29,
                "column": 2
              }
            },
            "moduleName": "openguide-frontend/pods/application/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            var el2 = dom.createTextNode("\n    Sign In\n  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [
            ["element","action",["signInViaGithub"],[],["loc",[null,[26,10],[26,38]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/application/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["content","error",["loc",[null,[22,2],[22,11]]]],
          ["block","if",[["get","hasGithub",["loc",[null,[23,8],[23,17]]]]],[],0,1,["loc",[null,[23,2],[29,9]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 60,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/application/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Fixed navbar ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default navbar-fixed-top");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target","#navbar");
        dom.setAttribute(el4,"aria-expanded","false");
        dom.setAttribute(el4,"aria-controls","navbar");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("OpenGuide");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"id","navbar");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("            <li>{{#link-to 'index'}}Home{{/link-to}}</li>");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("\n            <li class=\"dropdown\">\n              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n              <ul class=\"dropdown-menu\" role=\"menu\">\n{{#each model as |theme|}}\n                <li>{{#link-to 'theme' theme}}{{theme.title}}{{/link-to}}</li>\n                {{/each}}                <li><a href=\"#\">Another action</a></li>\n                <li><a href=\"#\">Something else here</a></li>\n                <li class=\"divider\"></li>\n                <li class=\"dropdown-header\">Nav header</li>\n                <li><a href=\"#\">Separated link</a></li>\n                <li><a href=\"#\">One more separated link</a></li>\n              </ul>\n            </li>\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("/.nav-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","footer");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","text-muted");
        var el4 = dom.createTextNode("© 2015 OpenStax");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 1, 3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [5]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [7]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [9]),0,0);
        morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["block","link-to",["themes"],[],0,null,["loc",[null,[16,16],[16,55]]]],
        ["block","link-to",["books"],[],1,null,["loc",[null,[17,16],[17,53]]]],
        ["block","link-to",["elements"],[],2,null,["loc",[null,[18,16],[18,59]]]],
        ["block","if",[["get","session.isWorking",["loc",[null,[19,22],[19,39]]]]],[],3,4,["loc",[null,[19,16],[30,7]]]],
        ["content","outlet",["loc",[null,[54,6],[54,16]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }()));

});
define('openguide-frontend/pods/book/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    pub_date: DS['default'].attr('date'),
    mod_date: DS['default'].attr('date'),
    theme: DS['default'].belongsTo('theme', { async: true }),
    elements: DS['default'].hasMany('element', { async: true })

  });

});
define('openguide-frontend/pods/book/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('openguide-frontend/pods/book/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 52
              }
            },
            "moduleName": "openguide-frontend/pods/book/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.name",["loc",[null,[12,36],[12,52]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "openguide-frontend/pods/book/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["element",["get","element",["loc",[null,[12,27],[12,34]]]]],[],0,null,["loc",[null,[12,6],[12,64]]]]
        ],
        locals: ["element"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/book/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 55,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/book/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-12 title");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n<h1>{{model.title}} <small> / {{#link-to 'theme' model.theme}}{{model.theme.title}}{{/link-to}}</small></h1>\n{{#each element in model.elements}}\n<div class=\"row\">\n  <div class=\"box\">\n    <div class=\"row\">\n    <h3 class=\"title\">{{element.name}} - {{element.bookPart}}</h3>\n    </div>\n    <div class=\"row\">\n      {{#each attribute in element.elementAttributes}}\n      <div class=\"thumb\"> \n        {{#unless attribute.text}}\n        <h4>{{attribute.label}}</h4>\n        <a href=\"{{attribute.image}}\" target=\"_blank\"><img src=\"{{attribute.thumb}}\" alt=\"\"/></a>\n        {{/unless}}\n      </div>\n      {{/each}}\n    </div>\n    <hr/>\n    <div class=\"row\">\n    <div class=\"attrs\">\n            {{#each attribute in element.elementAttributes}}\n\n      {{#if attribute.text}}\n      <p><strong>{{attribute.label}}</strong>: {{attribute.text}}</p>\n      {{/if}}\n      {{/each}}\n    </div>\n    </div>\n  </div>\n</div>  \n{{/each}}");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1, 1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["content","model.title",["loc",[null,[5,6],[5,21]]]],
        ["block","each",[["get","model.elements",["loc",[null,[9,8],[9,22]]]]],[],0,1,["loc",[null,[9,0],[19,9]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('openguide-frontend/pods/books/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {

      var result = this.store.findAll('book', {
        page: 1
      });

      var meta = this.store.metadataFor('book');

      if (meta.next) {
        this.store.find('book', { page: meta.next });
      }

      return result;
    }
  });

});
define('openguide-frontend/pods/books/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 44
              }
            },
            "moduleName": "openguide-frontend/pods/books/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","book.title",["loc",[null,[12,30],[12,44]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "openguide-frontend/pods/books/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["book",["get","book",["loc",[null,[12,24],[12,28]]]]],[],0,null,["loc",[null,[12,6],[12,56]]]]
        ],
        locals: ["book"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/books/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/books/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-6 title");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Books");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n{{#each book in model}}\n\n  <div class=\"table-responsive\">\n<h3>{{#link-to 'book' book}}{{book.title}}{{/link-to}}<small>Theme: {{#link-to 'theme' book.theme}}{{book.theme.title}}{{/link-to}}</small></h3>\n<table class=\"table table-striped\">\n  <thead>\n    <tr>\n      <th>\n        Elements\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    {{#each element in book.elements}}\n    <tr>\n      <td>\n        {{#link-to 'element' element}}{{element.name}}{{/link-to}}\n      </td>\n  </tr>    \n    {{/each}}\n</tbody>    \n</table>\n</div>\n  {{/each}}");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 3]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["block","each",[["get","model",["loc",[null,[9,8],[9,13]]]]],[],0,1,["loc",[null,[9,0],[19,9]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('openguide-frontend/pods/element-attribute/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    element: DS['default'].belongsTo('element', { async: true }),
    label: DS['default'].attr('string'),
    text: DS['default'].attr('string'),
    image: DS['default'].attr('string'),
    thumb: DS['default'].attr('string')
  });

});
define('openguide-frontend/pods/element/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    theme: DS['default'].belongsTo('theme', { async: true }),
    books: DS['default'].hasMany('book', { async: true }),
    pub_date: DS['default'].attr('date'),
    mod_date: DS['default'].attr('date'),
    bookPart: DS['default'].attr('string'),
    elementAttributes: DS['default'].hasMany('elementAttribute', { async: true })
  });

});
define('openguide-frontend/pods/element/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('openguide-frontend/pods/element/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 3
              },
              "end": {
                "line": 19,
                "column": 3
              }
            },
            "moduleName": "openguide-frontend/pods/element/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","col-lg-6 screenshot");
            var el2 = dom.createTextNode("\n   \n  ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    \n  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element1, 'src');
            return morphs;
          },
          statements: [
            ["attribute","src",["concat",["http://openguide.cnx.org",["get","attribute.image",["loc",[null,[16,38],[16,53]]]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/element/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","attribute.image",["loc",[null,[13,9],[13,24]]]]],[],0,null,["loc",[null,[13,3],[19,10]]]]
        ],
        locals: ["attribute"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 2
              },
              "end": {
                "line": 29,
                "column": 2
              }
            },
            "moduleName": "openguide-frontend/pods/element/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","col-lg-6");
            var el2 = dom.createTextNode("\n    \n    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("p");
            var el3 = dom.createElement("strong");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode(": ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n  ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      \n  ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [0, 1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]),0,0);
            morphs[1] = dom.createMorphAt(element0,2,2);
            return morphs;
          },
          statements: [
            ["content","attribute.label",["loc",[null,[25,15],[25,34]]]],
            ["content","attribute.text",["loc",[null,[26,2],[26,20]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 2
            },
            "end": {
              "line": 30,
              "column": 2
            }
          },
          "moduleName": "openguide-frontend/pods/element/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","attribute.text",["loc",[null,[22,8],[22,22]]]]],[],0,null,["loc",[null,[22,2],[29,9]]]]
        ],
        locals: ["attribute"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/element/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-12 title");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("small");
        var el6 = dom.createTextNode("in ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  \n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [1, 1, 1]);
        var element4 = dom.childAt(element2, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(element3,0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [2]),1,1);
        morphs[3] = dom.createMorphAt(element4,1,1);
        morphs[4] = dom.createMorphAt(element4,2,2);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["content","model.name",["loc",[null,[5,6],[5,20]]]],
        ["content","model.bookPart",["loc",[null,[6,14],[6,32]]]],
        ["block","each",[["get","model.elementAttributes",["loc",[null,[12,8],[12,31]]]]],[],0,null,["loc",[null,[12,0],[20,9]]]],
        ["block","each",[["get","model.elementAttributes",["loc",[null,[21,10],[21,33]]]]],[],1,null,["loc",[null,[21,2],[30,11]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('openguide-frontend/pods/elements/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    sortedList: (function () {
      return Ember['default'].ArrayProxy.createWithMixins(Ember['default'].SortableMixin, {
        sortProperties: ['name', 'bookPart'],
        sortAscending: true,
        content: this.get('model')
      });
    }).property('model')
  });

});
define('openguide-frontend/pods/elements/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      var result = this.store.findAll('element', {
        page: 1
      });

      var meta = this.store.metadataFor('element');

      if (meta.next) {
        this.store.find('element', { page: meta.next });
      }

      return result;
    }
  });

});
define('openguide-frontend/pods/elements/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 52
              }
            },
            "moduleName": "openguide-frontend/pods/elements/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.name",["loc",[null,[14,36],[14,52]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 2
            }
          },
          "moduleName": "openguide-frontend/pods/elements/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["element",["get","element",["loc",[null,[14,27],[14,34]]]]],[],0,null,["loc",[null,[14,6],[14,64]]]]
        ],
        locals: ["element"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 2
            },
            "end": {
              "line": 21,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/elements/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 42,
                "column": 0
              },
              "end": {
                "line": 42,
                "column": 46
              }
            },
            "moduleName": "openguide-frontend/pods/elements/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.name",["loc",[null,[42,30],[42,46]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 44,
                "column": 4
              },
              "end": {
                "line": 44,
                "column": 53
              }
            },
            "moduleName": "openguide-frontend/pods/elements/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.theme.title",["loc",[null,[44,30],[44,53]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 47,
                "column": 8
              },
              "end": {
                "line": 47,
                "column": 54
              }
            },
            "moduleName": "openguide-frontend/pods/elements/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.book.title",["loc",[null,[47,32],[47,54]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 39,
              "column": 0
            },
            "end": {
              "line": 50,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/elements/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),1,1);
          return morphs;
        },
        statements: [
          ["block","link-to",["element",["get","element",["loc",[null,[42,21],[42,28]]]]],[],0,null,["loc",[null,[42,0],[42,58]]]],
          ["content","element.bookPart",["loc",[null,[43,10],[43,30]]]],
          ["block","link-to",["theme",["get","theme",["loc",[null,[44,23],[44,28]]]]],[],1,null,["loc",[null,[44,4],[44,65]]]],
          ["block","link-to",["book",["get","book",["loc",[null,[47,26],[47,30]]]]],[],2,null,["loc",[null,[47,8],[47,66]]]]
        ],
        locals: ["element"],
        templates: [child0, child1, child2]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/elements/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-6 title");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Elements");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","table-responsive");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4,"class","table table-striped");
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("thead");
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("tr");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("th");
        var el8 = dom.createTextNode("Name");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("th");
        var el8 = dom.createTextNode("Part of Book");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("th");
        var el8 = dom.createTextNode("Theme");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("th");
        var el8 = dom.createTextNode("Book");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tbody");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [5, 1, 1, 3]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["block","each",[["get","sortedList",["loc",[null,[11,8],[11,18]]]]],[],0,1,["loc",[null,[11,0],[21,9]]]],
        ["block","each",[["get","sortedList",["loc",[null,[39,8],[39,18]]]]],[],2,null,["loc",[null,[39,0],[50,9]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('openguide-frontend/pods/index/controller', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('openguide-frontend/pods/index/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      //  var result = Ember.RSVP.hash({
      //    themes: this.store.findAll('theme', {
      //      page: 1
      //    }),
      //    books: this.store.findAll('book', {
      //      page: 1
      //    }),
      //    elements: this.store.findAll('element', {
      //      page: 1
      //    })
      //  });
      //
      //  var themeMeta = this.store.metadataFor('theme');
      //  var bookMeta = this.store.metadataFor('book');
      //  var elementMeta = this.store.metadataFor('element');
      //
      //  if (themeMeta.next) {
      //      store.find('theme', {page: themeMeta.next})
      //    } else if (bookMeta.next) {
      //      store.find('book', {page: bookMeta.next})
      //    } else if (elementMeta.next) {
      //      store.find('element', {page: elementMeta.next})
      //    }
      //
      //  return result;
    }
  });

});
define('openguide-frontend/pods/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 13
            },
            "end": {
              "line": 14,
              "column": 86
            }
          },
          "moduleName": "openguide-frontend/pods/index/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Themes »");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 13
            },
            "end": {
              "line": 20,
              "column": 84
            }
          },
          "moduleName": "openguide-frontend/pods/index/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Books »");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 13
            },
            "end": {
              "line": 26,
              "column": 90
            }
          },
          "moduleName": "openguide-frontend/pods/index/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Elements »");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 132,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","lead");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("OpenGuide");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("    \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main index");
        var el2 = dom.createTextNode("\n      \n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-4");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","img-circle");
        dom.setAttribute(el4,"src","data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        dom.setAttribute(el4,"alt","Generic placeholder image");
        dom.setAttribute(el4,"width","140");
        dom.setAttribute(el4,"height","140");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Themes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.col-lg-4 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-4");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","img-circle");
        dom.setAttribute(el4,"src","data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        dom.setAttribute(el4,"alt","Generic placeholder image");
        dom.setAttribute(el4,"width","140");
        dom.setAttribute(el4,"height","140");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Books");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.col-lg-4 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-4");
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","img-circle");
        dom.setAttribute(el4,"src","data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
        dom.setAttribute(el4,"alt","Generic placeholder image");
        dom.setAttribute(el4,"width","140");
        dom.setAttribute(el4,"height","140");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Elements");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.col-lg-4 ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.row ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n<div class=\"row\">\n<div class=\"themes\">\n<h1>OpenGuide</h1>\n  <div class=\"table-responsive\">\n    <h3>{{#link-to 'themes'}}Themes{{/link-to}}</h3>\n  <table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>ID</th>\n        <th>Title</th>\n        <th>Books</th>\n        <th>Date</th>\n      </tr>\n    </thead>\n    <tbody>\n      \n{{#each theme in model.themes}}\n      <tr>\n        <td>\n          {{theme.id}}\n        </td>\n      <td>{{#link-to 'theme' theme}}{{theme.title}}         {{/link-to}}\n      </td>\n        <td>\n          {{#each book in theme.books}}\n          <ul>\n            <li>{{#link-to 'book' book}}{{book.title}}{{/link-to}}</li>\n          </ul>\n          {{/each}}\n        </td>\n        <td>{{moment theme.mod_date}}</td>\n        </tr>\n    {{/each}}        \n      </tbody>\n    </table>\n  </div>\n</div>\n</div>\n<div class=\"row\">\n<div class=\"books\">\n\n    <div class=\"table-responsive\">\n<h3>{{#link-to 'books'}}Books{{/link-to}}</h3>\n  <table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th>ID</th>\n        <th>Title</th>\n        <th>Theme</th>\n        <th>Date</th>\n      </tr>\n    </thead>\n    <tbody>\n{{#each book in model.books}}\n      <tr>\n        <td>{{book.id}}</td>\n        <td>\n          {{#link-to 'book' book}}{{book.title}}{{/link-to}}\n        </td>\n        <td>\n          {{#link-to 'theme' theme}}{{book.theme.title}}{{/link-to}}\n        </td>\n        <td>{{moment book.mod_date}}</td>\n      </tr>\n    {{/each}}    </tbody>\n  </table>\n  </div>\n</div>\n</div>\n<div class=\"row\">\n  <div class=\"elements\">\n    \n      <div class=\"table-responsive\">\n<h3>{{#link-to 'elements'}}Elements{{/link-to}}</h3>\n    <table class=\"table table-striped\">\n      <thead>\n      <tr>\n        <th>ID</th>\n        <th>Name</th>\n        <th>Part of Book</th>\n        <th>Date</th>\n      </tr>\n    </thead>\n    <tbody>\n{{#each element in model.elements}}\n      <tr>\n        <td>{{element.id}}</td>\n        <td>\n          {{#link-to 'element' element}}{{element.name}}{{/link-to}}\n        </td>\n        <td>{{element.bookPart}}</td>\n        <td>{{moment element.mod_date}}</td>\n      </tr>\n    {{/each}}      </tbody>\n    </table>\n    </div>\n  </div>\n</div>");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 7]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [4, 7]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7, 7]),0,0);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["block","link-to",["themes"],["class","btn btn-default","role","button"],0,null,["loc",[null,[14,13],[14,98]]]],
        ["block","link-to",["books"],["class","btn btn-default","role","button"],1,null,["loc",[null,[20,13],[20,96]]]],
        ["block","link-to",["elements"],["class","btn btn-default","role","button"],2,null,["loc",[null,[26,13],[26,102]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('openguide-frontend/pods/theme/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    pub_date: DS['default'].attr('date'),
    mod_date: DS['default'].attr('date'),
    books: DS['default'].hasMany('book', { async: true }),
    elements: DS['default'].hasMany('element', { async: true })

  });

});
define('openguide-frontend/pods/theme/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('openguide-frontend/pods/theme/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 44
              }
            },
            "moduleName": "openguide-frontend/pods/theme/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","book.title",["loc",[null,[13,30],[13,44]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "openguide-frontend/pods/theme/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["book",["get","book",["loc",[null,[13,24],[13,28]]]]],[],0,null,["loc",[null,[13,6],[13,56]]]]
        ],
        locals: ["book"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 4
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/theme/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 6
              },
              "end": {
                "line": 27,
                "column": 52
              }
            },
            "moduleName": "openguide-frontend/pods/theme/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","element.name",["loc",[null,[27,36],[27,52]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 4
            }
          },
          "moduleName": "openguide-frontend/pods/theme/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["element",["get","element",["loc",[null,[27,27],[27,34]]]]],[],0,null,["loc",[null,[27,6],[27,64]]]]
        ],
        locals: ["element"],
        templates: [child0]
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 4
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/theme/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 40,
            "column": 4
          }
        },
        "moduleName": "openguide-frontend/pods/theme/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-12 title");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Books");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Elements in ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" Theme");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n    \n    ");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1, 1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["content","model.title",["loc",[null,[5,10],[5,25]]]],
        ["block","each",[["get","model.books",["loc",[null,[10,8],[10,19]]]]],[],0,1,["loc",[null,[10,0],[20,9]]]],
        ["content","model.title",["loc",[null,[22,18],[22,33]]]],
        ["block","each",[["get","model.elements",["loc",[null,[24,8],[24,22]]]]],[],2,3,["loc",[null,[24,0],[34,9]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('openguide-frontend/pods/themes/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      var result = this.store.findAll('theme', {
        page: 1
      });

      var meta = this.store.metadataFor('theme');

      if (meta.next) {
        this.store.find('theme', { page: meta.next });
      }

      return result;
    }

  });

});
define('openguide-frontend/pods/themes/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 47
              }
            },
            "moduleName": "openguide-frontend/pods/themes/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","theme.title",["loc",[null,[12,32],[12,47]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "openguide-frontend/pods/themes/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-4");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","box");
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["block","link-to",["theme",["get","theme",["loc",[null,[12,25],[12,30]]]]],[],0,null,["loc",[null,[12,6],[12,59]]]]
        ],
        locals: ["theme"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "openguide-frontend/pods/themes/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-lg-12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("Sorry, nothing here...");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 6
          }
        },
        "moduleName": "openguide-frontend/pods/themes/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-lg-6 title");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Themes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 3]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["block","each",[["get","model",["loc",[null,[9,8],[9,13]]]]],[],0,1,["loc",[null,[9,0],[19,9]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('openguide-frontend/pods/user/model', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({});

});
define('openguide-frontend/pods/users/route', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('openguide-frontend/pods/users/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/pods/users/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('openguide-frontend/router', ['exports', 'ember', 'openguide-frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource('books', function () {});
    this.resource('book', { path: '/books/:book_id' }, function () {});
    this.resource('themes', function () {});
    this.resource('theme', { path: '/themes/:theme_id' }, function () {});
    this.resource('elements', function () {});
    this.resource('element', { path: '/elements/:element_id' }, function () {});
    this.route('users');
  });

  exports['default'] = Router;

});
define('openguide-frontend/serializers/application', ['exports', 'openguide-frontend/serializers/drf'], function (exports, DRFSerializer) {

	'use strict';

	exports['default'] = DRFSerializer['default'];

});
define('openguide-frontend/serializers/book', ['exports', 'openguide-frontend/serializers/drf', 'ember-data'], function (exports, DRFSerializer, DS) {

  'use strict';

  exports['default'] = DRFSerializer['default'].extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      theme: { embedded: 'always' },
      elements: { embedded: 'always' }
    }
  });

});
define('openguide-frontend/serializers/drf', ['exports', 'ember-django-adapter/serializers/drf'], function (exports, DRFSerializer) {

	'use strict';

	exports['default'] = DRFSerializer['default'];

});
define('openguide-frontend/serializers/element', ['exports', 'openguide-frontend/serializers/drf', 'ember-data'], function (exports, DRFSerializer, DS) {

  'use strict';

  exports['default'] = DRFSerializer['default'].extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      theme: { embedded: 'always' },
      books: { embedded: 'always' },
      elementAttributes: { embedded: 'always' }
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

});
define('openguide-frontend/serializers/github-organization', ['exports', 'ember-data-github/serializers/github-organization'], function (exports, githubOrganization) {

	'use strict';

	exports['default'] = githubOrganization['default'];

});
define('openguide-frontend/serializers/github-repository', ['exports', 'ember-data-github/serializers/github-repository'], function (exports, githubRepository) {

	'use strict';

	exports['default'] = githubRepository['default'];

});
define('openguide-frontend/serializers/github-user', ['exports', 'ember-data-github/serializers/github-user'], function (exports, githubUser) {

	'use strict';

	exports['default'] = githubUser['default'];

});
define('openguide-frontend/serializers/github', ['exports', 'ember-data-github/serializers/github'], function (exports, github) {

	'use strict';

	exports['default'] = github['default'];

});
define('openguide-frontend/serializers/theme', ['exports', 'openguide-frontend/serializers/drf', 'ember-data'], function (exports, DRFSerializer, DS) {

  'use strict';

  exports['default'] = DRFSerializer['default'].extend(DS['default'].EmbeddedRecordsMixin, {
    attrs: {
      books: { embedded: 'always' },
      elements: { embedded: 'always' }
    }
  });

});
define('openguide-frontend/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "openguide-frontend/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Welcome to Ember");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('openguide-frontend/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/helpers/resolver', ['exports', 'ember/resolver', 'openguide-frontend/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('openguide-frontend/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/helpers/start-app', ['exports', 'ember', 'openguide-frontend/app', 'openguide-frontend/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('openguide-frontend/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/application/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/controller.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/controller.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/application/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/book/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/book');
  QUnit.test('pods/book/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/book/model.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/book/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/book');
  QUnit.test('pods/book/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/book/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/books/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/books');
  QUnit.test('pods/books/route.js should pass jshint', function(assert) { 
    assert.ok(false, 'pods/books/route.js should pass jshint.\npods/books/route.js: line 13, col 49, Missing semicolon.\n\n1 error'); 
  });

});
define('openguide-frontend/tests/pods/element-attribute/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/element-attribute');
  QUnit.test('pods/element-attribute/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/element-attribute/model.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/element/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/element');
  QUnit.test('pods/element/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/element/model.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/element/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/element');
  QUnit.test('pods/element/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/element/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/elements/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/elements');
  QUnit.test('pods/elements/controller.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/elements/controller.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/elements/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/elements');
  QUnit.test('pods/elements/route.js should pass jshint', function(assert) { 
    assert.ok(false, 'pods/elements/route.js should pass jshint.\npods/elements/route.js: line 12, col 52, Missing semicolon.\n\n1 error'); 
  });

});
define('openguide-frontend/tests/pods/index/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/index');
  QUnit.test('pods/index/controller.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/index/controller.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/index/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/index');
  QUnit.test('pods/index/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/index/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/theme/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/theme');
  QUnit.test('pods/theme/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/theme/model.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/theme/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/theme');
  QUnit.test('pods/theme/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/theme/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/themes/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/themes');
  QUnit.test('pods/themes/route.js should pass jshint', function(assert) { 
    assert.ok(false, 'pods/themes/route.js should pass jshint.\npods/themes/route.js: line 13, col 50, Missing semicolon.\n\n1 error'); 
  });

});
define('openguide-frontend/tests/pods/user/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/user');
  QUnit.test('pods/user/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/user/model.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/pods/users/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/users');
  QUnit.test('pods/users/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/users/route.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/serializers/book.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/book.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/book.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/serializers/element.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/element.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/element.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/serializers/theme.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/theme.js should pass jshint', function(assert) { 
    assert.ok(true, 'serializers/theme.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/test-helper', ['openguide-frontend/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('openguide-frontend/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/torii-adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - torii-adapters');
  QUnit.test('torii-adapters/application.js should pass jshint', function(assert) { 
    assert.ok(false, 'torii-adapters/application.js should pass jshint.\ntorii-adapters/application.js: line 2, col 8, \'config\' is defined but never used.\n\n1 error'); 
  });

});
define('openguide-frontend/tests/unit/models/book-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('book', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/models/book-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/book-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/book-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/models/element-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('element', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/models/element-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/element-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/element-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/models/theme-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('theme', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/models/theme-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/theme-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/theme-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/application/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('openguide-frontend/tests/unit/pods/application/controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/application');
  QUnit.test('unit/pods/application/controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/application/controller-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/application/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/application/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/application');
  QUnit.test('unit/pods/application/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/application/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/book/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('book', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/pods/book/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/book');
  QUnit.test('unit/pods/book/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/book/model-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/book/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:book', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/book/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/book');
  QUnit.test('unit/pods/book/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/book/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/books/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:books', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/books/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/books');
  QUnit.test('unit/pods/books/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/books/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/element-attribute/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('element-attributes', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/pods/element-attribute/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/element-attribute');
  QUnit.test('unit/pods/element-attribute/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/element-attribute/model-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/element/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('element', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/pods/element/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/element');
  QUnit.test('unit/pods/element/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/element/model-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/element/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:element', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/element/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/element');
  QUnit.test('unit/pods/element/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/element/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/elements/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:elements', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('openguide-frontend/tests/unit/pods/elements/controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/elements');
  QUnit.test('unit/pods/elements/controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/elements/controller-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/elements/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:elements', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/elements/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/elements');
  QUnit.test('unit/pods/elements/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/elements/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/index/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('openguide-frontend/tests/unit/pods/index/controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/index');
  QUnit.test('unit/pods/index/controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/index/controller-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/index/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/index');
  QUnit.test('unit/pods/index/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/index/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/theme/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('theme', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/pods/theme/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/theme');
  QUnit.test('unit/pods/theme/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/theme/model-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/theme/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:theme', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/theme/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/theme');
  QUnit.test('unit/pods/theme/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/theme/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/themes/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:themes', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/themes/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/themes');
  QUnit.test('unit/pods/themes/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/themes/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/user/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('openguide-frontend/tests/unit/pods/user/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/user');
  QUnit.test('unit/pods/user/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/user/model-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/pods/users/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:users', 'Unit | Route | users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/pods/users/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/users');
  QUnit.test('unit/pods/users/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/users/route-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/routes/book-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:book', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/routes/book-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/book-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/book-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/routes/element-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:element', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/routes/element-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/element-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/element-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/tests/unit/routes/theme-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:theme', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('openguide-frontend/tests/unit/routes/theme-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/theme-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/theme-test.js should pass jshint.'); 
  });

});
define('openguide-frontend/torii-adapters/application', ['exports', 'ember', 'openguide-frontend/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    open: function open(authentication) {
      var authorizationCode = authentication.authorizationCode;
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        Ember['default'].$.ajax({
          url: 'http://openguide.dev/data/v1/users',
          data: { 'github-auth-code': authorizationCode },
          dataType: 'json',
          success: Ember['default'].run.bind(null, resolve),
          error: Ember['default'].run.bind(null, reject)
        });
      }).then(function (user) {
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

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('openguide-frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'openguide-frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("openguide-frontend/tests/test-helper");
} else {
  require("openguide-frontend/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_VIEW_LOOKUPS":true,"API_HOST":"http://openguide.dev","API_NAMESPACE":"data/v1","name":"openguide-frontend","version":"0.0.0+cf7bea35","API_ADD_TRAILING_SLASHES":true});
}

/* jshint ignore:end */
//# sourceMappingURL=openguide-frontend.map