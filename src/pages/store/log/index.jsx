import { useEffect } from 'react';

import IssueLog from './issue';
import ReceiveLog from './receive';
import BulkIssueLog from './bulk_issue';

export default function Index() {
	useEffect(() => {
		document.title = 'Store Log';
	}, []);
	return (
		<div>
			<IssueLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<ReceiveLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<BulkIssueLog />
		</div>
	);
}
