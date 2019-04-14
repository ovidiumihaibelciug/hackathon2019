import { db, expose } from 'meteor/cultofcoders:apollo';
import Security from '/imports/api/security';

expose({
  classes: {
    type: 'ClassType',
    collection: () => {
      return db.classes;
    },
    update({ userId }) {

    },
    insert({ userId }) {
      // Security.checkStaff(userId);
      // no need? A new case is automatically sent to the system
    },
    remove({ userId }) {

    },
    find: true,
  },
});
