import { Roles } from 'meteor/alanning:roles';

export default class Security {
  static checkRole(userId, role) {
    if (!this.hasRole(userId, role)) {
      throw new Error('not-authorized');
    }
  }

  static hasRole(userId, role) {
    return Roles.userIsInRole(userId, role);
  }

  static checkLoggedIn(userId) {
    if (!userId) {
      throw new Error('not-authorized');
    }
  }
  static checkSecretar(userId) {
    if (!this.hasRole(userId, 'SECRETAR')) {
      throw new Error('not-authorized');
    }
  }
  static checkStudent(userId) {
    if (!this.hasRole(userId, 'STUDENT')) {
      throw new Error('not-authorized');
    }
  }
}
