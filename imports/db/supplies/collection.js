import { Mongo } from 'meteor/mongo';

const Supplies = new Mongo.Collection('supplies');

Supplies.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Supplies;