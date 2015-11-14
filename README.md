# Example Saucier Application

* Move or create an `_config/env.json` file.
* Create an entry for your environment, `local` for development, etc,

```json
{
  "local": {
    "environment": "local",
    "api": "http://myapi.com/api",
    "ttl": "800",
    "maxAttempts" : 5,
    "retryDelay": 600
  }
}
```

* Configure your templates in `_src/_templates`.
* Dust.JS templates are compiled and moved to `/public` for use.
* Stating the application with `npm start` will also execute `gulp dust`, creating your compiled templates.
* Set `SAUCIERRENDER=false`, to avoid the render step.

## Redis

* Ensure **Redis** is installed and running.
* Saucier-Cache optionally accepts `port, host, options` and parameters when initialized. Use these if you need to pass a custom `port`, `host`, or `options` to Redis when starting.

## Routes

* Routes should follow the pattern in `web.js`

```javascript
module.exports = function attach(app) {
  app.handleGet('/', 'example.dust', {
    resource: [''],
    processors: {
      sample: function (data) {
        data.cheese = 'cake';
        return data;
      }
    }
  });
}
```

* `app.handleGet` accepts 3 parameters, route pattern `/`, template name `example.dust`, an options object.
* Options Object: 
  + **resource**: An array of strings representing backend (Drupal) resouces you want to query for this request.
  + **processors**: A series of functions to mutate the response data. These functions are executed sequentially, and should accept the response body `data`, and return the same object.

## App.js

* The main file for your application.

```javascript
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
```

* Require your environment configuration.
* Require either an `HTTP` or `HTTPS` agent. Pass the created agent, along with any options to `saucerGet`.
* Require `saucier-cache`, pass any options when initializing. See the section about Redis for more information.
* Require your templates, `./public/templates/views` is the path for your compiled templates, output from `gulp`.
* Require Saucier. 
  * pass in `saucierGet`, `saucierCache`, `templates`, and an options object.
  * Options Object:
      + **logFormat**: Uses any format parsed by Morgan.
      + **staticDir**: Directory used for static files.
      + **maxAge**: Max Age for static files
      + **envConfig**: The environment config.
* Require at attach your routes. 
* Start the application.






