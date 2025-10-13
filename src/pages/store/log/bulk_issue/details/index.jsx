import { useEffect } from 'react';
import { useStoreBulkDetails } from '@/state/store';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks';

import Information from './information';
import Table from './table';
import { transformBulkIssueDataWithValidation } from '../utils';

export default function Index() {
	const { uuid } = useParams();
	const { data: bulkData,isLoading } = useStoreBulkDetails(uuid);

	useEffect(() => {
		document.title = 'Bulk Issue Details';
	}, []);

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className={'space-y-8'}>
			<Information
				purchase={bulkData}
			/>
			<Table {...bulkData} />
		</div>
	);
}
