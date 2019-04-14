import { db, expose } from 'meteor/cultofcoders:apollo';
import Security from '/imports/api/security';

expose({
  messages: {
    type: 'Message',
    collection: () => {
      return db.messages;
    },
    update({ userId }) {
      // Security.checkStaff(userId);
    },
    insert({ userId }) {
      // Security.checkStaff(userId);
      // no need? A new case is automatically sent to the system
    },
    remove({ userId }) {
      // Security.checkStaff(userId);
    },
    find: true,
  },
});
