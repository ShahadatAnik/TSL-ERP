import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
	useStoreBuyer,
	useStoreIssue,
	useStoreStock,
	useStoreStockMaterialValueLabel,
} from '@/state/store';
import { useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, JoinInputSelect, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import { DevTool } from '@lib/react-hook-devtool';
import GetDateTime from '@/util/GetDateTime';
import { ISSUE_NULL, ISSUE_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	update = {
		uuid: null,
		quantity: null,
		stock_quantity: null,
		material_name: null,
	},
	setUpdate,
}) {
	const { user } = useAuth();
	const { url, updateData } = useStoreIssue();
	const { invalidateQuery: invalidateStock } = useStoreStock();
	const { data: stockMaterials } = useStoreStockMaterialValueLabel();
	const schema = {
		...ISSUE_SCHEMA,
	};

	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		watch,
		context,
	} = useRHF(schema, ISSUE_NULL);

	const selectedMaterial = stockMaterials?.find(
		(item) => item.value === watch('material_uuid')
	);
	useFetchForRhfReset(`${url}/${update?.uuid}`, update?.uuid, reset);

	const onClose = () => {
		setUpdate((prev) => ({
			...prev,
			uuid: null,
			quantity: 0,
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
				uuid: update?.uuid,
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
			title={`Update ${update?.material_name} Issue`}
			isSmall={true}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			{selectedMaterial && (
				<div className='mb-4 grid grid-cols-1 gap-1 rounded border p-2 text-sm text-gray-500 md:grid-cols-2'>
					<p>
						<strong>Material:</strong>{' '}
						{selectedMaterial.material_name}
					</p>
					<p>
						<strong>Article:</strong>{' '}
						{selectedMaterial.article_name}
					</p>
					<p>
						<strong>Buyer:</strong>{' '}
						{selectedMaterial.buyer_name ?? '—'}
					</p>
					<p>
						<strong>Category:</strong>{' '}
						{selectedMaterial.category_name}
					</p>
					<p>
						<strong>Unit:</strong> {selectedMaterial.unit_name}
					</p>
					<p>
						<strong>Color:</strong> {selectedMaterial.color_name}
					</p>
					<p>
						<strong>Size:</strong> {selectedMaterial.size_name}
					</p>
				</div>
			)}
			<FormField label='material_uuid' title='Stock ID' errors={errors}>
				<Controller
					name={'material_uuid'}
					control={control}
					render={({ field: { onChange, value } }) => {
						return (
							<ReactSelect
								title='Material'
								placeholder='Select Stock ID'
								options={stockMaterials}
								value={stockMaterials?.filter(
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
				label='quantity'
				sub_label={`Max: ${
					selectedMaterial?.value === update?.material_uuid
						? (selectedMaterial?.max_quantity ?? 0) +
							(update?.quantity ?? 0)
						: (selectedMaterial?.max_quantity ?? 0)
				}`}
				{...{ register, errors }}
			/>
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
