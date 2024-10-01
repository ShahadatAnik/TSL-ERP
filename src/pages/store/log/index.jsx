import { useEffect } from 'react';

export default function Index() {
	useEffect(() => {
		document.title = 'Dyeing and Iron Log';
	}, []);
	return (
		<div>
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			{/* <RMOrderAgainstLog /> */}
		</div>
	);
}
