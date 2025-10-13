import { lazy, useEffect, useMemo, useState } from 'react';
import { useStoreBulkIssue, useStoreReceive, useStoreStock } from '@/state/store';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '@/hooks';



import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, LinkOnly } from '@/ui';



import PageInfo from '@/util/PageInfo';





const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const navigate = useNavigate();
	const haveAccess = useAccess('store__log');
	const { data, isLoading, url, deleteData } = useStoreBulkIssue();
	const { invalidateQuery: invalidateStock } = useStoreStock();
	const info = new PageInfo('Store / Bulk Issue', url, 'store__log');

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'issue_id',
				header: 'Issue ID',
				enableColumnFilter: false,
				cell: (info) => {
					const { uuid } = info?.row?.original;
					return (
						<LinkOnly
							url={`/store/stock/bulk-issue/${uuid}/details`}
							id={uuid}
							title={info?.getValue()}
						/>
					);
				},
			},
			{
				accessorKey: 'serial_no',
				header: 'SL Number',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'section',
				header: 'Section',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'issue_date',
				header: 'Date',
				enableColumnFilter: false,
				filterFn: 'isWithinRange',
				cell: (info) => <DateTime date={info.getValue()} />,
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
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess.includes('click_bulk_issue_update') &&
					!haveAccess.includes('click_bulk_issue_delete'),
				width: 'w-24',
				cell: (info) => {
					return (
						<EditDelete
							idx={info.row.index}
							handelUpdate={handelUpdate}
							handelDelete={handelDelete}
							// showDelete={false}
						/>
					);
				},
			},
		],
		[data]
	);

	const handelUpdate = (idx) => {
		navigate(`/store/stock/bulk-issue/${data[idx].uuid}/update`);
	};

	// Delete
	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});
	const handelDelete = (idx) => {
		setDeleteItem((prev) => ({
			...prev,
			itemId: data[idx].uuid,
			itemName: data[idx].sl_number,
		}));

		window[info.getDeleteModalId()].showModal();
	};

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<>
			<ReactTable
				title={info.getTitle()}
				accessor={haveAccess.includes('create')}
				data={data}
				columns={columns}
			/>

			<Suspense>
				<DeleteModal
					modalId={info.getDeleteModalId()}
					title={info.getTitle()}
					invalidateQuery={invalidateStock}
					{...{
						deleteItem,
						setDeleteItem,
						url,
						deleteData,
					}}
				/>
			</Suspense>
		</>
	);
}