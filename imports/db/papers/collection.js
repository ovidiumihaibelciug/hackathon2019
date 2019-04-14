import { Mongo } from 'meteor/mongo';

const Papers = new Mongo.Collection('papers');

Papers.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Papers;