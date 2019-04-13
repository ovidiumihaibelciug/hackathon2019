
// import ForgotPassword from 'ui/pages/login/ForgotPassword';
// import ResetPassword from 'ui/pages/login/ResetPassword';
import Login from '../../Login';
import Register from '../../Register';
import PostList from '../../Posts/PostList';
import Dashboard from '../../Dashboard/Dashboard';
import Profile from "../../Profile/Profile";
import Users from "../../Users/Users";
import Supplies from "../../Supplies";
import Documents from "../../Documents/Documents";
import DocumentsCreate from "../../Documents/DocumentsCreate";

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
  {
    path: '/supplies',
    component: Supplies,
  },
  {
    path: '/documents',
    component: Documents,
  },
  {
    path: '/documents/create',
    component: DocumentsCreate,
  },
];
