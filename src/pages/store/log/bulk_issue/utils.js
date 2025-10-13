export const transformBulkIssueDataWithValidation = (issueData) => {
	const transformedData = {
		serial_no: String(issueData.serial_no),
		section: String(issueData.section),
		issue_date: String(issueData.issue_date),
		remarks: issueData.remarks ? String(issueData.remarks) : null,
		bulk_entry: (issueData.bulk_entry || []).map((entry, index) => {
			// Validate required fields for each entry
			const material = entry.material_uuid || entry.material_name;

			const issueQuantity = entry.quantity;

			return {
				uuid: entry.uuid || undefined,
				material: String(entry.material_name),
				article: entry.article_name ? String(entry.article_name) : null,
				category: entry.category_name
					? String(entry.category_name)
					: null,
				color: entry.color_name ? String(entry.color_name) : null,
				size: entry.size_name ? String(entry.size_name) : null,
				unit:
					entry.unit_name || entry.unit_uuid
						? String(entry.unit_name || entry.unit_uuid)
						: null,
				stock_quantity: entry.store_quantity
					? Number(entry.store_quantity)
					: null,
				issue_quantity: Number(issueQuantity), // Key transformation
			};
		}),
	};

	return transformedData;
};
