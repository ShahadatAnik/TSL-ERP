import { lazy, useEffect, useMemo, useState } from 'react';
import {
	BuyerColumns,
	IssueLogColumns,
	ReceiveLogColumns,
} from '@/pages/store/coloums';
import {
	useStoreBuyer,
	useStoreIssue,
	useStoreReceiveEntry,
} from '@/state/store';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, Transfer } from '@/ui';

import PageInfo from '@/util/PageInfo';
import { DEFAULT_COLUMNS } from '@/util/table/default-columns';

const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } =
		useStoreReceiveEntry();
	const info = new PageInfo('Store/Receive Log', url, 'store__log');
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
	});

	const handelUpdate = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
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
	const columns = ReceiveLogColumns({
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
