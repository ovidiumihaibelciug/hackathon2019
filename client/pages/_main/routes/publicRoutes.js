
// import ForgotPassword from 'ui/pages/login/ForgotPassword';
// import ResetPassword from 'ui/pages/login/ResetPassword';
import Login from '../../Login';
import Register from '../../Register';
import PostList from '../../Posts/PostList';
import Dashboard from '../../Dashboard/Dashboard';
import Profile from "../../Profile/Profile";
import ProfileInbox from "../../Profile/ProfileInbox";
import ProfileDocuments from "../../Profile/ProfileDocuments";
import Users from "../../Users/Users";
import Supplies from "../../Supplies";
import SuppliesCreate from "../../SuppliesCreate";
import Documents from "../../Documents/Documents";
import DocumentsCreate from "../../Documents/DocumentsCreate";
import CompleteInfo from "../../CompleteInfo";

export default [
  {
    path: '/login',
    component: Login,
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
    onlySecretar: 1,
  },
  {
    path: '/profile/user/inbox',
    component: ProfileInbox,
    onlyStudent: 1,
  },
  {
    path: '/profile',
    component: Profile,
    onlyStudent: 1,
  },
  {
    path: '/profile/documents',
    component: ProfileDocuments,
    onlyStudent: 1,
  },
  {
    path: '/profile/:id/documents',
    component: ProfileDocuments,
  },
  {
    path: '/profile/:id/inbox',
    component: ProfileInbox,
    // onlyStudent: 1,
  },
  {
    path: '/profile/:id',
    component: Profile,
  },
  {
    path: '/users',
    component: Users,
    onlySecretar: 1,
  },
  {
    path: '/supplies',
    component: Supplies,
    onlySecretar: 1,
  },
  {
    path: '/supplies/create',
    component: SuppliesCreate,
    onlySecretar: 1,
  },
  {
    path: '/documents',
    component: Documents,
    onlySecretar: 1,
  },
  {
    path: '/documents/create',
    component: DocumentsCreate,
  },
  {
    path: '/complete-info/:id',
    component: CompleteInfo,
  },
];
