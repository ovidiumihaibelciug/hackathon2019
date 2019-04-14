import Users from './collection';
import Documents from '../documents/collection';
import Supplies from "../supplies/collection";
import Messages from "../messages/collection";

Users.addLinks({
  documents: {
    collection: Documents,
    type: 'Many',
    inversedBy: 'user'
  },
  supplies: {
    collection: Supplies,
    type: 'many',
    inversedBy: 'user'
  },
  receivedMessages: {
    collection: Messages,
    type: 'many',
    inversedBy: 'fromUser'
  }
})