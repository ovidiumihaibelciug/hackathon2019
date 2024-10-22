import { db, expose } from 'meteor/cultofcoders:apollo';
import Security from '/imports/api/security';

expose({
  posts: {
    type: 'Post',
    collection: () => {
      return db.posts;
    },
    update({ userId }) {
      Security.checkStaff(userId);
    },
    insert({ userId }) {
      // Security.checkStaff(userId);
      // no need? A new case is automatically sent to the system
    },
    remove({ userId }) {
      Security.checkStaff(userId);
    },
    find: true,
  },
});
