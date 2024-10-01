import { lazy, useEffect, useMemo, useState } from 'react';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete, Transfer } from '@/ui';

import PageInfo from '@/util/PageInfo';

import { StockColumns } from '../coloums';

const AddOrUpdate = lazy(() => import('./add-update'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData, refetch } = useMaterialInfo();
	const info = new PageInfo('Store / Stock', url, 'store__stock');
	const haveAccess = useAccess('store__stock');

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
	const columns = StockColumns(haveAccess, handelUpdate, handelDelete);

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
