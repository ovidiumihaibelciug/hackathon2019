import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import casual from 'casual';

import { Users } from '../db';
import { caseActionTypes } from '../api/constants';

const PASSWORD = '12345';

function createUser(email, roles) {
  const userId = Accounts.createUser({
    email,
    password: PASSWORD,
  });

  Users.update(
    { _id: userId },
    {
      $set: { name: casual.name, profile: { name: userId } },
    },
  );

  Roles.addUsersToRoles(userId, roles);
  Users.update(userId, { $set: { lawyerProfile: { name: userId } } });
}

export function loadFixtures() {
  // USERS
  createUser('staff-1@gmail.com', ['ADMIN']);
  createUser('staff-2@gmail.com', ['ADMIN']);
  createUser('user-1@gmail.com', ['USER']);
  createUser('user-2@gmail.com', ['USER']);
  createUser('user-3@gmail.com', ['USER']);
  createUser('user-4@gmail.com', ['USER']);
}
