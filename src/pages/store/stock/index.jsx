import { lazy, useEffect, useMemo, useState } from 'react';
import { useMaterialInfo } from '@/state/store';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, Transfer } from '@/ui';

import PageInfo from '@/util/PageInfo';

const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = useMaterialInfo();
	const info = new PageInfo('Store / Stock', url, 'store__stock');
	const haveAccess = useAccess('store__stock');


	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				width: 'w-48',
				// cell: (info) => (
				// 	<LinkWithCopy
				// 		title={info.getValue()}
				// 		id={info.row.original.id}
				// 		uri='/material'
				// 	/>
				// ),
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'threshold',
				header: 'Threshold',
				enableColumnFilter: false,
				cell: (info) => Number(info.getValue()),
			},
			{
				accessorKey: 'stock',
				header: 'Stock',
				enableColumnFilter: false,
				cell: (info) => {
					const cls =
						Number(info.row.original.threshold) >
						Number(info.getValue())
							? 'text-error bg-error/10 px-2 py-1 rounded-md'
							: '';
					return (
						<span className={cls}>{Number(info.getValue())}</span>
					);
				},
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'action_trx',
				header: 'Material Trx',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('click_action'),
				width: 'w-24',
				cell: (info) => (
					<Transfer onClick={() => handleTrx(info.row.index)} />
				),
				// cell: (info) =>
				// 	Number(info.row.original.stock) > 0 && (
				// 		<Transfer onClick={() => handleTrx(info.row.index)} />
				// 	),
			},
			{
				accessorKey: 'action_trx_against_order',
				header: 'Trx Against Order',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('click_trx_against_order'),
				width: 'w-32',
				// cell: (info) =>
				// 	info.row.original.stock > 0 && (
				// 		<Transfer
				// 			onClick={() =>
				// 				handleTrxAgainstOrder(info.row.index)
				// 			}
				// 		/>
				// 	),

				cell: (info) => (
					<Transfer
						onClick={() => handleTrxAgainstOrder(info.row.index)}
					/>
				),
			},
			{
				accessorKey: 'section_name',
				header: 'Section',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'type_name',
				header: 'Type',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'description',
				header: 'Description',
				enableColumnFilter: false,
				width: 'w-40',
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
				hidden: !haveAccess.includes('update'),
				width: 'w-24',
				cell: (info) => {
					return (
						<EditDelete
							idx={info.row.index}
							handelUpdate={handelUpdate}
							handelDelete={handelDelete}
							showDelete={haveAccess.includes('delete')}
						/>
					);
				},
			},
		],
		[data, haveAccess]
	);

	// Fetching data from server
	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	// Add
	const handelAdd = () => {
		window[info.getAddOrUpdateModalId()].showModal();
	};

	// Update
	const [updateMaterialDetails, setUpdateMaterialDetails] = useState({
		uuid: null,
		stock: null,
		name: null,
		section_uuid: null,
		type_uuid: null,
	});

	const handelUpdate = (idx) => {
		setUpdateMaterialDetails((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			stock: data[idx].stock,
			section_uuid: data[idx].section_uuid,
			type_uuid: data[idx].type_uuid,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
	};

	const handleTrx = (idx) => {
		setUpdateMaterialDetails((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			stock: data[idx].stock,
			name: data[idx].name,
		}));
		window['MaterialTrx'].showModal();
	};

	const handleTrxAgainstOrder = (idx) => {
		setUpdateMaterialDetails((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			stock: data[idx].stock,
			name: data[idx].name,
		}));
		window['MaterialTrxAgainstOrder'].showModal();
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
			itemName: data[idx].name.replace(/#/g, '').replace(/\//g, '-'),
		}));

		window[info.getDeleteModalId()].showModal();
	};

	return (
		<div>
			<ReactTable
				title={info.getTitle()}
				isLoading={isLoading}
				handelAdd={handelAdd}
				handleReload={refetch}
				accessor={haveAccess.includes('create')}
				data={data}
				columns={columns}
			/>

			<Suspense>
				<AddOrUpdate
					modalId={info.getAddOrUpdateModalId()}
					{...{
						updateMaterialDetails,
						setUpdateMaterialDetails,
					}}
				/>
				<DeleteModal
					modalId={info.getDeleteModalId()}
					title={info.getTitle()}
					{...{
						deleteItem,
						setDeleteItem,
						url,
						deleteData,
					}}
				/>
			</Suspense>
		</div>
	);
}
