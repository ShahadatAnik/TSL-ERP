import { DashboardRoutes } from './dashboard';
import { HrRoutes } from './hr';
import { StoreRoutes } from './store';

const privateRoutes = [...DashboardRoutes, ...StoreRoutes, ...HrRoutes];

export default privateRoutes;
