import { Mongo } from 'meteor/mongo';

const Classes = new Mongo.Collection('classes');

Classes.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Classes;