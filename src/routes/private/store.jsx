import Article from '@/pages/store/article';
import Buyer from '@/pages/store/buyer';
import Category from '@/pages/store/category';
import Log from '@/pages/store/log';
import Receive from '@/pages/store/receive';
import ReceiveInd from '@/pages/store/receive/details';
import ReceiveEntry from '@/pages/store/receive/entry';
import ReportMaterial from '@/pages/store/report/material';
import ReportVendor from '@/pages/store/report/vendor';
import Stock from '@/pages/store/stock';
import Vendor from '@/pages/store/vendor';

export const StoreRoutes = [
	{
		name: 'Store',
		children: [
			{
				name: 'Stock',
				path: '/store/stock',
				element: <Stock />,
				page_name: 'store__stock',
				actions: ['create', 'read', 'update', 'delete', 'click_issue'],
			},

			{
				name: 'Receive',
				path: '/store/receive',
				element: <Receive />,
				page_name: 'store__receive',
				actions: ['create', 'read', 'update'],
				disableCollapse: true,
				children: [
					{
						name: 'Details',
						path: '/store/receive/:receive_entry_description_uuid',
						element: <ReceiveInd />,
						hidden: true,
						page_name: 'store__receive_by_uuid',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/entry',
						element: <ReceiveEntry />,
						hidden: true,
						page_name: 'store__receive_entry',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/:receive_entry_description_uuid/update',
						element: <ReceiveEntry />,
						hidden: true,
						page_name: 'store__receive_update',
						actions: ['create', 'read', 'update'],
					},
				],
			},
			{
				name: 'Vendor',
				path: '/store/vendor',
				element: <Vendor />,
				page_name: 'store__vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Article',
				path: '/store/article',
				element: <Article />,
				page_name: 'store__article',
				actions: ['create', 'read', 'update', 'delete'],
			},

			{
				name: 'Buyer',
				path: '/store/buyer',
				element: <Buyer />,
				page_name: 'store__buyer',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Category',
				path: '/store/category',
				element: <Category />,
				page_name: 'store__category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Log',
				path: '/store/log',
				element: <Log />,
				page_name: 'store__log',
				actions: [
					'read',
					'click_issue_update',
					'click_issue_delete',
					'click_receive_update',
					'click_receive_delete',
				],
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Material',
						path: '/store/report/material',
						element: <ReportMaterial />,
						page_name: 'store__report__material',
						actions: ['read'],
					},
					{
						name: 'Vendor',
						path: '/store/report/vendor',
						element: <ReportVendor />,
						page_name: 'store__report__vendor',
						actions: ['read'],
					},
				],
			},
		],
	},
];
