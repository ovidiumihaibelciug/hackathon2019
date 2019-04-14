import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

Messages.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Messages;