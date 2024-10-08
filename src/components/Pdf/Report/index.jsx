import {
	DEFAULT_FONT_SIZE,
	tableLayoutStyle,
	xMargin,
} from '@/components/Pdf/ui';
import { DEFAULT_A4_PAGE, getTable, TableHeader } from '@/components/Pdf/utils';

import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';

const node = [
	getTable('material_name', 'Material Name'),
	getTable('opening_quantity', 'Opening Quantity', 'right'),
	getTable('opening_quantity_total_price', 'Opening Quantity Total Price'),
	getTable('opening_quantity_rate', 'Opening Quantity Rate'),
	getTable('purchased_quantity', 'Purchased Quantity', 'right'),
	getTable(
		'purchased_quantity_total_price',
		'Purchased Quantity Total Price'
	),
	getTable('purchased_quantity_rate', 'Purchased Quantity Rate'),
	getTable('sub_total_quantity', 'Sub Total Quantity', 'right'),
	getTable(
		'sub_total_quantity_total_price',
		'Sub Total Quantity Total Price'
	),
	getTable('sub_total_quantity_rate', 'Sub Total Quantity Rate'),
	getTable('consumption_quantity', 'Consumption Quantity', 'right'),
	getTable(
		'consumption_quantity_total_price',
		'Consumption Quantity Total Price'
	),
	getTable('consumption_quantity_rate', 'Consumption Quantity Rate'),
	getTable('closing_quantity', 'Closing Quantity', 'right'),
	getTable('closing_quantity_total_price', 'Closing Quantity Total Price'),
	getTable('closing_quantity_rate', 'Closing Quantity Rate'),
];

export default function Index(data) {
	const headerHeight = 170;
	let footerHeight = 50;

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),
		pageOrientation: 'landscape',

		// * Page Header
		header: {
			table: getPageHeader(data),
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},
		// * Page Footer
		footer: (currentPage, pageCount) => ({
			table: getPageFooter({
				currentPage,
				pageCount,
			}),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE - 2,
		}),

		// * Main Table
		content: [
			{
				table: {
					headerRows: 1,
					widths: [
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
						40,
					],
					body: [
						// * Header
						TableHeader(node),

						// * Body
						...data?.map((item) =>
							node.map((nodeItem) => ({
								text: item[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
					],
				},
				// layout: 'lightHorizontalLines',
				layout: tableLayoutStyle,
			},
		],
	});

	return pdfDocGenerator;
}
