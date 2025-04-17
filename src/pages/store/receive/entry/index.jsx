import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	useOtherArticleValueLabel,
	useOtherCategoryValueLabel,
	useOtherColorValueLabel,
	useOtherMaterialValueLabel,
	useOtherSizeValueLabel,
	useOtherUnitValueLabel,
} from '@/state/other';
import {
	useStoreReceive,
	useStoreReceiveEntry,
	useStoreReceiveEntryByDetails,
	useStoreStock,
} from '@/state/store';
import { useAuth } from '@context/auth';
import { DevTool } from '@lib/react-hook-devtool';
import { configure, HotKeys } from 'react-hotkeys';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAccess, useFetchForRhfReset, useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import ReactTable from '@/components/Table';
import ReactTableTitleOnly from '@/components/Table/ReactTableTitleOnly';
import {
	DynamicField,
	EditDelete,
	FormField,
	Input,
	JoinInput,
	ReactSelect,
	RemoveButton,
	Textarea,
} from '@/ui';

import nanoid from '@/lib/nanoid';
import { exclude } from '@/util/Exclude';
import GetDateTime from '@/util/GetDateTime';
import { RECEIVE_NULL, RECEIVE_SCHEMA } from '@/util/Schema';

import Header from './header';

export default function Index() {
	const { user } = useAuth();
	const [status, setStatus] = useState(false);
	const haveAccess = useAccess('store__receive_entry');
	const navigate = useNavigate();
	const { receive_entry_description_uuid } = useParams();
	const { data, invalidateQuery: invalidateEntryByDetails } =
		useStoreReceiveEntryByDetails(receive_entry_description_uuid);
	const { url: receive_entryEntryUrl, invalidateQuery: invalidateEntry } =
		useStoreReceiveEntry();
	const {
		url: receive_entryDescriptionUrl,
		updateData,
		postData,
		deleteData,
	} = useStoreReceive();

	const { data: material } = useOtherMaterialValueLabel();
	const { data: category } = useOtherCategoryValueLabel();
	const { data: article } = useOtherArticleValueLabel();
	const { data: color } = useOtherColorValueLabel();
	const { data: size } = useOtherSizeValueLabel();
	const { data: unit } = useOtherUnitValueLabel();
	const { invalidateQuery: invalidateStock } = useStoreStock();

	useEffect(() => {
		receive_entry_description_uuid !== undefined
			? (document.title =
					'Update Receive Entry: ' + receive_entry_description_uuid)
			: (document.title = 'Receive Entry');
	}, []);

	const {
		register,
		handleSubmit,
		errors,
		reset,
		control,
		Controller,
		useFieldArray,
		getValues,
		watch,
		setValue,
	} = useRHF(RECEIVE_SCHEMA, RECEIVE_NULL);

	const isUpdate = receive_entry_description_uuid !== undefined;

	// receive_entry
	const {
		fields: receiveEntry,
		append: receiveEntryAppend,
		remove: receiveEntryRemove,
	} = useFieldArray({
		control,
		name: 'receive_entry',
	});
	useEffect(() => {
		if (data !== undefined && isUpdate) {
			reset(data);
		}
	}, [data, isUpdate]);
	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});

	const handleReceiveEntryRemove = (index) => {
		if (getValues(`receive_entry[${index}].uuid`) !== undefined) {
			setDeleteItem({
				itemId: getValues(`receive_entry[${index}].uuid`),
				itemName: getValues(`receive_entry[${index}].material_name`),
			});
			window['receive_entry_delete'].showModal();
		} else {
			receiveEntryRemove(index);
		}
	};

	const handelReceiveEntryAppend = () => {
		receiveEntryAppend({
			material_uuid: null,
			article_uuid: null,
			category_uuid: null,
			color_uuid: null,
			size_uuid: null,
			unit_uuid: null,
			quantity: 0,
			price: 0,
			remarks: null,
		});
	};

	let excludeItem = exclude(
		watch,
		material,
		'receive_entry',
		'material_uuid',
		status
	);
	// Submit
	const onSubmit = async (data) => {
		// Update item
		if (isUpdate) {
			const receive_entry_description_data = {
				...data,
				receive_uuid: receive_entry_description_uuid,
				updated_at: GetDateTime(),
			};
			delete receive_entry_description_data['receive_entry'];
			const receive_entry_description_promise =
				await updateData.mutateAsync({
					url: `${receive_entryDescriptionUrl}/${data?.uuid}`,
					updatedData: receive_entry_description_data,
					uuid: data.uuid,
					isOnCloseNeeded: false,
				});

			const receive_entry_entries_promise = data.receive_entry.map(
				async (item) => {
					if (item.uuid === undefined || item.uuid === null) {
						item.receive_uuid = receive_entry_description_uuid;
						item.created_at = GetDateTime();
						item.created_by = user?.uuid;
						item.uuid = nanoid();
						return await postData.mutateAsync({
							url: receive_entryEntryUrl,
							newData: item,
							isOnCloseNeeded: false,
						});
					} else {
						item.updated_at = GetDateTime();
						const updatedData = {
							...item,
						};
						return await updateData.mutateAsync({
							url: `${receive_entryEntryUrl}/${item.uuid}`,
							uuid: item.uuid,
							updatedData,
							isOnCloseNeeded: false,
						});
					}
				}
			);

			try {
				await Promise.all([
					receive_entry_description_promise,
					...receive_entry_entries_promise,
				])
					.then(() => reset(RECEIVE_NULL))
					.then(() => {
						invalidateStock();
						invalidateEntry();
						navigate(
							`/store/receive/${receive_entry_description_uuid}`
						);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		// Add new item
		const new_receive_entry_description_uuid = nanoid();
		const created_at = GetDateTime();
		const created_by = user.uuid;

		// Create receive_entry description
		const receive_entry_description_data = {
			...data,
			uuid: new_receive_entry_description_uuid,
			created_at,
			created_by,
		};

		// delete receive_entry field from data to be sent
		delete receive_entry_description_data['receive_entry'];

		const receive_entry_description_promise = await postData.mutateAsync({
			url: receive_entryDescriptionUrl,
			newData: receive_entry_description_data,
			isOnCloseNeeded: false,
		});

		// Create receive_entry entries
		const receive_entry_entries = [...data.receive_entry].map((item) => ({
			...item,
			receive_uuid: new_receive_entry_description_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const receive_entry_entries_promise = [
			...receive_entry_entries.map(
				async (item) =>
					await postData.mutateAsync({
						url: receive_entryEntryUrl,
						newData: item,
						isOnCloseNeeded: false,
					})
			),
		];

		try {
			await Promise.all([
				receive_entry_description_promise,
				...receive_entry_entries_promise,
			])
				.then(() => reset(RECEIVE_NULL))
				.then(() => {
					invalidateStock();
					invalidateEntry();
					navigate(
						`/store/receive/${new_receive_entry_description_uuid}`
					);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	};

	// Check if id is valid
	if (getValues('quantity') === null) return <Navigate to='/not-found' />;

	const keyMap = {
		NEW_ROW: 'alt+n',
		COPY_LAST_ROW: 'alt+c',
	};

	const handlers = {
		NEW_ROW: handelReceiveEntryAppend,
	};

	configure({
		ignoreTags: ['input', 'select', 'textarea'],
		ignoreEventsCondition: function () {},
	});

	const rowClass =
		'group whitespace-nowrap text-left text-sm font-normal tracking-wide px-3 py-2';

	const getTotalPrice = useCallback(
		(receive_entry) =>
			receive_entry?.reduce((acc, item) => {
				return acc + Number(item.price) * Number(item.quantity);
			}, 0),
		[status]
	);
	const defaultColumns = useMemo(
		() => [
			{
				accessorKey: 'name_uuid',
				header: 'Material',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.name_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].name_uuid`}
							title='Material'
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.name_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].name_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Material'
											options={material}
											value={material?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].name_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'article_uuid',
				header: 'Article',
				width: 'w-64',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.article_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].article_uuid`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.article_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].article_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Article'
											options={article}
											value={article?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].article_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'category_uuid',
				header: 'Category',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.category_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].category_uuid`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.category_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].category_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Category'
											options={category}
											value={category?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].category_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'color_uuid',
				header: 'Color',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.color_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].color_uuid`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.color_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].color_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Color'
											options={color}
											value={color?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].color_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'size_uuid',
				header: 'Size',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.size_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].size_uuid`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.size_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].size_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Size'
											options={size}
											value={size?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].size_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,
				cell: (info) => {
					const idx = info.row.index;
					return (
						<Input
							title='quantity'
							label={`receive_entry[${idx}].quantity`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.quantity
							}
							register={register}
							onChange={(e) => {
								setStatus(!status);
							}}
						/>
					);
				},
			},
			{
				accessorKey: 'unit_uuid',
				header: 'Unit',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror =
						errors?.receive_entry?.[idx]?.unit_uuid;
					return (
						<FormField
							label={`receive_entry[${idx}].unit_uuid`}
							is_title_needed='false'
							dynamicerror={
								errors?.receive_entry?.[idx]?.unit_uuid
							}>
							<Controller
								name={`receive_entry[${idx}].unit_uuid`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelect
											placeholder='Select Unit'
											options={unit}
											value={unit?.filter(
												(inItem) =>
													inItem.value ==
													getValues(
														`receive_entry[${idx}].unit_uuid`
													)
											)}
											onChange={(e) => {
												onChange(e.value);
												setStatus(!status);
											}}
											menuPortalTarget={document.body}
											dynamicerror={dynamicerror}
										/>
									);
								}}
							/>
						</FormField>
					);
				},
			},
			{
				accessorKey: 'price',
				header: 'Unit Price',
				enableColumnFilter: false,
				width: 'w-32',
				enableSorting: false,
				cell: (info) => {
					const idx = info.row.index;
					return (
						<Input
							title='price'
							label={`receive_entry[${idx}].price`}
							is_title_needed='false'
							dynamicerror={errors?.receive_entry?.[idx]?.price}
							onChange={(e) => {
								setStatus(!status);
							}}
							register={register}
						/>
					);
				},
			},
			{
				accessorKey: 'price_usd',
				header: (
					<div>
						Price <br /> (USD)
					</div>
				),
				enableColumnFilter: false,
				enableSorting: false,
				cell: (info) => {
					return `${(watch(`receive_entry[${info.row.index}].quantity`) * watch(`receive_entry[${info.row.index}].price`)).toLocaleString()}`;
				},
			},
			{
				accessorKey: 'price_bdt',
				header: (
					<div>
						Price <br /> (BDT)
					</div>
				),
				enableColumnFilter: false,
				enableSorting: false,
				cell: (info) => {
					return `${(watch(`receive_entry[${info.row.index}].quantity`) * watch(`receive_entry[${info.row.index}].price`) * watch('convention_rate')).toLocaleString()}`;
				},
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				enableSorting: false,
				width: 'w-44',
				cell: (info) => (
					<Textarea
						label={`receive_entry[${info.row.index}].remarks`}
						is_title_needed='false'
						height='h-8'
						{...{ register, errors }}
					/>
				),
			},

			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('delete') || isUpdate,
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelDelete={handleReceiveEntryRemove}
						showDelete={haveAccess.includes('delete') || !isUpdate}
						showUpdate={false}
					/>
				),
			},
		],
		[
			receiveEntry,
			register,
			errors,
			unit,
			color,
			size,
			material,
			article,
			category,
		]
	);
	return (
		<>
			<HotKeys {...{ keyMap, handlers }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className='flex flex-col'>
					<div className='space-y-6'>
						<Header
							{...{
								register,
								errors,
								control,
								getValues,
								Controller,
								watch,
								setValue,
							}}
						/>
						<ReactTableTitleOnly
							title={'Receive Entry'}
							data={receiveEntry}
							handelAppend={handelReceiveEntryAppend}
							columns={defaultColumns}>
							<tr className='border-t border-primary/30'>
								<td
									className='px-3 py-2 text-right text-sm font-bold'
									colSpan='8'>
									Total:
								</td>
								<td className='px-3 py-2 text-sm font-bold'>
									{getTotalPrice(
										watch('receive_entry')
									).toLocaleString()}
								</td>
								<td className='px-3 py-2 text-sm font-bold'>
									{(
										getTotalPrice(watch('receive_entry')) *
										watch('convention_rate')
									).toLocaleString()}
								</td>
								<td className='px-3 py-2 font-bold'></td>
							</tr>
						</ReactTableTitleOnly>
					</div>

					<div className='modal-action'>
						<button
							type='submit'
							className='text-md btn btn-primary btn-block rounded'>
							Save
						</button>
					</div>
				</form>
			</HotKeys>
			<Suspense>
				<DeleteModal
					modalId={'receive_entry_delete'}
					title={'Receive Entry'}
					deleteItem={deleteItem}
					setDeleteItem={setDeleteItem}
					setItems={receiveEntry}
					url={receive_entryEntryUrl}
					deleteData={deleteData}
					invalidateQueryArray={[
						invalidateEntryByDetails,
						invalidateStock,
					]}
				/>
			</Suspense>
			<DevTool control={control} placement='top-left' />
		</>
	);
}
