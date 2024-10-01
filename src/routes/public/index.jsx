import { lazy } from 'react';

const Login = lazy(() => import('@/pages/public/login'));
const NotFound = lazy(() => import('@/pages/public/no-entry/notFound'));
const NoAccess = lazy(() => import('@/pages/public/no-entry/noAccess'));

const publicRoutes = [
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/no-access',
		element: <NoAccess />,
	},
	{
		path: '/not-found',
		element: <NotFound />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default publicRoutes;
