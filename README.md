
# ACT :: Adaptive content packaging on stereoids!

***

## Demo

(No public demo yet. compile your local copy)

## Installation

This project uses Angular-Bootstrap. There is a UIKit directory containing the bootstrap 3.1.1 that grunt will compile and push to main project. Project requires `grunt, carma, bower and grunt-cli`
Clone this repo then in the root directory run

`$ npm install` then compile the distribution package `$ grunt`

## Development
#### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g grunt-cli karma`
* Install local dev dependencies: `npm install` while current directory is bootstrap repo

#### Build
* Build the whole project: `grunt` - this will run `lint`, `test`, and `concat` targets
* To build modules, first run `grunt html2js` then `grunt build:module1:module2...:moduleN`

You can generate a custom build, containing only needed modules, from the project's homepage.
Alternatively you can run local Grunt build from the command line and list needed modules as shown below:

```
grunt build:modal:tabs:alert:popover:dropdownToggle:buttons:progressbar
```

Check the Grunt build file for other tasks that are defined for this project.

#### TDD
* Run test: `grunt watch`

This will start Karma server and will continuously watch files in the project, executing tests upon every change.

#### Test coverage
Add the `--coverage` option (e.g. `grunt test --coverage`, `grunt watch --coverage`) to see reports on the test coverage. These coverage reports are found in the coverage folder.

### Customize templates

As mentioned directives from this repository have all the markup externalized in templates. You might want to customize default
templates to match your desired look & feel, add new functionality etc.

The easiest way to override an individual template is to use the `<script>` directive:

```javascript
<script id="template/alert/alert.html" type="text/ng-template">
    <div class='alert' ng-class='type && "alert-" + type'>
        <button ng-show='closeable' type='button' class='close' ng-click='close()'>Close</button>
        <div ng-transclude></div>
    </div>
</script>
```

If you want to override more templates it makes sense to store them as individual files and feed the `$templateCache` from those partials.
For people using Grunt as the build tool it can be easily done using the `grunt-html2js` plugin. You can also configure your own template url.
Let's have a look:

Your own template url is `views/partials/ui-bootstrap-tpls/alert/alert.html`.

Add "html2js" task to your Gruntfile
```
html2js: {
  options: {
    base: '.',
    module: 'ui-templates',
    rename: function (modulePath) {
      var moduleName = modulePath.replace('app/views/partials/ui-bootstrap-tpls/', '').replace('.html', '');
      return 'template' + '/' + moduleName + '.html';
    }
  },
  main: {
    src: ['app/views/partials/ui-bootstrap-tpls/**/*.html'],
    dest: '.tmp/ui-templates.js'
  }
}
```

Make sure to load your template.js file
`<script src="/ui-templates.js"></script>`

Inject the `ui-templates` module in your `app.js`
```
angular.module('myApp', [
  'ui.bootstrap',
  'ui-templates'
]);
```

Then it will work fine!

## Supported browsers

Directives from this repository are automatically tested with the following browsers:
* Chrome (stable and canary channel)
* Firefox
* IE 9 and 10
* Opera
* Safari

Modern mobile browsers should work without problems.

**IE 8 is not officially supported at the moment**. This project is run by volunteers and with the current number of commiters
we are not in the position to guarantee IE8 support. If you need support for IE8 we would welcome a contributor who would like to take care about IE8.
Alternatively you could sponsor this project to guarantee IE8 support.

We believe that most of the directives would work OK after:
* including relevant shims (for ES5 we recommend https://github.com/kriskowal/es5-shim)
* taking care of the steps described in http://docs.angularjs.org/guide/ie

We are simply not regularly testing against IE8.
