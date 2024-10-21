import { useAuth } from '@/context/auth';
import { useOtherMasterLcValueLabel } from '@/state/other';
import { useStoreMasterLC } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import DatePicker from 'react-datepicker';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { MASTER_LC_NULL, MASTER_LC_SCHEMA } from '@/util/Schema';

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
			<Input
				title='Master LC Number'
				label='number'
				{...{ register, errors }}
			/>
			<Input label='value' {...{ register, errors }} />
			<FormField label='date' title='Master LC Date' errors={errors}>
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
			<Input label='lien_bank' {...{ register, errors }} />
			<Input label='payment_terms' {...{ register, errors }} />
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} />
		</AddModal>
	);
}
