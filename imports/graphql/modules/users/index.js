import { Users } from '/imports/db';
import Security from '/imports/api/security';

const typeDefs = `
  type Query {
    users: [User]
  }

  type Mutation {
    updateUser(_id: ID!, data: UpdateUserInput): User!
  }

  input UpdateUserInput { 
    lawyerProfile: LawyerProfileInput
  }

  input LawyerProfileInput {
    lawFirm: String
    name: String
    address: String
  }
`;

const resolvers = {
  Query: {
    users() {
      return Users.find().fetch();
    },
  },
  Mutation: {
    updateUser(_, { _id, data }, { userId }, ast) {
      if (userId !== _id) {
        Security.checkStaff(userId)
      }
      Users.update(_id, {
        $set: data,
      });
      return Users.findOne(_id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
