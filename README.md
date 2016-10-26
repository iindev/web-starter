
Web Starter - Gulp, Sass, Browsersync.
===============================

> HTML/CSS starter template powered by [Gulp](http://gulpjs.com/),
> [Sass](http://sass-lang.com/) and [Browsersync](https://www.browsersync.io/)

<br>

Dev Areas | Used Tools
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ( [Libsass](http://sass-lang.com/libsass) ), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**HTML** | Barebone Responsive HTML5 Template.
**JavaScript** | [jshint](https://github.com/spalger/gulp-jshint) with [jshint-stylish](https://github.com/sindresorhus/jshint-stylish)
**Images** | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)
**Live Reload** | [BrowserSync](http://www.browsersync.io/)
**Production Build** | JS and CSS are [uglified](https://github.com/terinjokes/gulp-uglify), [minified](http://cssnano.co/) and concatenated with [useref](https://www.npmjs.com/package/gulp-useref)


### Preparing the environment

Make sure Node and Gulp installed.

1. [NodeJS](http://nodejs.org) - use the installer.
2. [GulpJS](https://github.com/gulpjs/gulp) - `npm install -g gulp` (mac users may need sudo)

### Install Dependencies
To install dependencies with the versions listed on package.json
```bash
npm install
```

Or you can run this to install dependencies with latest versions
```bash
npm install --save-dev gulp gulp-autoprefixer gulp-sass browser-sync del gulp-cache gulp-if gulp-sourcemaps gulp-uglify gulp-useref run-sequence gulp-imagemin gulp-cssnano jshint gulp-jshint jshint-stylish
```

### Usage
Development
```bash
gulp
```

Production ( with **no minification** )
```bash
gulp build
```

Production ( with **minification** )
```bash
gulp build-production
```

### Note
Please run `gulp build` or `gulp build-production` only after completing the regular development and testing through `gulp`

### Directory Structure
```bash
web-starter-gulp
|- app/
|   |- assets/
|   |   |- css/                                // Compiled CSS
|   |   |- fonts/
|   |   |- images/
|   |   |- js/
|   |   |- sass/
|   |   |   |- partials/
|   |   |   |   |- base/
|   |   |   |   |   |- _variables.scss      // Variables for media queries and others
|   |   |   |   |   |- _functions.scss
|   |   |   |   |   |- _mixins.scss         // A healthy collection of mixins
|   |   |   |   |   |- _init.scss           // CSS Reset
|   |   |   |   |- vendors/
|   |   |   |   |   |- ...
|   |   |   |   |- themes/
|   |   |   |   |   |- ...
|   |   |   |   |- layoutAndComponents/
|   |   |   |   |   |- _global.scss
|   |   |   |   |   |- _header.scss
|   |   |   |   |   |- _footer.scss
|   |   |   |   |   |- _navigation.scss
|   |   |   |   |- pages/
|   |   |   |   |   |- _home.scss
|   |   |   |   |- print/
|   |   |   |   |   |- _print.scss
|   |   |   |- styles.scss                    // This is compiled. Create new ones if you need more.
|   |- index.html
|- dist/
|    |- ...
```



***
Visit [iindev](http://www.iindev.com)
