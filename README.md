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

## Dev / TODO

## Update [react-redux](https://github.com/reactjs/react-redux)

Now the application uses `react-redux@4.4.6 due to incompatibility of 
the latest [react-redux-form](https://github.com/davidkpiano/react-redux-form/) with react-redux@5.*.  
See [this](https://github.com/davidkpiano/react-redux-form/issues/623), 
[this](https://github.com/davidkpiano/react-redux-form/issues/592) and 
[this](https://github.com/reactjs/react-redux/pull/589) tickets
