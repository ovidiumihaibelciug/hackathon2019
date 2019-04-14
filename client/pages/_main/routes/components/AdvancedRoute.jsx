import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withApollo } from 'react-apollo';

class AdvancedRoute extends Component {
  state = {
    title: '',
    ready: false,
  };
  setTitle = title => {
    document.title = title;
    this.setState({ title });
  };

  render() {
    const {
      component: Component,
      auth,
      onlyPublic,
      navbar,
      breadcrumb,
      userId,
      onlyStudent,
      onlySecretar,
      ...rest
    } = this.props;

    if (onlyStudent && !Roles.userIsInRole(userId, 'STUDENT')) {
      return <Redirect to={'/dashboard'} />;
    }

    if (onlySecretar && Roles.userIsInRole(userId, 'STUDENT')) {
      return <Redirect to={'/profile'} />;
    }

    if (auth && !userId) {
      return <Redirect to={'/login'} />;
    }
    if (onlyPublic && userId) {
      return <Redirect to={'/'} />;
    }

    return (
      <Route
        {...rest}
        component={props => (
            <Component {...props} setTitle={this.setTitle} />
        )}
      />
    );
  }
}

export default withApollo(AdvancedRoute);
