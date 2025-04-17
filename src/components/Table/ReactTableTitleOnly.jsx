import ReactTable from '@/components/Table';

const ReactTableTitleOnly = ({
	title,
	data,
	columns,
	children,
	handelAppend,
}) => {
	return (
		<ReactTable
			title={title}
			containerClassName='mb-0 rounded-t-none'
			data={data}
			columns={columns}
			handelAppend={handelAppend}
			showTitleOnly>
			{children}
		</ReactTable>
	);
};

export default ReactTableTitleOnly;
