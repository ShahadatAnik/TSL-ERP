import LC from '@/pages/commercial/lc';
import MasterLC from '@/pages/commercial/master-lc';

export const CommercialRoutes = [
	{
		name: 'Commercial',
		children: [
			{
				name: 'LC',
				path: '/commercial/lc',
				element: <LC />,
				page_name: 'commercial__lc',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Master LC',
				path: '/commercial/master-lc',
				element: <MasterLC />,
				page_name: 'commercial__master_lc',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
