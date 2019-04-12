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
      onlyCompany,
      onlyFreelancer,
      ...rest
    } = this.props;
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
