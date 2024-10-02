// * Store

// * Purchase
import Article from '@/pages/store/article';
import Buyer from '@/pages/store/buyer';
import Category from '@/pages/store/category';
import LC from '@/pages/store/lc';
import MaterialLog from '@/pages/store/Log';
import Purchase from '@/pages/store/receive';
import PurchaseInd from '@/pages/store/receive/details/by-purchase-description-uuid';
import PurchaseEntry from '@/pages/store/receive/entry';
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
				name: 'LC',
				path: '/store/lc',
				element: <LC />,
				page_name: 'store__lc',
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
				name: 'Receive',
				path: '/store/receive',
				element: <Purchase />,
				page_name: 'store__receive',
				actions: ['create', 'read', 'update'],
				disableCollapse: true,
				children: [
					{
						name: 'Details',
						path: '/store/receive/:purchase_description_uuid',
						element: <PurchaseInd />,
						hidden: true,
						page_name: 'store__receive_by_uuid',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/entry',
						element: <PurchaseEntry />,
						hidden: true,
						page_name: 'store__receive_entry',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/:purchase_description_uuid/update',
						element: <PurchaseEntry />,
						hidden: true,
						page_name: 'store__receive_update',
						actions: ['create', 'read', 'update'],
					},
				],
			},

			{
				name: 'Log',
				path: '/store/log',
				element: <MaterialLog />,
				page_name: 'store__log',
				actions: [
					'read',
					'click_issue_update',
					'click_issue_delete',
					'click_receive_update',
					'click_receive_delete',
				],
			},
		],
	},
];
