import { lazy } from 'react';

const CostCenter = lazy(() => import('@/pages/accounting/cost-center'));
const Currency = lazy(() => import('@/pages/accounting/currency'));
const FiscalYear = lazy(() => import('@/pages/accounting/fiscal-year'));
const Group = lazy(() => import('@/pages/accounting/group'));
const Head = lazy(() => import('@/pages/accounting/head'));
const Ledger = lazy(() => import('@/pages/accounting/ledger'));
const Voucher = lazy(() => import('@/pages/accounting/voucher'));
const VoucherEntry = lazy(() => import('@/pages/accounting/voucher/entry'));
const VoucherDetails = lazy(() => import('@/pages/accounting/voucher/details'));
const NeedToAccept = lazy(() => import('@/pages/accounting/need-to-accept'));
const BalanceReport = lazy(
	() => import('@/pages/accounting/report/balance-sheet')
);
const ProfitAndLossReport = lazy(
	() => import('@/pages/accounting/report/profit-and-loss')
);
const ChartOfAccounts = lazy(
	() => import('@/pages/accounting/chart-of-accounts')
);
const LedgerDetails = lazy(() => import('@/pages/accounting/ledger/details'));
export const AccountingRoutes = [
	{
		name: 'Accounting',
		children: [
			{
				name: 'Need To Accept',
				path: '/accounting/need-to-accept',
				element: <NeedToAccept />,
				page_name: 'accounting__need_to_accept',
				actions: ['read', 'create', 'update', 'delete'],
			},

			{
				name: 'Voucher',
				path: '/accounting/voucher',
				element: <Voucher />,
				page_name: 'accounting__voucher',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Voucher Entry',
				path: '/accounting/voucher/entry',
				element: <VoucherEntry />,
				page_name: 'accounting__voucher_entry',
				hidden: true,
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Voucher Entry (Automatic)',
				path: '/accounting/voucher/entry/:vendor_name/:purchase_id/:amount/:currency_name',
				element: <VoucherEntry />,
				page_name: 'accounting__voucher_entry_automation',
				hidden: true,
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Voucher Update',
				path: '/accounting/voucher/:uuid/update',
				element: <VoucherEntry />,
				page_name: 'accounting__voucher_update',
				hidden: true,
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Voucher Details',
				path: '/accounting/voucher/:uuid/details',
				element: <VoucherDetails />,
				page_name: 'accounting__voucher_details',
				hidden: true,
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Cost Center',
				path: '/accounting/cost-center',
				element: <CostCenter />,
				page_name: 'accounting__cost_center',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Ledger',
				path: '/accounting/ledger',
				element: <Ledger />,
				page_name: 'accounting__ledger',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Ledger Details',
				path: '/accounting/ledger/:uuid/details',
				element: <LedgerDetails />,
				page_name: 'accounting__ledger_details',
				hidden: true,
				actions: ['read'],
			},
			{
				name: 'Group',
				path: '/accounting/group',
				element: <Group />,
				page_name: 'accounting__group',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Head',
				path: '/accounting/head',
				element: <Head />,
				page_name: 'accounting__head',
				actions: ['read', 'create', 'update', 'delete'],
			},

			{
				name: 'Fiscal Year',
				path: '/accounting/fiscal-year',
				element: <FiscalYear />,
				page_name: 'accounting__fiscal_year',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Currency',
				path: '/accounting/currency',
				element: <Currency />,
				page_name: 'accounting__currency',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Chart of Accounts',
				path: '/accounting/chart-of-accounts',
				element: <ChartOfAccounts />,
				page_name: 'accounting__chart_of_accounts',
				actions: ['read'],
			},
			{
				name: 'Report',
				children: [
					{
						name: 'Balance Sheet',
						path: '/accounting/report/balance-sheet',
						element: <BalanceReport />,
						page_name: 'accounting__report__balance_sheet',
						actions: ['read'],
					},
					{
						name: 'Profit and Loss',
						path: '/accounting/report/profit-and-loss',
						element: <ProfitAndLossReport />,
						page_name: 'accounting__report__profit_and_loss',
						actions: ['read'],
					},
				],
			},
		],
	},
];
