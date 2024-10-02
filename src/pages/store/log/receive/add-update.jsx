import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useStoreBuyer, useStoreReceiveEntry } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import {
	FormField,
	Input,
	JoinInput,
	JoinInputSelect,
	ReactSelect,
	Textarea,
} from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { RECEIVE_ENTRY_NULL, RECEIVE_ENTRY_SCHEMA } from '@/util/schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreReceiveEntry();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(RECEIVE_ENTRY_SCHEMA, RECEIVE_ENTRY_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);
	const { value: material } = useFetch('/other/material/value/label');

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
		}));
		reset(RECEIVE_ENTRY_NULL);
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
			title={`Purchase log of ${update?.material_name}`}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<FormField label='material_uuid' title='Material' errors={errors}>
				<Controller
					name={'material_uuid'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Transaction Area'
								options={material}
								value={material?.find(
									(inItem) =>
										inItem.value ==
										getValues(`material_uuid`)
								)}
								onChange={(e) => {
									onChange(e.value);
									setValue('unit', e.unit);
								}}
							/>
						);
					}}
				/>
			</FormField>

			<JoinInput
				title='quantity'
				label={`quantity`}
				unit={
					material?.find(
						(inItem) => inItem.value == getValues(`material_uuid`)
					)?.unit
				}
				register={register}
			/>

			<Input title='price' label={`price`} {...{ register, errors }} />
			<Input label='remarks' {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
