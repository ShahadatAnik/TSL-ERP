import { useMemo } from 'react';

import {
	DateTime,
	EditDelete,
	LinkOnly,
	LinkWithCopy,
	Progress,
	StatusButton,
	Transfer,
} from '@/ui';

import { DEFAULT_COLUMNS } from '@/util/Table/default-columns';

export const BuyerColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
export const ArticleColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const VendorColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'person',
				header: 'Person',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'address',
				header: 'Address',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const CategoryColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const StockColumns = ({
	handelUpdate,
	handelDelete,
	handleIssue,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'color',
				header: 'Color',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'QTY',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'action_trx',
				header: 'Issue',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('click_issue'),
				width: 'w-24',
				cell: (info) => (
					<Transfer onClick={() => handleIssue(info.row.index)} />
				),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const IssueLogColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'QTY',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_by_name',
				header: 'Created By',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_at',
				header: 'Created',
				enableColumnFilter: false,
				filterFn: 'isWithinRange',
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},

			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess?.includes('click_issue_update') &&
					!haveAccess?.includes('click_issue_delete'),
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelUpdate={handelUpdate}
						handelDelete={handelDelete}
						showUpdate={haveAccess?.includes('click_issue_update')}
						showDelete={haveAccess?.includes('click_issue_delete')}
					/>
				),
			},
		],
		[data]
	);
};
export const ReceiveLogColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'receive_id',
				header: 'ID',
				enableColumnFilter: false,
				cell: (info) => {
					const { receive_uuid } = info.row.original;
					return (
						<LinkOnly
							uri='/store/receive'
							id={receive_uuid}
							title={info.getValue()}
						/>
					);
				},
			},
			{
				accessorKey: 'material_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'QTY',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'price',
				header: 'Price',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'price',
				header: 'Price(BDT)',
				enableColumnFilter: false,
				cell: (info) =>
					info.getValue() * info.row.original.convention_rate,
			},

			{
				accessorKey: 'created_by_name',
				header: 'Created By',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_at',
				header: 'Created',
				enableColumnFilter: false,
				filterFn: 'isWithinRange',
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess?.includes('click_receive_update') &&
					!haveAccess?.includes('click_receive_delete'),
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelUpdate={handelUpdate}
						handelDelete={handelDelete}
						showUpdate={haveAccess?.includes(
							'click_receive_update'
						)}
						showDelete={haveAccess?.includes(
							'click_receive_delete'
						)}
					/>
				),
			},
		],
		[data]
	);
};

export const ReportColumns = ({ data }) => {
	const convertToUSD = (bdtValue, info) => {
		const avgConventionRate = info.row.original.avg_convention_rates;
		return (Number(bdtValue) / Number(avgConventionRate)).toFixed(2);
	};

	return useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Material Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'article_name',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_name',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			// Opening
			{
				accessorKey: 'opening_quantity',
				header: 'Opening Stock',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'opening_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'opening_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'opening_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'opening_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(4),
			},
			// Received
			{
				accessorKey: 'purchased_quantity',
				header: 'Received QTY',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'purchased_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'purchased_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'purchased_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'purchased_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(4),
			},
			// Total Stock
			{
				accessorKey: 'sub_total_quantity',
				header: 'Total Stock QTY',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'sub_total_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'sub_total_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'sub_total_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'sub_total_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(4),
			},
			// Issued
			{
				accessorKey: 'consumption_quantity',
				header: 'Issued QTY',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'consumption_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'consumption_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'consumption_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'consumption_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(4),
			},
			// Closing
			{
				accessorKey: 'closing_quantity',
				header: 'Closing Stock',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'closing_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'closing_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => convertToUSD(info.getValue(), info),
			},
			{
				accessorKey: 'closing_quantity_total_price',
				header: (
					<>
						Total Value
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'closing_quantity_rate',
				header: (
					<>
						Unit Price
						<br />
						(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(4),
			},
		],
		[data]
	);
};
export const VendorReportColumns = ({ data }) => {
	return useMemo(
		() => [
			{
				accessorKey: 'vendor_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'price_usd',
				header: (
					<>
						Total Received <br />
						Amount(USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'price_bdt',
				header: (
					<>
						Total Received <br />
						Amount(BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'name',
				header: 'Material Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'total_quantity',
				header: 'Total Quantity',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'avg_convention_rates',
				header: (
					<>
						Average Conversion <br />
						Rate
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'avg_price_per_unit_bdt',
				header: (
					<>
						Average Price <br />
						Per Unit (BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'avg_price_per_unit_usd',
				header: (
					<>
						Average Price <br />
						Per Unit (USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()).toFixed(2),
			},
			{
				accessorKey: 'lc_number',
				header: 'LC Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'lc_created_at',
				header: (
					<>
						LC Created <br />
						At
					</>
				),
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'material_created_at',
				header: (
					<>
						Material Created <br />
						At
					</>
				),
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
		],
		[data]
	);
};
