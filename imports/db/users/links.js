import Users from './collection';
import Posts from '../posts/collection';

Users.addLinks({
  posts: {
    collection: Posts,
    type: 'many',
    inversedBy: 'user'
  },
})