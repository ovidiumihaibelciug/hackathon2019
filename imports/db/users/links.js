import Users from './collection';
import Posts from '../posts/collection';
import Documents from '../documents/collection';

Users.addLinks({
  posts: {
    collection: Posts,
    type: 'many',
    inversedBy: 'user'
  },
  documents: {
    collection: Documents,
    type: 'many',
    inversedBy: 'user'
  },
})