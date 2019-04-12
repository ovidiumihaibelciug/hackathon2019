
// import ForgotPassword from 'ui/pages/login/ForgotPassword';
// import ResetPassword from 'ui/pages/login/ResetPassword';
import Login from '../../Login';
import Register from '../../Register';
import PostList from '../../Posts/PostList';
import PostCreate from '../../Posts/PostCreate';

export default [
  {
    path: '/login',
    component: Login,
    onlyPublic: true,
  },
  {
    path: '/register',
    component: Register,
    onlyPublic: true,
  },
  {
    path: '/posts',
    component: PostList,
  },
  {
    path: '/posts/create',
    component: PostCreate,
  },
];
