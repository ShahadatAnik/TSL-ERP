import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';

export default function Index({
	modalId = '',
	updateMaterialDetails = {
		uuid: null,
		section_uuid: null,
		type_uuid: null,
	},
	setUpdateMaterialDetails,
}) {
	const { user } = useAuth();
	const { url, updateData, postData } = useMaterialInfo();
	const { data } = useMaterialInfoByUUID(updateMaterialDetails?.uuid);
	const { data: section } = useOtherMaterialSection();
	const { data: materialType } = useOtherMaterialType();

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(MATERIAL_SCHEMA, MATERIAL_NULL);

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data]);

	const onClose = () => {
		setUpdateMaterialDetails((prev) => ({
			...prev,
			uuid: null,
			section_uuid: null,
			type_uuid: null,
		}));
		reset(MATERIAL_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (updateMaterialDetails?.uuid !== null) {
			const updatedData = {
				...data,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `${url}/${updateMaterialDetails?.uuid}`,
				uuid: updateMaterialDetails?.uuid,
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

	const selectUnit = [
		{ label: 'kg', value: 'kg' },
		{ label: 'Litre', value: 'ltr' },
		{ label: 'Meter', value: 'mtr' },
		{ label: 'Piece', value: 'pcs' },
	];

	return (
		<AddModal
			id={modalId}
			title={
				updateMaterialDetails?.uuid !== null
					? 'Update Material'
					: 'Material'
			}
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
									options={section}
									value={section?.filter(
										(item) =>
											item.value ===
											getValues('article_uuid')
									)}
									onChange={(e) => onChange(e.value)}
									isDisabled={
										updateMaterialDetails?.uuid !== null
									}
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
									options={materialType}
									value={materialType?.filter(
										(item) =>
											item.value ===
											getValues('category_uuid')
									)}
									onChange={(e) => onChange(e.value)}
									isDisabled={
										updateMaterialDetails?.uuid !== null
									}
								/>
							);
						}}
					/>
				</FormField>
			</div>
			<div className='mb-4 flex flex-col gap-2 rounded bg-base-200 p-2 md:flex-row'>
				<Input label='name' {...{ register, errors }} />
				<Input label='color' {...{ register, errors }} />
			</div>
			<div className='mb-4 flex flex-col gap-2 rounded bg-base-200 p-2 md:flex-row'>
				<Input label='remarks' {...{ register, errors }} />
			</div>
		</AddModal>
	);
}
