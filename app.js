var env = require('./_config/env.json'),
    http = require('http'),
    saucierGet = require('saucier-get')( new http.Agent({ keepAlive: true}) ),
    saucierCache = require('saucier-cache')(),
    templates = require('./public/templates/views'),
    saucier = require('saucier-core')(saucierGet, saucierCache, templates, {
      logFormat: '\033[1;32m:remote-addr ->\033[m [:date] \033[1;35m:method :url\033[m :http-version \033[1;34m:status\033[m :res[Content-Length]',
      staticDir: 'public',
      maxAge: '4d',
      envConfig: env
    }),
    routesWeb = require('./web')(saucier);

saucier.start();
