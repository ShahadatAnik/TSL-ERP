import { useAuth } from '@/context/auth';
import {
	useOtherLcValueLabel,
	useOtherMasterLcValueLabel,
} from '@/state/other';
import { useStoreLC } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import DatePicker from 'react-datepicker';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { LC_NULL, LC_SCHEMA } from '@/util/schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreLC();
	const { data: master_lc } = useOtherMasterLcValueLabel();
	const { invalidateQuery: invalidateLCValueLabel } = useOtherLcValueLabel();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(LC_SCHEMA, LC_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
		}));
		reset(LC_NULL);
		window[modalId].close();
	};
	const selectCurrency = [
		{ label: '$US', value: '$us' },
		{ label: 'EUR', value: 'eur' },
		{ label: 'CNY', value: 'cny' },
	];

	const onSubmit = async (data) => {
		// Update item
		if (update?.uuid !== null) {
			const updatedData = {
				...data,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `${url}/${update?.uuid}`,
				uuid: update?.uuid,
				updatedData,
				onClose,
			});

			return;
		}

		// Add Item
		const updatedData = {
			...data,
			uuid: nanoid(),
			created_at: GetDateTime(),
			created_by: user?.uuid,
		};

		await postData.mutateAsync({
			url,
			newData: updatedData,
			onClose,
		});
		invalidateLCValueLabel();
	};

	return (
		<AddModal
			id={modalId}
			title={update?.uuid !== null ? 'Update LC' : 'LC'}
			formContext={context}
			isSmall={false}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<div className='flex flex-col gap-4 md:flex-row'>
				<FormField
					label='master_lc_uuid'
					title='Master LC'
					errors={errors}>
					<Controller
						name={'master_lc_uuid'}
						control={control}
						render={({ field: { onChange, value } }) => {
							return (
								<ReactSelect
									placeholder='Select Master LC'
									options={master_lc}
									value={master_lc?.find(
										(item) => item.value === value
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<Input
					title='B2B LC Number'
					label='number'
					{...{ register, errors }}
				/>
			</div>
			<div className='flex flex-col gap-4 md:flex-row'>
				<Input label='value' {...{ register, errors }} />
				<FormField label='unit' title='Unit' errors={errors}>
					<Controller
						name={'unit'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Unit'
									options={selectCurrency}
									value={selectCurrency?.filter(
										(item) =>
											item.value === getValues('unit')
									)}
									onChange={(e) => onChange(e.value)}
								/>
							);
						}}
					/>
				</FormField>
			</div>
			<div className='flex flex-col gap-4 md:flex-row'>
				<Input label='lien_bank' {...{ register, errors }} />
				<FormField label='date' title='Opening Date' errors={errors}>
					<Controller
						name={'date'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<DatePicker
									className='input input-secondary w-full rounded border-secondary/30 bg-base-100 px-2 text-sm text-primary transition-all duration-100 ease-in-out placeholder:text-sm placeholder:text-secondary/50 focus:border-secondary/30 focus:outline-secondary/30'
									placeholderText='Select Date'
									dateFormat='dd/MM/yyyy'
									selected={getValues('date')}
									onChange={(date) => onChange(date)}
								/>
							);
						}}
					/>
				</FormField>
			</div>

			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} />
		</AddModal>
	);
}
