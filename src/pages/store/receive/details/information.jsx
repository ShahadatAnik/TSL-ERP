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
	} = purchase;

	const renderItems = () => {
		const items = [
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
				value: is_import == 1 ? 'Import' : 'Local',
			},
			...(is_import == 1
				? [
						{
							label: 'LC Number',
							value: lc_number,
						},
					]
				: [
						{
							label: 'Commercial Invoice Number',
							value: commercial_invoice_number,
						},
						{
							label: 'Commercial Invoice Value',
							value: commercial_invoice_value,
						},
					]),
			{
				label: 'Conversion Rate',
				value: convention_rate,
			},

			{
				label: 'Created By',
				value: created_by_name,
			},
			{
				label: 'Created At',
				value: created_at
					? format(new Date(created_at), 'dd/MM/yyyy')
					: null,
			},
			{
				label: 'Updated At',
				value: updated_at
					? format(new Date(updated_at), 'dd/MM/yyyy')
					: null,
			},
			{
				label: 'Remarks',
				value: remarks,
			},
		];
		return items;
	};

	return (
		<SectionContainer title={'Information'}>
			<RenderTable items={renderItems()} />
		</SectionContainer>
	);
}