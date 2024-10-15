import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { useAccess, useFetch } from '@/hooks';

import Pdf from '@/components/Pdf/Report';
import ReactTable from '@/components/Table';
import { FormField, SectionEntryBody } from '@/ui';

import PageInfo from '@/util/PageInfo';

import { ReportColumns } from '../../columns';

const dateFormate = (date) => {
	if (date) {
		return format(date, 'yyyy-MM-dd');
	}
};

export default function Index() {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const info = new PageInfo(
		'Store/Report/Material',
		'',
		'store__report__material'
	);
	const haveAccess = useAccess('store__report__material');

	const [url, setUrl] = useState(null);

	const { value: data, loading } = useFetch(url, [url]);

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	useEffect(() => {
		if (startDate && endDate) {
			setUrl(
				`/report/store-material-report/${dateFormate(startDate)}/${dateFormate(
					endDate
				)}`
			);
		}
	}, [startDate, endDate]);

	// ! FOR TESTING
	// const [data2, setData] = useState('');

	// useEffect(() => {
	// 	if (data) {
	// 		Pdf(data)?.getDataUrl((dataUrl) => {
	// 			setData(dataUrl);
	// 		});
	// 	}
	// }, [data]);
	// ! FOR TESTING
	const columns = ReportColumns({ data });

	return (
		<div>
			{/* <iframe
				src={data2}
				className='h-[40rem] w-full rounded-md border-none'
			/> */}
			<SectionEntryBody title='Date'>
				<div className='flex flex-col gap-1 px-2 text-secondary-content md:flex-row'>
					<FormField label='start_date' title='From'>
						<DatePicker
							className='input input-secondary w-full rounded border-secondary/30 bg-base-100 px-2 text-sm text-primary transition-all duration-100 ease-in-out placeholder:text-sm placeholder:text-secondary/50 focus:border-secondary/30 focus:outline-secondary/30'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							placeholderText='Start Date'
							dateFormat='dd/MM/yy'
						/>
					</FormField>

					<FormField label='end_date' title='To'>
						<DatePicker
							className='input input-secondary w-full rounded border-secondary/30 bg-base-100 px-2 text-sm text-primary transition-all duration-100 ease-in-out placeholder:text-sm placeholder:text-secondary/50 focus:border-secondary/30 focus:outline-secondary/30'
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							minDate={startDate}
							placeholderText='End Date'
							dateFormat='dd/MM/yy'
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
