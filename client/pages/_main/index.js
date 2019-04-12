import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import { withTracker } from 'meteor/react-meteor-data';
import AdvancedRoute from './routes/components/AdvancedRoute';
import { withRouter } from 'react-router-dom';

const App = ({ user, loggingIn }) => {
  if (loggingIn) return  null;
  return (
    <Fragment>
      <Switch>
        {[...privateRoutes, ...publicRoutes].map((route, i) => (
          <AdvancedRoute
            exact
            auth={i < privateRoutes.length}
            userId={user && user._id}
            {...route}
            key={i}
          />
        ))}
        <Redirect to={'/'} />
      </Switch>
    </Fragment>
  );
};

export default withRouter(
  withTracker(() => ({
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  }))(App)
);
