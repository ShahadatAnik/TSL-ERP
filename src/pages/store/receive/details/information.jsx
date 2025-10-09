import { format } from 'date-fns';

import SectionContainer from '@/ui/Others/SectionContainer';
import RenderTable from '@/ui/Others/Table/RenderTable';

export default function Information({
	purchase = {
		uuid: null,
		purchase_id: null,
		vendor_uuid: null,
		vendor_name: null,
		commercial_invoice_number: null,
		commercial_invoice_value: null,
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
		vendor_name,
		commercial_invoice_number,
		commercial_invoice_value,
		is_import,
		lc_number,
		convention_rate,
		created_at,
		created_by_name,
		receive_id,
		remarks,
		updated_at,
		inventory_date,
	} = purchase;

	const renderItems = [
		{
			label: 'Invoice Number',
			value: receive_id,
		},

		{
			label: 'Vendor',
			value: vendor_name,
		},
		{
			label: 'Import/Local',
			value:
				is_import == 1 ? 'Import' : is_import == 2 ? 'Loan' : 'Local',
		},

		{
			label: 'LC Number',
			value: lc_number ? lc_number : null,
		},

		{
			label: 'Commercial Invoice Number',
			value: commercial_invoice_number ? commercial_invoice_number : null,
		},
		{
			label: 'Commercial Invoice Value',
			value: commercial_invoice_value ? commercial_invoice_value : null,
		},

		{
			label: 'Conversion Rate',
			value: convention_rate,
		},
	];

	const renderItems2 = [
		{
			label: 'Created By',
			value: created_by_name,
		},
		{
			label: 'Inventory Date',
			value:
				inventory_date !== '1970-01-01 06:00:00'
					? format(new Date(inventory_date), 'dd/MM/yyyy')
					: null,
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
