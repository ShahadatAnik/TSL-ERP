import { CommercialRoutes } from '@/routes/private/commercial';

import { DashboardRoutes } from './dashboard';
import { HrRoutes } from './hr';
import { StoreRoutes } from './store';

const privateRoutes = [
	...DashboardRoutes,
	...CommercialRoutes,
	...StoreRoutes,
	...HrRoutes,
];

export default privateRoutes;
