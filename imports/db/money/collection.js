import { Mongo } from 'meteor/mongo';

const Money = new Mongo.Collection('money');

Money.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


export default Money;