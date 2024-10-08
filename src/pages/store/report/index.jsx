import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAccess, useFetch, useFetchFunc } from '@/hooks';

import Pdf from '@/components/Pdf/Report';
import ReactTable from '@/components/Table';
import {
	FormField,
	Input,
	JoinInputSelect,
	ReactSelect,
	SectionEntryBody,
	Textarea,
} from '@/ui';

import PageInfo from '@/util/PageInfo';

import { ReportColumns } from '../columns';

export default function Index() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const info = new PageInfo('Store/Report', '', 'store__report');
	const haveAccess = useAccess('store__report');

	const [url, setUrl] = useState(null);

	const { value: data, loading } = useFetch(url, [url]);

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	useEffect(() => {
		if (startDate && endDate) {
			const formattedStartDate = startDate.toISOString().split('T')[0];
			const formattedEndDate = endDate.toISOString().split('T')[0];
			setUrl(
				`/report/store-material-report/${formattedStartDate}/${formattedEndDate}`
			);
		}
	}, [startDate, endDate]);

	// ! FOR TESTING
	const [data2, setData] = useState('');

	useEffect(() => {
		if (data) {
			Pdf(data)?.getDataUrl((dataUrl) => {
				setData(dataUrl);
			});
		}
	}, [data]);
	// ! FOR TESTING
	const columns = ReportColumns({ data });

	return (
		<div>
			<iframe
				src={data2}
				className='h-[40rem] w-full rounded-md border-none'
			/>
			<SectionEntryBody title='Date'>
				<div className='flex flex-col gap-1 px-2 text-secondary-content md:flex-row'>
					<FormField label='start_date' title='From'>
						<DatePicker
							className='h-12 w-full rounded-md border bg-primary/5 px-2 text-primary'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							placeholderText='Start Date'
						/>
					</FormField>

					<FormField label='end_date' title='To'>
						<DatePicker
							className='h-12 w-full rounded-md border bg-primary/5 px-2 text-primary'
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							minDate={startDate}
							placeholderText='End Date'
						/>
					</FormField>
				</div>
			</SectionEntryBody>
			<ReactTable
				title={info.getTitle()}
				isLoading={loading}
				data={data || []}
				columns={columns}
			/>
		</div>
	);
}
