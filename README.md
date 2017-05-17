# SpaceBug (Meteor + Apollo + React + Antd boilerplate)

A simple kit to start experimenting with Apollo, Meteor and React.

### Includes
- GraphQL server running with Express bound to the Meteor app
- [Apollo client](http://dev.apollodata.com/)
- [React](https://facebook.github.io/react/)
- [Antd react components](https://ant.design/components/layout/)
- Accounts UI, Basic & password (via [meteor-apollo-accounts](https://github.com/orionsoft/meteor-apollo-accounts))
- ES6 syntax
- React-Router (currently pre-v4)
- Admin Role with Very Basic Admin Dashboard (e.g. table of users)
- api folder setup similar to [TheMeteorChef's Base Repo](https://github.com/themeteorchef/base)

Check `package.json` for specific versions

### Running it

* clone the repo from github
* cd into the root directory
* run `meteor npm install` to download all the NPM packages
* run `meteor npm start` to run the app. After it boots up, it will be available at localhost:3000

### Deploying to galaxy

* `cd` into the root directory of the project
* run `npm run staging` to push to the staging server ( setup for Galaxy hosting )
* run `npm run production` to push to the production server ( setup for Galaxy hosting )


GraphiQL is enabled at [/graphiql](http://localhost:3000/graphiql).

### Folder structure
    .
    ├── client                  # Client files
    │   ├── styles              # Styles
    │   ├── main.html           # First loaded view pulling from imports
    │   └── main.js             # Imports all required files - React render
    ├── imports                 # A client/server folder
    │   ├── api                 #
    │   |  └── Document         # Schema & query definitions
    │   |  └── schema.js        # Schema & query definitions
    |   └── ui                  # UI React rendering
    │      └── App.js           # Component using `graphql` HOC
    │      └── Header.js        # Basic presentational component
    │      └── Loading.js       # Reusable loading component
    │      └── LoginForm.js     # Component using `withApollo` HOC
    ├── server                  # Server files
    │   └── server.js           # Main server file initiating Apollo server
    └── package.json            # node dependencies


### Learn more

- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)
