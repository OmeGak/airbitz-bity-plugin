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
