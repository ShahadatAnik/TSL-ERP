import { Suspense, useCallback, useEffect, useState } from 'react';
import { useOtherMaterialValueLabel } from '@/state/other';
import {
	useStoreReceive,
	useStoreReceiveEntry,
	useStoreStock,
} from '@/state/store';
import { useAuth } from '@context/auth';
import { DevTool } from '@hookform/devtools';
import { configure, HotKeys } from 'react-hotkeys';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import {
	DynamicField,
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
	const navigate = useNavigate();
	const { receive_entry_description_uuid } = useParams();

	const { url: receive_entryEntryUrl, invalidateQuery: invalidateEntry } =
		useStoreReceiveEntry();
	const {
		url: receive_entryDescriptionUrl,
		updateData,
		postData,
		deleteData,
	} = useStoreReceive();

	const [unit, setUnit] = useState({});
	const { data: material } = useOtherMaterialValueLabel();
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
	isUpdate &&
		useFetchForRhfReset(
			`/store/receive-entry-details/by/${receive_entry_description_uuid}`,
			receive_entry_description_uuid,
			reset
		);

	// receive_entry
	const {
		fields: receiveEntry,
		append: receiveEntryAppend,
		remove: receiveEntryRemove,
	} = useFieldArray({
		control,
		name: 'receive_entry',
	});

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
		}

		receiveEntryRemove(index);
	};

	const handelReceiveEntryAppend = () => {
		receiveEntryAppend({
			material_uuid: '',
			quantity: '',
			price: '',
			remarks: '',
		});
	};

	let excludeItem = exclude(
		watch,
		material,
		'receive_entry',
		'material_uuid'
	);
	// Submit
	const onSubmit = async (data) => {
		// Update item
		if (isUpdate) {
			const receive_entry_description_data = {
				...data,
				updated_at: GetDateTime(),
			};

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
		[watch()]
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

						<DynamicField
							title='Details'
							handelAppend={handelReceiveEntryAppend}
							tableHead={[
								'Material',
								'Quantity',
								'Unit Price',
								'Price',
								'Price(BDT)',
								'Remarks',
								'Action',
							].map((item) => (
								<th
									key={item}
									scope='col'
									className='group cursor-pointer select-none whitespace-nowrap bg-secondary px-4 py-2 text-left font-semibold tracking-wide text-secondary-content transition duration-300'>
									{item}
								</th>
							))}>
							{receiveEntry.map((item, index) => (
								<tr key={item.id}>
									<td className={`${rowClass}`}>
										<FormField
											label={`receive_entry[${index}].material_uuid`}
											title='Material'
											is_title_needed='false'
											errors={errors}>
											<Controller
												name={`receive_entry[${index}].material_uuid`}
												control={control}
												render={({
													field: { onChange },
												}) => {
													return (
														<ReactSelect
															placeholder='Select Material'
															options={material?.filter(
																(inItem) =>
																	!excludeItem.some(
																		(
																			excluded
																		) =>
																			excluded?.value ===
																			inItem?.value
																	)
															)}
															value={material?.find(
																(inItem) =>
																	inItem.value ==
																	getValues(
																		`receive_entry[${index}].material_uuid`
																	)
															)}
															onChange={(e) => {
																onChange(
																	e.value
																);
																setUnit({
																	...unit,
																	[index]:
																		e.unit,
																});
															}}
															menuPortalTarget={
																document.body
															}
														/>
													);
												}}
											/>
										</FormField>
									</td>

									<td className={`w-48 ${rowClass}`}>
										<JoinInput
											title='quantity'
											label={`receive_entry[${index}].quantity`}
											is_title_needed='false'
											dynamicerror={
												errors?.receive_entry?.[index]
													?.quantity
											}
											unit={
												material?.find(
													(inItem) =>
														inItem.value ==
														getValues(
															`receive_entry[${index}].material_uuid`
														)
												)?.unit
											}
											register={register}
										/>
									</td>
									<td className={`w-48 ${rowClass}`}>
										<Input
											title='price'
											label={`receive_entry[${index}].price`}
											is_title_needed='false'
											dynamicerror={
												errors?.receive_entry?.[index]
													?.price
											}
											register={register}
										/>
									</td>
									<td className={`w-48 ${rowClass}`}>
										{`${watch(`receive_entry[${index}].quantity`) * watch(`receive_entry[${index}].price`)}`}
									</td>
									<td className={`w-48 ${rowClass}`}>
										{`${watch(`receive_entry[${index}].quantity`) * watch(`receive_entry[${index}].price`) * watch('convention_rate')}`}
									</td>
									<td className={`w-48 ${rowClass}`}>
										<Textarea
											title='remarks'
											label={`receive_entry[${index}].remarks`}
											is_title_needed='false'
											dynamicerror={
												errors?.receive_entry?.[index]
													?.remarks
											}
											register={register}
										/>
									</td>
									<td className={`w-12 ${rowClass} pl-0`}>
										<RemoveButton
											className={'justify-center'}
											onClick={() =>
												handleReceiveEntryRemove(index)
											}
											showButton={receiveEntry.length > 1}
										/>
									</td>
								</tr>
							))}
							<tr className='border-t border-primary/30'>
								<td
									className='px-3 py-2 text-right font-bold'
									colSpan='3'>
									Total:
								</td>
								<td className='px-3 py-2 font-bold'>
									{getTotalPrice(watch('receive_entry'))}
								</td>
								<td className='px-3 py-2 font-bold'>
									{getTotalPrice(watch('receive_entry')) *
										watch('convention_rate')}
								</td>
								<td className='px-3 py-2 font-bold'></td>
							</tr>
						</DynamicField>
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
				/>
			</Suspense>
			<DevTool control={control} placement='top-left' />
		</>
	);
}
