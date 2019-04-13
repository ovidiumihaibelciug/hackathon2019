
// import ForgotPassword from 'ui/pages/login/ForgotPassword';
// import ResetPassword from 'ui/pages/login/ResetPassword';
import Login from '../../Login';
import Register from '../../Register';
import PostList from '../../Posts/PostList';
import Dashboard from '../../Dashboard/Dashboard';
import Profile from "../../Profile/Profile";
import Users from "../../Users/Users";

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
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/users',
    component: Users,
  },
];
