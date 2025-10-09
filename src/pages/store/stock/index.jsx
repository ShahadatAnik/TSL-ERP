import { lazy, useEffect, useState } from 'react';
import { useStoreStock } from '@/state/store';
import { FileUp } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';

import PageInfo from '@/util/PageInfo';

import { StockColumns } from '../columns';

const AddOrUpdate = lazy(() => import('./add-update'));
const Issue = lazy(() => import('./issue'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = useStoreStock();
	const info = new PageInfo('Store/Stock', url, 'store__stock');
	const haveAccess = useAccess('store__stock');
	const navigation = useNavigate();

	//* Fetching data from server
	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	//* Add
	const handelAdd = () => {
		window[info.getAddOrUpdateModalId()].showModal();
	};

	//* Update
	const [update, setUpdate] = useState({
		uuid: null,
	});
	const [updateIssue, setUpdateIssue] = useState({
		uuid: null,
		quantity: null,
		name: null,
		article: null,
		buyer: null,
	});

	const handelUpdate = (idx) => {
		setUpdate((prev) => ({
			...prev,
			uuid: data[idx].uuid,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
	};
	const handleIssue = (idx) => {
		setUpdateIssue((prev) => ({
			...prev,
			uuid: data[idx].uuid,
			quantity: data[idx].quantity,
			name: data[idx].material_name,
			article: data[idx].article_name,
			buyer: data[idx].buyer_name,
			unit: data[idx].unit_name,
		}));
		window['Issue'].showModal();
	};
	//* Delete
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
	const handleBulkIssue = () => {
		navigation('/store/stock/bulk-issue');
	};
	const columns = StockColumns({
		handelUpdate,
		handelDelete,
		handleIssue,
		haveAccess,
		data,
	});

	return (
		<div>
			<ReactTable
				title={info.getTitle()}
				isLoading={isLoading}
				// handelAdd={handelAdd}
				handleReload={refetch}
				// accessor={haveAccess.includes('create')}
				data={data}
				columns={columns}
				// customButtons={
				// 	<button
				// 		className='z-50 flex gap-2 rounded bg-warning p-1.5 text-sm font-bold text-white'
				// 		onClick={handleBulkIssue}>
				// 		<FileUp size={18} />
				// 		Bulk Issue
				// 	</button>
				// }
			/>

			<Suspense>
				<AddOrUpdate
					modalId={info.getAddOrUpdateModalId()}
					{...{
						update,
						setUpdate,
					}}
				/>
				<Issue
					modalId='Issue'
					{...{
						updateIssue,
						setUpdateIssue,
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
