// Meteor.startup () => React.render
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';
import './main.html';
import './registry';

import 'antd/dist/antd.min.css';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
