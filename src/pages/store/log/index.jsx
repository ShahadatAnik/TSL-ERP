import { useEffect } from 'react';

export default function Index() {
	useEffect(() => {
		document.title = 'Store: Log';
	}, []);

	return <div className='flex flex-col gap-6'>hello</div>;
}
