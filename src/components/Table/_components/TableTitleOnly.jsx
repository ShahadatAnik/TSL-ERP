import { Plus } from '@/assets/icons';

import cn from '@/lib/cn';

const TableTitleOnly = ({ title, subtitle, handelAppend, extraButton }) => {
	return (
		<div
			className={cn(
				'mb-0 flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-secondary/30 bg-primary px-4 py-3 md:justify-start'
			)}>
			<div className='flex w-full'>
				<div className='flex flex-col'>
					<h2
						className={cn(
							'text-sm font-semibold capitalize leading-tight text-primary-content md:text-lg'
						)}>
						{title}
					</h2>
					{subtitle && (
						<p className='-mt-1 text-[0.8rem] capitalize text-secondary-content'>
							{subtitle}
						</p>
					)}
				</div>
				<div className='flex flex-1 justify-end justify-items-center gap-4'>
					{extraButton && extraButton}
					{handelAppend && (
						<button
							type='button'
							className='btn btn-accent btn-xs rounded'
							onClick={handelAppend}>
							<Plus className='w-5' /> NEW
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableTitleOnly;
