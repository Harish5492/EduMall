import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
// import Rewards from './views/Rewards/Rewards';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import Requests from './views/Requests/Requests';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

// course page
const Course = Loadable(lazy(() => import('app/views/courses/MyCources')));

// payment history
const History = Loadable(lazy(() => import('app/views/PaymentHistory/History')));

// payment history detail on a user
const Historydetail = Loadable(lazy(() => import('app/views/PaymentHistory/Historydetail')));
// const HistorydetailUser = Loadable(lazy(() => import('app/views/PaymentHistory/Historydetail/:userId')));

const Coursedetail = Loadable(lazy(() => import('app/views/courses/CourseDetails')));

const Affiliate = Loadable(lazy(() => import('app/views/Affiliate/Affiliate')));

const Rewards = Loadable(lazy(() => import('app/views/Rewards/Rewards')));

const Requests = Loadable(lazy(() => import('app/views/Requests/Requests')));


const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,

   
      {
        path: '/',
        element: <PrivateRoute />,

        children: [
          {
            path: '/dashboard',
            element: <Analytics />,
            auth: authRoles.admin
          },
          //courses route
          {
            path: '/courses',
            element: <Course />,
            auth: authRoles.subadmin
          },

          //payment history route
          {
            path: '/PaymentHistory',
            element: <History />,
            auth: authRoles.admin
          },

          //payment history detail on a user route
          {
            path: '/PaymentHistory/:userId',
            element: <Historydetail />,
            auth: authRoles.admin
          },
          {
            path: '/AffiliateLinks',
            element: <Affiliate />,
            auth: authRoles.admin
          },

          // course deatils route
          {
            path: '/courses/:courseId',
            element: <Coursedetail />,
            auth: authRoles.admin
          },

          // e-chart rooute
          {
            path: '/charts/echarts',
            element: <AppEchart />,
            auth: authRoles.editor

          },

          {
            path: '/Rewards',
            element: <Rewards />,
            auth: authRoles.subadmin
          },

          {
            path: '/Requests',
            element: <Requests />,
            auth: authRoles.admin
          },
        ]
      },
      
     

    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/signin', element: <JwtLogin /> },

  { path: '/', element: <Navigate to="/dashboard" /> },
  // { path: '/', element: <Navigate to="/dashboard" /> }
];


export const publicRoutes = [
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/signin', element: <JwtLogin /> },
  { path: '*', element: <Navigate to="/signin" /> }
];

export default routes;
