import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useStoreBuyer, useStoreIssue } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { ISSUE_NULL, ISSUE_SCHEMA } from '@/util/schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
		quantity: null,
		issue_quantity: null,
		material_name: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData } = useStoreIssue();
	const schema = {
		...ISSUE_SCHEMA,
		issue_quantity: ISSUE_SCHEMA.issue_quantity.max(
			Number(update?.quantity) + Number(update?.issue_quantity),
			`Quantity cannot be greater than ${update?.quantity}`
		),
	};

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(schema, ISSUE_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
			quantity: 0,
			issue_quantity: 0,
			material_name: null,
		}));
		reset(ISSUE_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (update?.uuid !== null && update?.uuid !== undefined) {
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
	};

	return (
		<AddModal
			id={modalId}
			title={`Update ${update?.material_name} Issue`}
			isSmall={true}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<Input
				label='issue_quantity'
				sub_label={`Max: ${Number(update?.quantity) + Number(update?.issue_quantity)}`}
				{...{ register, errors }}
			/>
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
