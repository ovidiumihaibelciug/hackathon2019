// ApolloProvider
// Renders <Routes />

import React from 'react';
import { ApolloProvider, withApollo } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Routes from './_main';
import client from '../apollo';
import Layout from 'antd/lib/layout';

const { Sider, Content } = Layout;

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
