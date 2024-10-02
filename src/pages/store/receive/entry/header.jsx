import { useOtherLcValueLabel, useOtherVendorValueLabel } from '@/state/other';
import { useParams } from 'react-router-dom';

import {
	FormField,
	Input,
	JoinInput,
	ReactSelect,
	SectionEntryBody,
	Textarea,
} from '@/ui';

export default function Header({
	register,
	errors,
	control,
	getValues,
	watch,
	Controller,
}) {
	const { purchase_description_uuid } = useParams();
	const { data: vendor } = useOtherVendorValueLabel();
	const { data: lc } = useOtherLcValueLabel();

	const purchaseOptions = [
		{ label: 'Import', value: 1 },
		{ label: 'Local', value: 0 },
	];

	return (
		<SectionEntryBody title='Information'>
			<div className='flex flex-col gap-6 px-2 text-secondary-content md:flex-row'>
				<FormField label='vendor_uuid' title='Vendor' errors={errors}>
					<Controller
						name={'vendor_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Vendor'
									options={vendor}
									value={vendor?.find(
										(item) =>
											item.value ==
											getValues('vendor_uuid')
									)}
									onChange={(e) => onChange(e.value)}
									isDisabled={
										purchase_description_uuid !== undefined
									}
								/>
							);
						}}
					/>
				</FormField>

				<FormField
					label='is_import'
					title='Import / Local'
					errors={errors}>
					<Controller
						name={'is_import'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select'
									options={purchaseOptions}
									value={purchaseOptions?.find(
										(item) =>
											item.value == getValues('is_import')
									)}
									onChange={(e) => onChange(e.value)}
								/>
							);
						}}
					/>
				</FormField>

				{watch('is_import') === 1 && (
					<FormField label='lc_uuid' title='LC' errors={errors}>
						<Controller
							name={'lc_uuid'}
							control={control}
							render={({ field: { onChange } }) => {
								return (
									<ReactSelect
										placeholder='Select LC'
										options={lc}
										value={lc?.find(
											(item) =>
												item.value ==
												getValues('lc_uuid')
										)}
										onChange={(e) => onChange(e.value)}
										isDisabled={watch('is_import') === 0}
									/>
								);
							}}
						/>
					</FormField>
				)}
				{watch('is_import') === 0 && (
					<>
						<Input
							label='commercial_invoice_number'
							{...{ register, errors }}
						/>
						<JoinInput
							label='commercial_invoice_value'
							unit='$'
							{...{ register, errors }}
						/>
					</>
				)}

				<JoinInput
					label='convention_rate'
					unit='BDT'
					{...{ register, errors }}
				/>
				<Textarea label='remarks' {...{ register, errors }} />
			</div>
		</SectionEntryBody>
	);
}
