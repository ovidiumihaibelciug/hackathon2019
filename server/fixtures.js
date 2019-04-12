import { Meteor } from 'meteor/meteor';
import { loadFixtures } from '/imports/fixtures/';
import { Users } from '/imports/db';

Meteor.startup(() => {
  if (Users.find().count() === 0) {
    console.log(`Started loading fixtures ...`);
    loadFixtures();
    console.log(`Loaded fixtures.`);
  }
});
