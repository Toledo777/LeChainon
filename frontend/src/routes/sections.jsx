import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ResourcePage = lazy(() => import('src/pages/resource'));
export const MessagesPage = lazy(() => import('src/pages/messages'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ResidentDashPage = lazy(() => import('src/pages/resident-dash'));
export const ResidentInDetailPage = lazy(() => import('src/pages/residentInDetail'));
export const InterventionPlan = lazy(() => import('src/pages/intervention'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),

      // To get nav to appear, add new pages as children here
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'resource', element: <ResourcePage /> },
        { path: 'messages', element: <MessagesPage /> },
        { path: 'resident-dash', element: <ResidentDashPage /> },
        { path: 'user/residentInDetail', element: <ResidentInDetailPage /> },
        { path: 'plan', element: <InterventionPlan />}

      ],
    },
    {
      path: 'resident-dash',
      element: <ResidentDashPage />,
    },
    {
      path: 'plan',
      element: <InterventionPlan />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
