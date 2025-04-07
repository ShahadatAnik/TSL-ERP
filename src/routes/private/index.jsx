import { CommercialRoutes } from '@/routes/private/commercial';

import { DashboardRoutes } from './dashboard';
import { HrRoutes } from './hr';
import { ProfileRoutes } from './profile';
import { StoreRoutes } from './store';

const privateRoutes = [
	...DashboardRoutes,
	...CommercialRoutes,
	...StoreRoutes,
	...HrRoutes,
	...ProfileRoutes,
];

export default privateRoutes;
