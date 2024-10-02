import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks';

import Information from './Information';
import Table from './Table';

export default function Index() {
	const { purchase_description_uuid } = useParams();

	const { value: data, loading } = useFetch(
		`/store/receive-entry-details/by/${purchase_description_uuid}`,
		[purchase_description_uuid]
	);

	useEffect(() => {
		document.title = 'Purchase Details';
	}, []);

	if (loading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className={'space-y-8'}>
			<Information purchase={data} />
			<Table {...data} />
		</div>
	);
}
