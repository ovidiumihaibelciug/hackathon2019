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

    },
    remove({ userId }) {

    },
    find: true,
  },
});
