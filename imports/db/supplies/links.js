import Supplies from './collection';

Supplies.addLinks({
  user: {
    collection: Supplies,
    type: 'one',
    field: 'userId'
  }
});