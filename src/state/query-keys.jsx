/**
 *? Effective React Query Keys
 ** https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 ** https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories
 **/

//* Admin
export const adminQK = {
	all: () => ['admin'],

	//* departments
	departments: () => [...adminQK.all(), 'departments'],
	department: (uuid) => [...adminQK.departments(), uuid],

	//* designation
	designations: () => [...adminQK.all(), 'designations'],
	designation: (uuid) => [...adminQK.designations(), uuid],

	//* users
	users: () => [...adminQK.all(), 'users'],
	user: (uuid) => [...adminQK.users(), uuid],
	usersByUUID: (uuid) => [...adminQK.users(), uuid],
};

//* Store

export const storeQK = {
	//* Stock
	all: () => ['store'],

	stock: () => [...storeQK.all(), 'stock'],
	stockByUUID: (uuid) => [...storeQK.stock(), uuid],

	//* Issue
	issue: () => [...storeQK.all(), 'issue'],
	issueByUUID: (uuid) => [...storeQK.issue(), uuid],

	//* Article
	article: () => [...storeQK.all(), 'article'],
	articleByUUID: (uuid) => [...storeQK.article(), uuid],

	//* Category
	category: () => [...storeQK.all(), 'category'],
	categoryByUUID: (uuid) => [...storeQK.category(), uuid],

	//* Color
	color: () => [...storeQK.all(), 'color'],
	colorByUUID: (uuid) => [...storeQK.color(), uuid],

	//* Unit
	unit: () => [...storeQK.all(), 'unit'],
	unitByUUID: (uuid) => [...storeQK.unit(), uuid],

	//* Size
	size: () => [...storeQK.all(), 'size'],
	sizeByUUID: (uuid) => [...storeQK.size(), uuid],

	//* Material
	material: () => [...storeQK.all(), 'material'],
	materialByUUID: (uuid) => [...storeQK.material(), uuid],

	//* LC
	lc: () => [...storeQK.all(), 'lc'],
	lcByUUID: (uuid) => [...storeQK.lc(), uuid],

	//* Master LC
	masterLC: () => [...storeQK.all(), 'master-lc'],
	masterLCByUUID: (uuid) => [...storeQK.masterLC(), uuid],

	//* Buyer
	buyer: () => [...storeQK.all(), 'buyer'],
	buyerByUUID: (uuid) => [...storeQK.buyer(), uuid],

	//* Vendor
	vendor: () => [...storeQK.all(), 'vendor'],
	vendorByUUID: (uuid) => [...storeQK.vendor(), uuid],

	//* Receive
	receive: () => [...storeQK.all(), 'receive'],
	receiveByUUID: (uuid) => [...storeQK.receive(), uuid],

	//* Receive Entry
	receiveEntry: () => [...storeQK.all(), 'receive-entry'],
	receiveEntryByUUID: (uuid) => [...storeQK.receiveEntry(), uuid],
	receiveEntryByDetails: (uuid) => [
		...storeQK.receiveEntry(),
		'details',
		uuid,
	],
	bulkIssue: () => [...storeQK.all(), 'bulk-issue'],
	bulkDetails: (uuid) => [...storeQK.bulkIssue(), uuid],

	//* Stock Material Value Label
	stockMaterialValueLabel: () => [
		...storeQK.all(),
		'stock-material-value-label',
	],
};
//* Other
export const otherQK = {
	all: () => ['other'],

	//*Buyer Value Label
	buyerValueLabel: () => [...otherQK.all(), 'buyer-value-label'],

	//*Category Value Label
	categoryValueLabel: () => [...otherQK.all(), 'category-value-label'],
	//*Size Value Label
	sizeValueLabel: () => [...otherQK.all(), 'size-value-label'],
	//*Unit Value Label
	unitValueLabel: () => [...otherQK.all(), 'unit-value-label'],
	//*Color Value Label
	colorValueLabel: () => [...otherQK.all(), 'color-value-label'],

	//*Article Value Label
	articleValueLabel: () => [...otherQK.all(), 'article-value-label'],

	//*Vendor Value Label
	vendorValueLabel: () => [...otherQK.all(), 'vendor-value-label'],

	//*Material Value Label
	materialValueLabel: () => [...otherQK.all(), 'material-value-label'],

	//*LC Value Label
	lcValueLabel: () => [...otherQK.all(), 'lc-value-label'],
	//*Master LC Value Label
	masterLCValueLabel: () => [...otherQK.all(), 'master-lc-value-label'],
};
