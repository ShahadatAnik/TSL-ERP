import { useOtherLcValueLabel, useOtherVendorValueLabel } from '@/state/other';
import { set } from 'date-fns';
import DatePicker from 'react-datepicker';
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
	setValue,
}) {
	const { data: vendor } = useOtherVendorValueLabel();
	const { data: lc } = useOtherLcValueLabel();

	const purchaseOptions = [
		{ label: 'Import', value: 1 },
		{ label: 'Local', value: 0 },
		{ label: 'Loan', value: 2 },
	];

	return (
		<SectionEntryBody title='Information'>
			<div className='flex flex-col gap-6 px-2 text-secondary-content md:flex-row'>
				<FormField label='vendor_uuid' title='Vendor' errors={errors}>
					<Controller
						name={'vendor_uuid'}
						control={control}
						render={({ field: { onChange, value } }) => {
							const lcSelected = !!getValues('lc_uuid');
							return (
								<ReactSelect
									placeholder='Select Vendor'
									options={vendor}
									value={
										// lcSelected
										// 	? null
										// 	:
										vendor?.filter(
											(item) => item.value === value
										)
									}
									onChange={(e) => {
										onChange(e.value);
										// setValue('lc_uuid', null);
									}}
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
									value={purchaseOptions?.filter(
										(item) =>
											item.value == getValues('is_import')
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>

				<FormField label='lc_uuid' title='LC' errors={errors}>
					<Controller
						name={'lc_uuid'}
						control={control}
						render={({ field: { onChange, value } }) => {
							const vendorSelected = !!getValues('vendor_uuid');
							return (
								<ReactSelect
									placeholder='Select LC'
									options={lc}
									value={
										// vendorSelected
										// 	? null
										// 	:
										lc?.filter(
											(item) => item.value === value
										)
									}
									onChange={(e) => {
										onChange(e.value);
										// setValue('vendor_uuid', null);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<FormField label='inventory_date' title='Inventory Date' errors={errors}>
					<Controller
						name={'inventory_date'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<DatePicker
									className='input input-secondary w-full rounded border-secondary/30 bg-base-100 px-2 text-sm text-primary transition-all duration-100 ease-in-out placeholder:text-sm placeholder:text-secondary/50 focus:border-secondary/30 focus:outline-secondary/30'
									placeholderText='Select Date'
									dateFormat='dd/MM/yyyy'
									selected={getValues('inventory_date')}
									onChange={(date) => onChange(date)}
								/>
							);
						}}
					/>
				</FormField>
			</div>

			<div className='flex flex-col gap-6 px-2 text-secondary-content md:flex-row'>
				<>
					<Input
						label='commercial_invoice_number'
						{...{ register, errors }}
					/>
					<Input
						label='commercial_invoice_value'
						{...{ register, errors }}
					/>
				</>

				<JoinInput
					label='convention_rate'
					title='Conversion Rate'
					unit='BDT'
					{...{ register, errors }}
				/>
				<Textarea label='remarks' {...{ register, errors }} />
			</div>
		</SectionEntryBody>
	);
}
