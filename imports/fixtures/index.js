import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import casual from 'casual';

import {Supplies, Users, Messages} from '../db';

const PASSWORD = '12345';

function createUser(email, roles, data) {
  const userId = Accounts.createUser({
    email,
    password: PASSWORD,
  });

  Users.update(
    {_id: userId},
    {
      $set: {name: casual.name, profile: {name: userId, ...data}},
    },
  );

  Roles.addUsersToRoles(userId, roles);
  Users.update(userId, {$set: {profile: {name: userId}}});
}

export function loadFixtures() {
  // USERS
  createUser('staff-1@gmail.com', ['SECRETAR']);
  createUser('staff-2@gmail.com', ['SECRETAR']);
  for (i = 0; i <= 30; i++) {
    createUser(`user-${i}@gmail.com`, ['STUDENT'], {classNumber: "10", classLetter: "A", classTeacher: "b"});
  }
}

function createSuplies(data) {
  Supplies.insert(data);
}
Users.find()
  .fetch()
  .forEach((user) => {
    if (Roles.userIsInRole(user, 'SECRETAR')) {
      createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
    }
  });

function createMessages(data) {
  Messages.insert(data);
}
Users.find()
  .fetch()
  .forEach((user) => {
    User.find().fetch().forEach((user2) => {

    })
    if (Roles.userIsInRole(user, 'SECRETAR')) {
      createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
    }
  });