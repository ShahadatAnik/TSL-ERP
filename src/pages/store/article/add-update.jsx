import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useOtherBuyerValueLabel } from '@/state/other';
import { useStoreArticle } from '@/state/store';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { ARTICLE_NULL, ARTICLE_SCHEMA } from '@/util/schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
		section_uuid: null,
		type_uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreArticle();
	const { data: buyer } = useOtherBuyerValueLabel();
	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(ARTICLE_SCHEMA, ARTICLE_NULL);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
			section_uuid: null,
			type_uuid: null,
		}));
		reset(ARTICLE_NULL);
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
	};

	return (
		<AddModal
			id={modalId}
			title={update?.uuid !== null ? 'Update Article' : 'Article'}
			formContext={context}
			isSmall={true}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<Input label='name' {...{ register, errors }} />
			<FormField label='buyer_uuid' {...{ register, errors }}>
				<Controller
					name='buyer_uuid'
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Buyer'
								options={buyer}
								value={buyer?.find(
									(item) =>
										item.value === getValues('buyer_uuid')
								)}
								onChange={(e) => {
									onChange(e.value);
								}}
							/>
						);
					}}
				/>
			</FormField>
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
		</AddModal>
	);
}
