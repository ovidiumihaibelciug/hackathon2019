import Posts from './collection';
import Users from '../users/collection';

Posts.addLinks({
  user: {
    collection: Users,
    type: 'one',
    field: 'userId'
  }
});