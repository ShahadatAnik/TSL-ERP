import { useMemo } from 'react';

import ReactTableTitleOnly from '@/components/Table/ReactTableTitleOnly';
import { DateTime } from '@/ui';

export default function Index({ bulk_entry }) {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.row.original.index + 1,
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
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'QTY',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit_name',
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
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
		],
		[bulk_entry]
	);
	const totalValue = bulk_entry.reduce((a, b) => a + Number(b.quantity), 0);

	return (
		<ReactTableTitleOnly
			title='Details'
			data={bulk_entry}
			columns={columns}>
			<tr className='text-sm'>
				<td colSpan='9' className='py-2 text-right'>
					Total:
				</td>
				<td className='pl-3 text-left font-semibold'>
					{totalValue.toLocaleString()}
				</td>
			</tr>
		</ReactTableTitleOnly>
	);
}
