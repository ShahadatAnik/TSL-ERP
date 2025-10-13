import { format } from 'date-fns';



import SectionContainer from '@/ui/Others/SectionContainer';
import RenderTable from '@/ui/Others/Table/RenderTable';





export default function Information({
	purchase = {
		uuid: null,
		purchase_id: null,
		vendor_uuid: null,
		sl_number: null,
		section: null,
		date: null,
		convention_rate: null,
		is_import: null,
		lc_number: null,
		created_by: null,
		created_by_name: null,
		created_at: null,
		updated_at: null,
		remarks: null,
	},
}) {
	const {
		serial_no,
		section,
		issue_date,
		remarks,
		created_by_name,
		created_at,
		updated_at,
	} = purchase;

	const renderItems = [
		{
			label: 'SL Number',
			value: serial_no,
		},

		{
			label: 'Section',
			value: section,
		},
		{
			label: 'Date',
			value: format(issue_date, 'dd MMM, yyyy'),
		},
	];

	const renderItems2 = [
		{
			label: 'Created By',
			value: created_by_name,
		},
		{
			label: 'Created',
			value: created_at
				? format(new Date(created_at), 'dd/MM/yyyy')
				: null,
		},
		{
			label: 'Updated',
			value: updated_at
				? format(new Date(updated_at), 'dd/MM/yyyy')
				: null,
		},
		{
			label: 'Remarks',
			value: remarks,
		},
	];

	return (
		<SectionContainer
			title={'Information'}
			contentClassName='flex flex-col md:flex-row gap-2'>
			<RenderTable items={renderItems} className='md:w-1/2' />
			<RenderTable items={renderItems2} className='md:w-1/2' />
		</SectionContainer>
	);
}