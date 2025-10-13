import { Children } from 'react';
import Article from '@/pages/store/article';
import Buyer from '@/pages/store/buyer';
import Category from '@/pages/store/category';
import Color from '@/pages/store/color';
import Log from '@/pages/store/log';
import StockBulkIssue from '@/pages/store/log/bulk_issue/entry';
import StockBulkIssueDetails from '@/pages/store/log/bulk_issue/details';
import Material from '@/pages/store/material';
import Receive from '@/pages/store/receive';
import ReceiveInd from '@/pages/store/receive/details';
import ReceiveEntry from '@/pages/store/receive/entry';
import ReportMaterial from '@/pages/store/report/material';
import ReportVendor from '@/pages/store/report/vendor';
import Size from '@/pages/store/size';
import Stock from '@/pages/store/stock';
import Unit from '@/pages/store/unit';
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
				name: 'Stock Bulk Issue',
				path: '/store/stock/bulk-issue',
				element: <StockBulkIssue />,
				hidden: true,
				page_name: 'store__stock_bulk_issue',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Stock Bulk Issue Update',
				path: '/store/stock/bulk-issue/:uuid/update',
				element: <StockBulkIssue />,
				hidden: true,
				page_name: 'store__stock_bulk_issue_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Stock Bulk Issue Details',
				path: '/store/stock/bulk-issue/:uuid/details',
				element: <StockBulkIssueDetails />,
				hidden: true,
				page_name: 'store__stock_bulk_issue_details',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Receive',
				path: '/store/receive',
				element: <Receive />,
				page_name: 'store__receive',
				actions: ['create', 'read', 'update', 'delete'],
				disableCollapse: true,
				children: [
					{
						name: 'Details',
						path: '/store/receive/:receive_entry_description_uuid',
						element: <ReceiveInd />,
						hidden: true,
						page_name: 'store__receive_by_uuid',
						actions: ['read'],
					},
					{
						name: 'Entry',
						path: '/store/receive/entry',
						element: <ReceiveEntry />,
						hidden: true,
						page_name: 'store__receive_entry',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Entry',
						path: '/store/receive/:receive_entry_description_uuid/update',
						element: <ReceiveEntry />,
						hidden: true,
						page_name: 'store__receive_update',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
			},
			{
				name: 'Library',
				children: [
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
						name: 'Material',
						path: '/store/material',
						element: <Material />,
						page_name: 'store__material',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Size',
						path: '/store/size',
						element: <Size />,
						page_name: 'store__size',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Unit',
						path: '/store/unit',
						element: <Unit />,
						page_name: 'store__unit',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Color',
						path: '/store/color',
						element: <Color />,
						page_name: 'store__color',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Category',
						path: '/store/category',
						element: <Category />,
						page_name: 'store__category',
						actions: ['create', 'read', 'update', 'delete'],
					},
				],
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
					'click_bulk_issue_update',
					'click_bulk_issue_delete',
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
