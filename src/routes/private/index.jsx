import { CommercialRoutes } from '@/routes/private/commercial';

import { AccountingRoutes } from './accounting';
import { DashboardRoutes } from './dashboard';
import { HrRoutes } from './hr';
import { ProfileRoutes } from './profile';
import { StoreRoutes } from './store';

const privateRoutes = [
	...DashboardRoutes,
	...CommercialRoutes,
	...AccountingRoutes,
	...StoreRoutes,
	...HrRoutes,
	...ProfileRoutes,
];

export default privateRoutes;
