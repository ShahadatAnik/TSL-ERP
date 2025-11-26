import { startTransition, useState } from 'react';
import { Book, Grid3X3, List, Search, X } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { useDebounce } from 'use-debounce';

import { useChartOfAccounts } from '../report/config/query';
import TableView from './table-view';
import TreeView from './tree-view';
import TreeViewV2 from './tree-view-v2';

const ChartOfAccounts = () => {
	const [view, setView] = useState('tree');
	const [expandAll, setExpandAll] = useState(false);
	const [rawSearchTerm, setRawSearchTerm] = useState('');
	const [searchTerm] = useDebounce(rawSearchTerm, 300);
	const { data: accountData, isLoading } = useChartOfAccounts();
	const filterTreeData = (data, term) => {
		if (!term.trim() || view === 'table') return data;

		const filterNode = (node) => {
			const nodeMatches =
				matchSorter([node], term, {
					keys: ['name', 'account_type', 'account_tag'],
				}).length > 0;
			const matchingChildren = node.children
				? node.children.map(filterNode).filter(Boolean)
				: [];
			if (nodeMatches || matchingChildren.length > 0) {
				return {
					...node,
					children: matchingChildren,
				};
			}

			return null;
		};

		return data.map(filterNode).filter(Boolean);
	};

	const filteredData = filterTreeData(accountData || [], searchTerm);

	const clearSearch = () => {
		startTransition(() => {
			setRawSearchTerm('');
		});
	};

	return (
		<div className='w-full'>
			<div className='card bg-transparent'>
				<div className='card-body'>
					<h2 className='card-title flex items-center justify-center gap-2 text-2xl text-primary'>
						<Book className='h-8 w-6' />
						Chart of Accounts
					</h2>

					{/* Header */}
					<div className='mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
						<div className='relative flex-1'>
							<div className='flex'>
								<span className='bg-primary-foreground inline-flex items-center rounded-l-md border border-r-0 border-primary px-3 text-sm text-gray-900'>
									<Search className='h-4 w-4' />
								</span>
								<input
									type='text'
									className='block w-full flex-1 rounded-r-md border border-primary px-3 py-2 text-sm focus:border-primary focus:ring-primary'
									placeholder={
										view === 'table'
											? 'Search by type, head, group, or ledger...'
											: 'Search by name, type, or tag...'
									}
									value={rawSearchTerm}
									onChange={(e) =>
										startTransition(() => {
											setRawSearchTerm(e.target.value);
										})
									}
								/>
								{rawSearchTerm && (
									<button
										type='button'
										className='absolute right-2 top-1/2 -translate-y-1/2 transform text-error'
										onClick={clearSearch}>
										<X className='h-4 w-4' />
									</button>
								)}
							</div>
						</div>

						{/* View Controls */}
						<div className='flex flex-wrap gap-2'>
							<div className='btn-group'>
								<button
									type='button'
									className={`btn btn-sm mr-2 gap-2 ${
										view === 'tree'
											? 'btn-primary'
											: 'btn-outline'
									}`}
									onClick={() =>
										startTransition(() => {
											setView('tree');
										})
									}>
									<List className='h-4 w-4' />
									Tree View
								</button>
								<button
									type='button'
									className={`btn btn-sm mr-2 gap-2 ${
										view === 'treeV2'
											? 'btn-primary'
											: 'btn-outline'
									}`}
									onClick={() =>
										startTransition(() => {
											setView('treeV2');
										})
									}>
									<List className='h-4 w-4' />
									Tree View V2
								</button>
								<button
									type='button'
									className={`btn btn-sm gap-2 ${
										view === 'table'
											? 'btn-primary'
											: 'btn-outline'
									}`}
									onClick={() =>
										startTransition(() => {
											setView('table');
										})
									}>
									<Grid3X3 className='h-4 w-4' />
									Table View
								</button>
							</div>

							{/* Expand All Button */}
							<button
								type='button'
								className={`btn btn-sm ${
									expandAll ? 'btn-error' : 'btn-accent'
								}`}
								disabled={view === 'table'}
								onClick={() =>
									startTransition(() => {
										setExpandAll(!expandAll);
									})
								}>
								{expandAll ? 'Collapse All' : 'Expand All'}
							</button>
						</div>
					</div>

					<hr className='mb-4' />

					{/* Conditional Rendering of Views */}
					{view === 'tree' && (
						<TreeView
							expandAll={expandAll || !!searchTerm}
							accountData={filteredData}
						/>
					)}
					{view === 'treeV2' && (
						<TreeViewV2
							expandAll={expandAll || !!searchTerm}
							accountData={filteredData}
						/>
					)}
					{view === 'table' && <TableView searchTerm={searchTerm} />}
				</div>
			</div>
		</div>
	);
};

export default ChartOfAccounts;
