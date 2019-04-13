import Documents from './collection';
import Users from '../users/collection';

Documents.addLinks({
  user: {
    collection: Users,
    type: 'one',
    field: 'userId'
  }
});