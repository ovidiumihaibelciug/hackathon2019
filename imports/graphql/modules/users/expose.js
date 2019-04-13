import { db, expose } from 'meteor/cultofcoders:apollo';
import Security from '/imports/api/security';

expose({
  users: {
    type: 'User',
    collection: () => {
      return db.users;
    },
    update({ userId }) {

    },
    insert({ userId }) {
      Security.checkStaff(userId);
    },
    remove({ userId }) {
      Security.checkStaff(userId);
    },
    find({ userId }, params) {
      if (!params.filters._id) {
        throw new Error('invalid-request');
      }
      if (userId !== params.filters._id) {
        Security.checkStaff(userId);
      }
    }
  },
});
