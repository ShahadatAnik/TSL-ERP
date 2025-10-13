import ReactTable from '@/components/Table';

const ReactTableTitleOnly = ({
	title,
	data,
	columns,
	children,
	handelAppend,
	pageSize,
	extraButton,
}) => {
	return (
		<ReactTable
			title={title}
			containerClassName='mb-0 rounded-t-none'
			data={data}
			columns={columns}
			handelAppend={handelAppend}
			pageSize={pageSize}
			extraButton={extraButton}
			showTitleOnly>
			{children}
		</ReactTable>
	);
};

export default ReactTableTitleOnly;
