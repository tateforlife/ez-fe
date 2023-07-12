import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddPage from 'pages/add/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'applications',
          element: <DashboardDefault />
        },
        {
          path: 'applications/:id',
          element: <AddPage />
        },
        {
          path: 'documents',
          element: <>Documents</>
        }
      ]
    }
  ]
};

export default MainRoutes;
