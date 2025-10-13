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
	const sectionsOptions = [
		{ label: 'Cutting', value: 'cutting' },
		{ label: 'Sewing', value: 'sewing' },
		{ label: 'Lasting', value: 'lasting' },
		{ label: 'None', value: 'none' },
	];

	return (
		<SectionEntryBody title='Information'>
			<div className='flex flex-col gap-6 px-2 text-secondary-content md:flex-row'>
				<Input label='serial_no' {...{ register, errors }} />
				<FormField label='section' title='Section' errors={errors}>
					<Controller
						name={'section'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select'
									options={sectionsOptions}
									value={sectionsOptions?.filter(
										(item) =>
											item.value == getValues('section')
									)}
									onChange={(e) => {
										onChange(e.value);
									}}
								/>
							);
						}}
					/>
				</FormField>
				<FormField label='issue_date' title='Date' errors={errors}>
					<Controller
						name={'issue_date'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<DatePicker
									className='input input-secondary w-full rounded border-secondary/30 bg-base-100 px-2 text-sm text-primary transition-all duration-100 ease-in-out placeholder:text-sm placeholder:text-secondary/50 focus:border-secondary/30 focus:outline-secondary/30'
									placeholderText='Select Date'
									dateFormat='dd/MM/yyyy'
									selected={getValues('issue_date')}
									onChange={(date) => onChange(date)}
								/>
							);
						}}
					/>
				</FormField>
			</div>

			<div className='flex flex-col gap-6 px-2 text-secondary-content md:flex-row'>
				<Textarea label='remarks' {...{ register, errors }} />
			</div>
		</SectionEntryBody>
	);
}
