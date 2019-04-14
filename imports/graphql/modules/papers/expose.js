import { db, expose } from 'meteor/cultofcoders:apollo';
import Security from '/imports/api/security';

expose({
  papers: {
    type: 'Paper',
    collection: () => {
      return db.papers;
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
