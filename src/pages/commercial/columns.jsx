import { useMemo } from 'react';

import { DateTime } from '@/ui';

import { DEFAULT_COLUMNS } from '@/util/table/default-columns';

export const LcColumns = ({ handelUpdate, handelDelete, haveAccess, data }) => {
	return useMemo(
		() => [
			{
				accessorKey: 'master_ld_number',
				header: 'Master LC',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'number',
				header: 'B2B LC Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'value',
				header: 'Value',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit',
				header: 'Currency',
				enableColumnFilter: false,
				cell: (info) => info.getValue()?.toUpperCase(),
			},
			{
				header: 'Opening Date',
				accessorKey: 'date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'lien_bank',
				header: 'Lien Bank',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
export const MasterLcColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'number',
				header: 'Master LC Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'value',
				header: 'Value',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit',
				header: 'Currency',
				enableColumnFilter: false,
				cell: (info) => info.getValue()?.toUpperCase(),
			},
			{
				header: 'Master LC Date',
				accessorKey: 'date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'lien_bank',
				header: 'Lien Bank',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'payment_terms',
				header: 'Payment Terms',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
