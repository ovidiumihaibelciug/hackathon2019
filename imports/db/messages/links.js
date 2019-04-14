import Messages from './collection';
import Users from '../users/collection';

Messages.addLinks({
  toUser: {
    collection: Users,
    type: 'one',
    field: 'to'
  },
  fromUser: {
    collection: Users,
    type: 'one',
    field: 'from'
  },
});