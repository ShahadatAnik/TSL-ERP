import { useMemo } from 'react';

import { DateTime } from '@/ui';

import { DEFAULT_COLUMNS } from '@/util/table/default-columns';

export const LcColumns = ({ handelUpdate, handelDelete, haveAccess, data }) => {
	return useMemo(
		() => [
			{
				accessorKey: 'vendor_name',
				header: 'Vendor',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'master_ld_number',
				header: 'Master LC',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'number',
				header: 'Number',
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
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue()?.toUpperCase(),
			},
			{
				header: 'Date',
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
				header: 'Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				header: 'Date',
				accessorKey: 'date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};
