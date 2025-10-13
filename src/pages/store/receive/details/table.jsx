import { useMemo } from 'react';

import ReactTableTitleOnly from '@/components/Table/ReactTableTitleOnly';
import { DateTime } from '@/ui';

export default function Index({ receive_entry, convention_rate }) {
	const columns = useMemo(
		() => [
			{
				accessorKey: 'index',
				header: 'Index',
				enableColumnFilter: false,
				cell: (info) => info.row.original.index,
			},
			{
				accessorKey: 'article_uuid',
				header: 'Article',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_uuid',
				header: 'Buyer',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'category_uuid',
				header: 'Category',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'color_uuid',
				header: 'Color',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'size_uuid',
				header: 'Size',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit_uuid',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'price',
				header: `Unit Price`,
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				id: 'total_price_usd',
				accessorFn: (row) => row.price * row.quantity,
				header: (
					<>
						Total Price <br /> (USD)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => info.getValue().toLocaleString(),
			},
			{
				id: 'total_price_bdt',
				accessorFn: (row) => row.price * row.quantity * convention_rate,
				header: (
					<>
						Total Price <br /> (BDT)
					</>
				),
				enableColumnFilter: false,
				cell: (info) => info.getValue().toLocaleString(),
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				width: 'w-32',
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
				header: 'Created At',
				enableColumnFilter: false,
				filterFn: 'isWithinRange',
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated At',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},
		],
		[receive_entry]
	);
	const totalValue = receive_entry.reduce(
		(a, b) => a + Number(b.price * b.quantity),
		0
	);

	return (
		<ReactTableTitleOnly
			title='Details'
			data={receive_entry}
			columns={columns}>
			<tr className='text-sm'>
				<td colSpan='9' className='py-2 text-right'>
					Total:
				</td>
				<td className='pl-3 text-left font-semibold'>
					{totalValue.toLocaleString()}
				</td>
				<td className='pl-3 text-left font-semibold'>
					{Number(totalValue * convention_rate).toLocaleString()}
				</td>
			</tr>
		</ReactTableTitleOnly>
	);
}
