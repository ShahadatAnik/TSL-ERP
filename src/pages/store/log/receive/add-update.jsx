import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
	useOtherArticleValueLabel,
	useOtherCategoryValueLabel,
	useOtherColorValueLabel,
	useOtherMaterialValueLabel,
	useOtherSizeValueLabel,
	useOtherUnitValueLabel,
} from '@/state/other';
import {
	useStoreArticle,
	useStoreBuyer,
	useStoreReceiveEntry,
	useStoreStock,
} from '@/state/store';
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
import { RECEIVE_ENTRY_NULL, RECEIVE_ENTRY_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
		material_name: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useStoreReceiveEntry();
	const { invalidateQuery: invalidateStock } = useStoreStock();

	const { data: article } = useOtherArticleValueLabel();
	const { data: material } = useOtherMaterialValueLabel();
	const { data: category } = useOtherCategoryValueLabel();
	const { data: color } = useOtherColorValueLabel();
	const { data: size } = useOtherSizeValueLabel();
	const { data: unit } = useOtherUnitValueLabel();
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
	// const { value: material } = useFetch('/other/material/value/label');

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
		invalidateStock();
	};

	return (
		<AddModal
			id={modalId}
			title={`Receive log of ${update?.material_name} `}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={false}>
			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<FormField label='name_uuid' title='Material' errors={errors}>
					<Controller
						name={'name_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Material'
									options={material}
									value={material?.find(
										(inItem) =>
											inItem.value ==
											getValues(`name_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<FormField label='article_uuid' title='Article' errors={errors}>
					<Controller
						name={'article_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Article'
									options={article}
									value={article?.find(
										(inItem) =>
											inItem.value ==
											getValues(`article_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
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
									value={category?.find(
										(inItem) =>
											inItem.value ==
											getValues(`category_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
			</div>
			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<FormField label='unit_uuid' title='Unit' errors={errors}>
					<Controller
						name={'unit_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Unit'
									options={unit}
									value={unit?.find(
										(inItem) =>
											inItem.value ==
											getValues(`unit_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<FormField label='size_uuid' title='Size' errors={errors}>
					<Controller
						name={'size_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Size'
									options={size}
									value={size?.find(
										(inItem) =>
											inItem.value ==
											getValues(`size_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<FormField label='unit_uuid' title='Unit' errors={errors}>
					<Controller
						name={'unit_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Unit'
									options={unit}
									value={unit?.find(
										(inItem) =>
											inItem.value ==
											getValues(`unit_uuid`)
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
			</div>
			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<FormField label='color_uuid' title='Color' errors={errors}>
					<Controller
						name={'color_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Color'
									options={color}
									value={color?.find(
										(inItem) =>
											inItem.value ==
											getValues(`color_uuid`)
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
					title='quantity'
					label={`quantity`}
					unit={getValues('unit_name')}
					register={register}
				/>
				<Input
					title='price'
					label={`price`}
					{...{ register, errors }}
				/>
			</div>

			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
