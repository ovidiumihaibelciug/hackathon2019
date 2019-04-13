import { Mongo } from 'meteor/mongo';

const Documents = new Mongo.Collection('documents');

Documents.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Documents;