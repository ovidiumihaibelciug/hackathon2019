//
// import CreateJob from 'ui/pages/jobs/CreateJob';
// import Favorites from 'ui/pages/jobs/Favorites';
// import MyAccount from 'ui/pages/account/MyAccount';
// import EditFreelancerAccount from 'ui/pages/account/EditFreelancerAccount';
// import EditCompanyAccount from 'ui/pages/account/EditCompanyAccount';
// import EditAccount from 'ui/pages/account/EditAccount';
// import EditJob from 'ui/pages/jobs/EditJob';
// import MyJobs from '../../pages/account/MyJobs';
import Users from "../../Users/Users";

export default [

  {
    path: '/users',
    component: Users,
    onlySecretar: 1,
  },
]