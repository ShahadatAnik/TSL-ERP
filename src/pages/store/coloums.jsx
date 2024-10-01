import { useMemo } from 'react';

import { LinkWithCopy, Progress, StatusButton } from '@/ui';

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
				Header: 'Name',
				accessor: 'name',
				cell: (info) => info.getValue(),
			},

			,
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
				Header: 'Name',
				accessor: 'name',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Buyer Name',
				accessor: 'buyer_name',
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const LcColumns = ({ handelUpdate, handelDelete, haveAccess, data }) => {
	return useMemo(
		() => [
			{
				Header: 'Number',
				accessor: 'number',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Date',
				accessor: 'date',
				cell: (info) => <DateTime date={info.getValue()} />,
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
				Header: 'Name',
				accessor: 'name',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Person',
				accessor: 'person',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Phone',
				accessor: 'phone',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Address',
				accessor: 'address',
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
				Header: 'Name',
				accessor: 'name',
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
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				Header: 'Vendor',
				accessor: 'vendor_name',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Category',
				accessor: 'category_name',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Color',
				accessor: 'color',
				cell: (info) => info.getValue(),
			},
			{
				Header: 'Quantity',
				accessor: 'quantity',
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
