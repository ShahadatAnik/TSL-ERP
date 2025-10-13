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
	useStoreBulkDetails,
	useStoreBulkIssue,
	useStoreIssue,
	useStoreReceive,
	useStoreReceiveEntry,
	useStoreStock,
} from '@/state/store';
import { useAuth } from '@context/auth';
import { format } from 'date-fns';
import { FileSpreadsheet } from 'lucide-react';
import { configure, HotKeys } from 'react-hotkeys';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useAccess, useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import ReadFile from '@/components/read-file';
import ReactTableTitleOnly from '@/components/Table/ReactTableTitleOnly';
import { ShowLocalToast } from '@/components/Toast';
import ReactSelectCreatable from '@/ui/Others/ReactSelect/react-select-creatable';
import { EditDelete, FormField, Input, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import { DevTool } from '@lib/react-hook-devtool';
import { exclude } from '@/util/Exclude';
import GetDateTime from '@/util/GetDateTime';
import { BULK_ISSUE_NULL, BULK_ISSUE_SCHEMA } from '@/util/Schema';

import { transformBulkIssueDataWithValidation } from '../utils';
import Header from './header';

export default function Index() {
	const { user } = useAuth();
	const [status, setStatus] = useState(false);
	const haveAccess = useAccess('store__bulk_entry');
	const navigate = useNavigate();
	const { uuid } = useParams();
	const { data, invalidateQuery: invalidateEntryByDetails } =
		useStoreIssue(uuid);
	const { data: bulkData } = useStoreBulkDetails(uuid);
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
	const { data: stockData } = useStoreStock();
	const { invalidateQuery: inValidateIssue } = useStoreIssue();
	const { invalidateQuery: invalidateBulkIssue } = useStoreBulkIssue();

	useEffect(() => {
		uuid !== undefined
			? (document.title = 'Update Bulk Entry: ' + uuid)
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
		formState,
	} = useRHF(BULK_ISSUE_SCHEMA, BULK_ISSUE_NULL);

	const isUpdate = uuid !== undefined;
	const {
		fields: receiveEntry,
		append: receiveEntryAppend,
		remove: receiveEntryRemove,
	} = useFieldArray({
		control,
		name: 'bulk_entry',
	});
	useEffect(() => {
		if (bulkData !== undefined && isUpdate) {
			reset(transformBulkIssueDataWithValidation(bulkData));
			setValue(
				'bulk_entry',
				transformBulkIssueDataWithValidation(bulkData).bulk_entry
			);
		}
	}, [bulkData, isUpdate]);

	// bulk_entry

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
		// console.log(data);
		// return;
		if (data?.bulk_entry.length === 0) {
			ShowLocalToast({
				type: 'error',
				message: 'Please add at least one item',
			});
			return;
		}
		if (isUpdate) {
			const issueHeaderData = {
				...data,
				issue_header_uuid: uuid,
				issue_date: data?.issue_date
					? format(data?.issue_date, 'yyyy-MM-dd HH:mm:ss')
					: null,
				updated_at: GetDateTime(),
			};
			delete issueHeaderData['bulk_entry'];
			const bulk_entry_description_promise = await updateData.mutateAsync(
				{
					url: `/store/issue-header/${uuid}`,
					updatedData: issueHeaderData,
					uuid: uuid,
					isOnCloseNeeded: false,
				}
			);

			const bulk_entry_entries_promise = data.bulk_entry.map(
				async (item, index) => {
					// if (item.uuid === undefined || item.uuid === null) {
					// 	item.issue_header_uuid = uuid;
					// 	item.created_at = GetDateTime();
					// 	item.created_by = user?.uuid;
					// 	item.uuid = nanoid();
					// 	item.index = index + 1;
					// 	item.quantity = item.issue_quantity;
					// 	return await postData.mutateAsync({
					// 		url: '/store/issue',
					// 		newData: [item],
					// 		isOnCloseNeeded: false,
					// 	});
					// } else {
					item.updated_at = GetDateTime();
					item.index = index + 1;
					item.issue_header_uuid = uuid;
					item.quantity = item.issue_quantity;
					const updatedData = {
						...item,
					};
					return await updateData.mutateAsync({
						url: `/store/issue/${item.uuid}`,
						uuid: item.uuid,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			);

			try {
				await Promise.all([
					bulk_entry_description_promise,
					...bulk_entry_entries_promise,
				])
					.then(() => reset(BULK_ISSUE_NULL))
					.then(() => {
						invalidateStock();
						inValidateIssue();
						invalidateBulkIssue();
						navigate(`/store/stock/bulk-issue/${uuid}/details`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}
		// Add new item
		const issue_header_uuid = nanoid();
		const created_at = GetDateTime();
		const created_by = user.uuid;

		// Create bulk_entry description
		const issueHeaderData = {
			...data,
			uuid: issue_header_uuid,
			issue_date: data?.issue_date
				? format(data?.issue_date, 'yyyy-MM-dd HH:mm:ss')
				: null,
			created_at,
			created_by,
		};

		// delete bulk_entry field from data to be sent
		delete issueHeaderData['bulk_entry'];

		const issue_header_promise = await postData.mutateAsync({
			url: '/store/issue-header',
			newData: issueHeaderData,
			isOnCloseNeeded: false,
		});
		// Create bulk_entry entries
		const bulk_entry_entries = [...data.bulk_entry].map((item) => ({
			...item,
			uuid: nanoid(),

			issue_header_uuid: issue_header_uuid,
			quantity: item?.issue_quantity,
			created_at,
			created_by,
		}));

		const bulk_entry_entries_promise = await postData.mutateAsync({
			url: '/store/issue',
			newData: bulk_entry_entries,
			isOnCloseNeeded: false,
		});

		try {
			await Promise.all([
				issue_header_promise,
				bulk_entry_entries_promise,
			])
				.then(() => reset(BULK_ISSUE_NULL))
				.then(() => {
					invalidateStock();
					inValidateIssue();
					invalidateBulkIssue();
					navigate(
						`/store/stock/bulk-issue/${issue_header_uuid}/details`
					);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	};

	// Check if id is valid
	if (uuid && uuid === 'invalid') {
		return <Navigate to='/not-found' />;
	}

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
				return acc + Number(item.issue_quantity);
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

					return (
						<span>{getValues(`bulk_entry[${idx}].material`)}</span>
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
						<span>{getValues(`bulk_entry[${idx}].article`)}</span>
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
						<span>{getValues(`bulk_entry[${idx}].category`)}</span>
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
					return <span>{getValues(`bulk_entry[${idx}].color`)}</span>;
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
					return <span>{getValues(`bulk_entry[${idx}].size`)}</span>;
				},
			},
			{
				accessorKey: 'stock_quantity',
				header: 'Stock Quantity',
				width: 'w-32',
				enableColumnFilter: false,
				enableSorting: false,
				cell: (info) => {
					const idx = info.row.index;
					return (
						<span>
							{getValues(`bulk_entry[${idx}].stock_quantity`)}
						</span>
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
					return <span>{getValues(`bulk_entry[${idx}].unit`)}</span>;
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
							title='issue_quantity'
							label={`bulk_entry[${idx}].issue_quantity`}
							is_title_needed='false'
							dynamicerror={
								errors?.bulk_entry?.[idx]?.issue_quantity
							}
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

		// Clean and prepare data
		const newData = data
			.filter((item) => {
				// Filter out rows with missing required fields
				const materialValue = item?.material_name || item?.material;
				const unitValue = item?.unit_name || item?.unit;
				const stockQuantity = Number(item?.stock_quantity) || 0;
				const issueQuantity = Number(item?.issue_quantity) || 0;

				return (
					materialValue &&
					unitValue &&
					stockQuantity > 0 &&
					issueQuantity > 0
				);
			})
			.map((item) => {
				const materialValue = item.material_name || item.material || '';
				const articleValue = item.article_name || item.article || '';
				const categoryValue = item.category_name || item.category || '';
				const colorValue = item.color_name || item.color || '';
				const sizeValue = item.size_name || item.size || '';
				const unitValue = item.unit_name || item.unit || '';

				// Add to dropdown options if they don't exist and are not empty
				if (
					materialValue &&
					!material.find((m) => m.label === materialValue)
				) {
					material.push({
						label: materialValue,
						value: materialValue,
					});
				}
				if (
					articleValue &&
					!article.find((m) => m.label === articleValue)
				) {
					article.push({ label: articleValue, value: articleValue });
				}
				if (
					categoryValue &&
					!category.find((m) => m.label === categoryValue)
				) {
					category.push({
						label: categoryValue,
						value: categoryValue,
					});
				}
				if (colorValue && !color.find((m) => m.label === colorValue)) {
					color.push({ label: colorValue, value: colorValue });
				}
				if (sizeValue && !size.find((m) => m.label === sizeValue)) {
					size.push({ label: sizeValue, value: sizeValue });
				}
				if (unitValue && !unit.find((m) => m.label === unitValue)) {
					unit.push({ label: unitValue, value: unitValue });
				}

				return {
					material_uuid: item.material_uuid || null,
					material: materialValue || null,
					article: articleValue || null,
					category: categoryValue || null,
					color: colorValue || null,
					size: sizeValue || null,
					unit: unitValue || null,
					stock_quantity: Number(item.stock_quantity) || 0,
					issue_quantity: Number(item.issue_quantity) || 0,
				};
			})
			.filter(Boolean);

		try {
			setIsLoading(true);

			if (newData.length === 0) {
				console.error('No valid data to upload');
				return;
			}

			// Clear existing fields first
			receiveEntryRemove();

			// Append items in chunks
			await appendInChunks(receiveEntryAppend, newData, 20);
		} catch (error) {
			console.error('Error uploading file:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <FileUploading />;
	}

	// Excel export function with hidden UUID columns
	const exportToExcel = () => {
		if (!stockData || stockData.length === 0) {
			console.error('No data to export');
			return;
		}

		// Create workbook
		const workbook = XLSX.utils.book_new();

		// Prepare data with UUIDs (UUIDs first, then names)
		const headers = [
			'material_uuid',
			'material_name',
			'article_name',
			'category_name',
			'color_name',
			'size_name',
			'unit_name',
			'stock_quantity',
			'issue_quantity',
		];

		const dataRows = stockData
			.slice(0, 10)
			.map((item) => [
				item.uuid || '',
				item.material_name || '',
				item.article_name || '',
				item.category_name || '',
				item.color_name || '',
				item.size_name || '',
				item.unit_name || '',
				Math.abs(item.quantity) || 0,
				0,
			]);

		const worksheetData = [headers, ...dataRows];
		const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

		// Hide UUID columns (first 6 columns)
		worksheet['!cols'] = [
			{ hidden: true, width: 0 }, // material_uuid
			{ width: 20 }, // material_name
			{ width: 20 }, // article_name
			{ width: 15 }, // category_name
			{ width: 15 }, // color_name
			{ width: 10 }, // size_name
			{ width: 10 }, // unit_name
			{ width: 15 }, // stock_quantity
			{ width: 15 }, // issue_quantity
		];

		// Add worksheet to workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Data');

		// Generate filename with timestamp
		const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
		const filename = `stock_data_${timestamp}.xlsx`;

		// Save file
		XLSX.writeFile(workbook, filename);
	};

	return (
		<>
			<HotKeys {...{ keyMap, handlers }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className='flex flex-col gap-2'>
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
					<div className='space-y-6'>
						<ReactTableTitleOnly
							title={'Bulk Entry'}
							data={receiveEntry}
							columns={defaultColumns}
							extraButton={
								!isUpdate && (
									<div className='flex items-center gap-4'>
										<button
											type='button'
											className='flex gap-1 rounded bg-yellow-400 px-3 py-1 text-right text-xs font-bold text-white'
											disabled={isUpdate}
											onClick={exportToExcel}>
											<FileSpreadsheet className='size-4' />
											Demo
										</button>

										<ReadFile
											onChange={handleUploadFile}
											disabled={isUpdate}
										/>
									</div>
								)
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
