import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
	useOtherArticleValueLabel,
	useOtherCategoryValueLabel,
} from '@/state/other';
import { useStoreStock } from '@/state/store';
import { DevTool } from '@hookform/devtools';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { STOCK_NULL, STOCK_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreStock();
	const { data: category } = useOtherCategoryValueLabel();
	const { data: article } = useOtherArticleValueLabel();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(STOCK_SCHEMA, STOCK_NULL);

	useFetchForRhfReset(`${url}/${update?.uuid}`, url, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
		}));
		reset(STOCK_NULL);
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
			title={update?.uuid !== null ? 'Update Material' : 'Material'}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<div className='mb-4 flex flex-col gap-2 rounded bg-base-200 p-2 md:flex-row'>
				<FormField label='article_uuid' title='Article' errors={errors}>
					<Controller
						name={'article_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Article'
									options={article}
									value={article?.filter(
										(item) =>
											item.value ===
											getValues('article_uuid')
									)}
									onChange={(e) => onChange(e.value)}
									isDisabled={update?.uuid !== null}
								/>
							);
						}}
					/>
				</FormField>
				<FormField
					label='category_uuid'
					title='Category'
					errors={errors}>
					<Controller
						name={'category_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Category'
									options={category}
									value={category?.filter(
										(item) =>
											item.value ===
											getValues('category_uuid')
									)}
									onChange={(e) => onChange(e.value)}
									isDisabled={update?.uuid !== null}
								/>
							);
						}}
					/>
				</FormField>
			</div>
			<div className='mb-4 flex flex-col gap-2 rounded bg-base-200 p-2 md:flex-row'>
				<Input label='name' {...{ register, errors }} />
				<Input label='color' {...{ register, errors }} />
				<Input label='quantity' {...{ register, errors }} />
			</div>
			<div className='mb-4 flex flex-col gap-2 rounded bg-base-200 p-2 md:flex-row'>
				<Input label='remarks' {...{ register, errors }} />
			</div>
			<DevTool control={control} />
		</AddModal>
	);
}
