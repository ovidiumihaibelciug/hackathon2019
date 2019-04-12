import { Meteor } from 'meteor/meteor'

import UserService from './UserService';

Meteor.methods({
  'user.register'(data) {
    UserService.registerUser(data);
  },

  'user.get'(_id) {
    return UserService._getUser(_id);
  }

});