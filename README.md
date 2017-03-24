# Airbitz plugin for Bity

## Dev

### Global dependencies

+ node.js, version >= 6.0.0
+ yarn

### Install local dependencies

Run `yarn` in project root

### Commands

+ `yarn run dev` - compile everything in 'dev' mode and run dev server on 
http://0.0.0.0:3000 (Linux) or http://127.0.0.0:3000 (other OSs)
+ `yarn run dist` - compile the release code
+ `yarn run lint` - lint the code
+ `yarn run test` - run tests using [karma](https://karma-runner.github.io/) in 'single-run' mode
+ `yarn run test:watch` - run tests using [karma](https://karma-runner.github.io/) in 'watch' mode
+ `yarn run ci` - run sequence of `yarn run lint`, `yarn run test`, `yarn run dist`

## Dev / airbitz-plugins API

see [airbitz-plugins API](https://github.com/Airbitz/airbitz-plugins/tree/master/lib/js)

You can access the API, which is available in the file 
[airbitz-core.js](https://github.com/Airbitz/airbitz-plugins/blob/master/lib/js/airbitz-core.js),  
using one of these ways:

```js
import 'airbitzPluginApi';

// do something
window.Airbitz.core.wallets();
```

or

```js
import * as airbitz from 'airbitzPluginApi';

// do something
airbitz.core.wallets();
```

## Dev / airbitz-plugins for different platforms

You can specify which bridge will be used using CLI parameter `--env.platform`.  
It can take one of these values:

+ `web` - (by default) use [airbitz-bridge-dev.js](https://github.com/Airbitz/airbitz-plugins/blob/master/lib/js/airbitz-bridge-dev.js)
+ `ios` - use [airbitz-bridge-ios.js](https://github.com/Airbitz/airbitz-plugins/blob/master/lib/js/airbitz-bridge-ios.js)
+ `android` - use [airbitz-bridge-android.js](https://github.com/Airbitz/airbitz-plugins/blob/master/lib/js/airbitz-bridge-android.js)

Therefore, you can use

+ `yarn run dist -- --env.platform=web` or `yarn run dist` in order to compile the application with `airbitz-bridge-dev.js`
+ `yarn run dist -- --env.platform=ios` in order to compile the application with `airbitz-bridge-ios.js`
+ `yarn run dist -- --env.platform=android` in order to compile the application with `airbitz-bridge-android.js`

## Dev / Configuration of compiled application

There is directory `$PROJECT_ROOT/config` which contains config files.

+ `dev.js` contains configuration for development builds
+ `prod.js` contains configuration for production builds
+ `default.js` contains shared configuration

By default it uses this logic

+ `yarn run dist` - use `$PROJECT_ROOT/config/prod.js`
+ otherwise - use `$PROJECT_ROOT/config/dev.js`

You can override this using CLI parameter `--env.config=$CONFIG_KEY`.  
For example,

+ use `dev` configuration for `production` build: `yarn run dist -- --env.config=dev`
+ use `prod` configuration for `dev` build: `yarn run dev -- --env.config=prod`

## Dev / TODO

## Update [react-redux](https://github.com/reactjs/react-redux)

Now the application uses `react-redux@4.4.6 due to incompatibility of 
the latest [react-redux-form](https://github.com/davidkpiano/react-redux-form/) with react-redux@5.*.  
See [this](https://github.com/davidkpiano/react-redux-form/issues/623), 
[this](https://github.com/davidkpiano/react-redux-form/issues/592) and 
[this](https://github.com/reactjs/react-redux/pull/589) tickets
