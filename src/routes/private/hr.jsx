import Department from '@/pages/hr/department';
import Designation from '@/pages/hr/designation';
import User from '@/pages/hr/user';

export const HrRoutes = [
	{
		name: 'HR',
		children: [
			{
				name: 'User',
				path: '/hr/user',
				element: <User />,
				page_name: 'hr__user',
				actions: [
					'create',
					'read',
					'update',
					'delete',
					'click_status',
					'click_reset_password',
					'click_page_assign',
				],
			},

			{
				name: 'Designation',
				path: '/hr/designation',
				element: <Designation />,
				page_name: 'hr__designation',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Department',
				path: '/hr/department',
				element: <Department />,
				page_name: 'hr__department',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
