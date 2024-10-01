import Login from '@/pages/public/login';
import NoAccess from '@/pages/public/no-entry/noAccess';
import NotFound from '@/pages/public/no-entry/notFound';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout';

import { flatRoutes } from '.';

export const router = createBrowserRouter([
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
	{
		element: <Layout />,
		children: flatRoutes,
	},
]);
