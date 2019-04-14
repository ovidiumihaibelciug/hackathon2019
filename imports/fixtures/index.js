import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import casual from 'casual';

import {Supplies, Users, Messages, Documents} from '../db';

const PASSWORD = '12345';

function createUser(email, roles, data) {
  const userId = Accounts.createUser({
    email,
    password: PASSWORD,
  });

  Users.update(
    {_id: userId},
    {
      $set: {name: casual.name, profile: {...data}},
    },
  );

  Roles.addUsersToRoles(userId, roles);
}

function createSuplies(data) {
  Supplies.insert(data);
}

function createMessages(data) {
  Messages.insert(data);
}

function createDocument(data) {
  Documents.insert(data);
}

export function loadFixtures() {
  // USERS
  createUser('staff-1@gmail.com', ['SECRETAR']);
  createUser('staff-2@gmail.com', ['SECRETAR']);
  for (i = 0; i <= 30; i++) {
    createUser(`user-${i}@gmail.com`, ['STUDENT'], {name: casual.name, classNumber: "10", classLetter: "A", classTeacher: "b", role: 'STUDENT'});
  }

  Users.find()
    .fetch()
    .forEach((user) => {
      if (Roles.userIsInRole(user, 'SECRETAR')) {
        createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
        createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
        createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
        createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
        createSuplies({ title: casual.title, description: casual.sentence, tags: [casual.title], userId: user._id })
      }
    });


  Users.find()
    .fetch()
    .forEach((user) => {
      Users.find().fetch().forEach((user2) => {
        createMessages({ title: casual.title, body: casual.description, to: user._id , from: user2._id})
      })
    });



  Users.find()
    .fetch()
    .forEach((user) => {
      createDocument({ type: casual.word, title: casual.title, pdf: casual.url, userId: user._id });
    })
}

