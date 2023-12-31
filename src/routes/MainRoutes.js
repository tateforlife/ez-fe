import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddPage from 'pages/add/index';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const DocumentsList = Loadable(lazy(() => import('pages/dashboard/documents')));

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
          path: 'documents',
          element: <DocumentsList />
        },
        {
          path: 'documents/:id',
          element: <AddPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
