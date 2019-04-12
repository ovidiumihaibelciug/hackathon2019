import Users from '/imports/db/users/collection';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

class UserService {
	static registerUser(data) {
		const user = Users.findOne({ 'emails.0.address': data.email });

		if (user) {
			throw new Meteor.Error(500, 'email_already_taken',
				'Email already taken');
		}

		let id = Accounts.createUser({
			email: data.email,
			password: data.password,
			username: data.username,
			profile: data.profile


		});
		Roles.addUsersToRoles(id, data.roles, 'default-group');

	}

	// static _getUser (_id) {
	//     return Users.findOne(_id);
	// }
}

export default UserService;