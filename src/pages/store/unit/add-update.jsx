import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useOtherUnitValueLabel } from '@/state/other';
import { useStoreUnit } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { LIBRARY_NULL, LIBRARY_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreUnit();
	const { invalidateQuery: invalidateUnitValueLabel } =
		useOtherUnitValueLabel();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(LIBRARY_SCHEMA, LIBRARY_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
		}));
		reset(LIBRARY_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
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
		invalidateUnitValueLabel();
	};

	return (
		<AddModal
			id={modalId}
			title={update?.uuid !== null ? 'Update Unit' : 'Unit'}
			formContext={context}
			isSmall={true}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<Input label='name' {...{ register, errors }} />
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} />
		</AddModal>
	);
}
