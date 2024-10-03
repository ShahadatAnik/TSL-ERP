import { lazy, useEffect, useMemo, useState } from 'react';
import { BuyerColumns, IssueLogColumns } from '@/pages/store/columns';
import { useStoreBuyer, useStoreIssue, useStoreStock } from '@/state/store';
import { useAccess } from '@/hooks';



import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, Transfer } from '@/ui';



import PageInfo from '@/util/PageInfo';
import { DEFAULT_COLUMNS } from '@/util/table/default-columns';





const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = useStoreIssue();
	const info = new PageInfo('Store/Issue Log', url, 'store__log');
	const haveAccess = useAccess('store__log');

	// Fetching data from server
	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	// Add
	const handelAdd = () => {
		window[info.getAddOrUpdateModalId()].showModal();
	};

	// Update
	const [update, setUpdate] = useState({
		uuid: null,
		quantity: null,
		issue_quantity: null,
		material_name: null,
	});

	const handelUpdate = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			quantity: data[idx].quantity,
			issue_quantity: data[idx].issue_quantity,
			material_name: data[idx].material_name,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
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
			itemName: data[idx].material_name
				.replace(/#/g, '')
				.replace(/\//g, '-'),
		}));

		window[info.getDeleteModalId()].showModal();
	};
	const columns = IssueLogColumns({
		handelUpdate,
		handelDelete,
		haveAccess,
		data,
	});

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
						update,
						setUpdate,
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