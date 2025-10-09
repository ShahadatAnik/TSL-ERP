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
	useStoreIssue,
	useStoreReceive,
	useStoreReceiveEntry,
	useStoreStock,
} from '@/state/store';
import { useAuth } from '@context/auth';
import { format } from 'date-fns';
import { FileSpreadsheet } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { configure, HotKeys } from 'react-hotkeys';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAccess, useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import ReadFile from '@/components/read-file';
import ReactTableTitleOnly from '@/components/Table/ReactTableTitleOnly';
import ReactSelectCreatable from '@/ui/Others/ReactSelect/react-select-creatable';
import { EditDelete, FormField, Input, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import { DevTool } from '@lib/react-hook-devtool';
import { exclude } from '@/util/Exclude';
import GetDateTime from '@/util/GetDateTime';
import { BULK_ISSUE_NULL, BULK_ISSUE_SCHEMA } from '@/util/Schema';

export default function Index() {
	const { user } = useAuth();
	const [status, setStatus] = useState(false);
	const haveAccess = useAccess('store__bulk_entry');
	const navigate = useNavigate();
	const { bulk_entry_description_uuid } = useParams();
	const { data, invalidateQuery: invalidateEntryByDetails } = useStoreIssue(
		bulk_entry_description_uuid
	);
	const { url: bulk_entryEntryUrl, invalidateQuery: invalidateEntry } =
		useStoreReceiveEntry();
	const {
		url: bulk_entryDescriptionUrl,
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
		bulk_entry_description_uuid !== undefined
			? (document.title =
					'Update Bulk Entry: ' + bulk_entry_description_uuid)
			: (document.title = 'Bulk Entry');
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
	} = useRHF(BULK_ISSUE_SCHEMA, BULK_ISSUE_NULL);

	const isUpdate = bulk_entry_description_uuid !== undefined;

	// bulk_entry
	const {
		fields: receiveEntry,
		append: receiveEntryAppend,
		remove: receiveEntryRemove,
	} = useFieldArray({
		control,
		name: 'bulk_entry',
	});

	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});

	const handleReceiveEntryRemove = (index) => {
		receiveEntryRemove(index);
	};

	const handelReceiveEntryAppend = () => {
		receiveEntryAppend({
			material: null,
			article: null,
			category: null,
			color: null,
			size: null,
			unit: null,
			stock_quantity: 0,
			issue_quantity: 0,
			remarks: null,
		});
	};

	let excludeItem = exclude(
		watch,
		material,
		'bulk_entry',
		'material_uuid',
		status
	);

	// Submit
	const onSubmit = async (data) => {
		// Add new item
		const new_bulk_entry_description_uuid = nanoid();
		const created_at = GetDateTime();
		const created_by = user.uuid;

		// Create bulk_entry description
		const bulk_entry_description_data = {
			...data,
			inventory_date: format(data?.inventory_date, 'yyyy-MM-dd HH:mm:ss'),
			uuid: new_bulk_entry_description_uuid,
			created_at,
			created_by,
		};

		// delete bulk_entry field from data to be sent
		delete bulk_entry_description_data['bulk_entry'];

		const bulk_entry_description_promise = await postData.mutateAsync({
			url: bulk_entryDescriptionUrl,
			newData: bulk_entry_description_data,
			isOnCloseNeeded: false,
		});

		// Create bulk_entry entries
		const bulk_entry_entries = [...data.bulk_entry].map((item) => ({
			...item,
			receive_uuid: new_bulk_entry_description_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const bulk_entry_entries_promise = await postData.mutateAsync({
			url: bulk_entryEntryUrl,
			newData: bulk_entry_entries,
			isOnCloseNeeded: false,
		});

		try {
			await Promise.all([
				bulk_entry_description_promise,
				bulk_entry_entries_promise,
			])
				.then(() => reset(BULK_ISSUE_NULL))
				.then(() => {
					invalidateStock();
					invalidateEntry();
					navigate(
						`/store/receive/${new_bulk_entry_description_uuid}`
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
		(bulk_entry) =>
			bulk_entry?.reduce((acc, item) => {
				return acc + Number(item.price) * Number(item.quantity);
			}, 0),
		[status]
	);
	const defaultColumns = useMemo(
		() => [
			{
				accessorKey: 'material',
				header: 'Material',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.material;
					return (
						<FormField
							label={`bulk_entry[${idx}].material`}
							title='Material'
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.material}>
							<Controller
								name={`bulk_entry[${idx}].material`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Material'
											options={material}
											value={material?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].material`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].material`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												material.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
				accessorKey: 'article',
				header: 'Article',
				width: 'w-64',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.article;
					return (
						<FormField
							label={`bulk_entry[${idx}].article`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.article}>
							<Controller
								name={`bulk_entry[${idx}].article`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Article'
											options={article}
											value={article?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].article`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].article`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												article.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
				accessorKey: 'category',
				header: 'Category',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.category;
					return (
						<FormField
							label={`bulk_entry[${idx}].category`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.category}>
							<Controller
								name={`bulk_entry[${idx}].category`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Category'
											options={category}
											value={category?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].category`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].category`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												category.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
				accessorKey: 'color',
				header: 'Color',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.color;
					return (
						<FormField
							label={`bulk_entry[${idx}].color`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.color}>
							<Controller
								name={`bulk_entry[${idx}].color`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Color'
											options={color}
											value={color?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].color`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].color`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												color.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
				accessorKey: 'size',
				header: 'Size',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.size;
					return (
						<FormField
							label={`bulk_entry[${idx}].size`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.size}>
							<Controller
								name={`bulk_entry[${idx}].size`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Size'
											options={size}
											value={size?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].size`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].size`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												size.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
							label={`bulk_entry[${idx}].quantity`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.quantity}
							disabled={true}
							register={register}
							onChange={(e) => {
								setStatus(!status);
							}}
						/>
					);
				},
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,

				cell: (info) => {
					const idx = info.row.index;
					const dynamicerror = errors?.bulk_entry?.[idx]?.unit;
					return (
						<FormField
							label={`bulk_entry[${idx}].unit`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.unit}>
							<Controller
								name={`bulk_entry[${idx}].unit`}
								control={control}
								render={({ field: { onChange } }) => {
									return (
										<ReactSelectCreatable
											placeholder='Select Unit'
											options={unit}
											value={unit?.filter(
												(inItem) =>
													inItem.label ==
														getValues(
															`bulk_entry[${idx}].unit`
														) ||
													inItem.value ==
														getValues(
															`bulk_entry[${idx}].unit`
														)
											)}
											onChange={(e) => {
												onChange(e.label);
												setStatus(!status);
											}}
											onCreateOption={(inputValue) => {
												const newOption = {
													label: inputValue,
													value: inputValue,
												};
												unit.push(newOption);
												onChange(newOption.label);
											}}
											isDisabled={true}
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
				accessorKey: 'issue_quantity',
				header: 'Issue Quantity',
				enableColumnFilter: false,
				width: 'w-32',
				enableSorting: false,
				cell: (info) => {
					const idx = info.row.index;
					return (
						<Input
							title='price'
							label={`bulk_entry[${idx}].price`}
							is_title_needed='false'
							dynamicerror={errors?.bulk_entry?.[idx]?.price}
							onChange={(e) => {
								setStatus(!status);
							}}
							register={register}
						/>
					);
				},
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

	/// Upload file function ///
	const [isLoading, setIsLoading] = useState(false);

	const appendInChunks = async (appendFn, items, chunkSize = 10) => {
		let index = 0;

		return new Promise((resolve) => {
			const process = () => {
				const chunk = items.slice(index, index + chunkSize);

				chunk.forEach((item) => {
					appendFn(item, { shouldFocus: false }); // Prevent re-render/focus
				});

				index += chunkSize;

				if (index < items.length) {
					// Let UI breathe
					setTimeout(process, 0);
				} else {
					resolve();
				}
			};

			process();
		});
	};

	const handleUploadFile = async (data) => {
		if (!data || data.length === 0) return;

		// Prepare your data
		const newData = data
			.filter((item) => item?.material)
			.map((item, index) => {
				material.find((m) => m.label === item.material) ||
					material.push({
						label: item.material,
						value: item.material,
					});

				article.find((m) => m.label === item.article) ||
					article.push({
						label: item.article,
						value: item.article,
					});

				category.find((m) => m.label === item.category) ||
					category.push({
						label: item.category,
						value: item.category,
					});

				color.find((m) => m.label === item.color) ||
					color.push({
						label: item.color,
						value: item.color,
					});

				size.find((m) => m.label === item.size) ||
					size.push({
						label: item.size,
						value: item.size,
					});

				unit.find((m) => m.label === item.unit) ||
					unit.push({
						label: item.unit,
						value: item.unit,
					});

				return {
					material: item.material,
					article: item.article,
					category: item.category,
					color: item.color,
					size: item.size,
					unit: item.unit,
					stock_quantity: item.stock_quantity,
					issue_quantity: item.issue_quantity,
					remarks: item.remarks,
				};
			});

		try {
			setIsLoading(true);

			const isValid = BULK_ISSUE_SCHEMA.isValid(newData[0]);
			if (!isValid) throw new Error('Invalid data');

			// Clear existing fields
			receiveEntryRemove();

			// Append items in chunks with shouldFocus: false
			await appendInChunks(receiveEntryAppend, newData, 20);
		} catch (error) {
			console.log('Error uploading file:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <FileUploading />;
	}

	const csvData = Object.keys(
		BULK_ISSUE_SCHEMA.bulk_entry.describe().innerType.fields
	);

	return (
		<>
			<HotKeys {...{ keyMap, handlers }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className='flex flex-col'>
					<div className='space-y-6'>
						<ReactTableTitleOnly
							title={'Bulk Entry'}
							data={receiveEntry}
							handelAppend={handelReceiveEntryAppend}
							columns={defaultColumns}
							extraButton={
								<div className='flex items-center gap-4'>
									{csvData &&
										Array.isArray(csvData) &&
										csvData.length > 0 && (
											<CSVLink
												title='Demo Sheet'
												type='button'
												className='btn btn-warning btn-xs gap-1 rounded'
												data={[csvData]}>
												<FileSpreadsheet className='size-4' />
												Demo
											</CSVLink>
										)}

									<ReadFile onChange={handleUploadFile} />
								</div>
							}>
							<tr className='border-t border-primary/30'>
								<td
									className='px-3 py-2 text-right text-sm font-bold'
									colSpan='7'>
									Total:
								</td>
								<td className='px-3 py-2 text-sm font-bold'>
									{getTotalPrice(
										watch('bulk_entry')
									)?.toLocaleString()}
								</td>
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
					modalId={'bulk_entry_delete'}
					title={'Bulk Entry'}
					deleteItem={deleteItem}
					setDeleteItem={setDeleteItem}
					setItems={receiveEntry}
					url={bulk_entryEntryUrl}
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
