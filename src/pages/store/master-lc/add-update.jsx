import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
	useOtherLcValueLabel,
	useOtherMasterLcValueLabel,
} from '@/state/other';
import { useStoreLC, useStoreMasterLC } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import DatePicker from 'react-datepicker';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { MASTER_LC_NULL, MASTER_LC_SCHEMA } from '@/util/schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreMasterLC();
	const { invalidateQuery: invalidateMasterLcValueLabel } =
		useOtherMasterLcValueLabel();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(MASTER_LC_SCHEMA, MASTER_LC_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
		}));
		reset(MASTER_LC_NULL);
		window[modalId].close();
	};

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
		invalidateMasterLcValueLabel();
	};

	return (
		<AddModal
			id={modalId}
			title={update?.uuid !== null ? 'Update Master LC' : 'Master LC'}
			formContext={context}
			isSmall={true}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<Input label='number' {...{ register, errors }} />
			<FormField label='date' title='Date' errors={errors}>
				<Controller
					name={'date'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<DatePicker
								className='h-12 w-full rounded-md border bg-primary/5 px-2 text-primary'
								placeholderText='Select Date'
								dateFormat='dd/MM/yyyy'
								selected={getValues('date')}
								onChange={(date) => onChange(date)}
							/>
						);
					}}
				/>
			</FormField>
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} />
		</AddModal>
	);
}
