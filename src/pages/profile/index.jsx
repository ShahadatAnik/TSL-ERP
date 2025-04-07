import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { useAdminUsersByUUID } from '@/state/hr';

import Information from './information';

export default function Index() {
	const { user } = useAuth();

	const { data, isLoading, invalidateQuery } = useAdminUsersByUUID(
		user?.uuid
	);

	useEffect(() => {
		invalidateQuery();
		document.title = `Profile: ${data?.name}`;
	}, [user?.uuid]);

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className='space-y-2'>
			<Information data={data} />
		</div>
	);
}
