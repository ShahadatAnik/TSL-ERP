/**
 *? Effective React Query Keys
 ** https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 ** https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories
 **/
export const adminQK = {
	all: () => ['admin'],

	// departments
	departments: () => [...adminQK.all(), 'departments'],
	department: (uuid) => [...adminQK.departments(), uuid],

	// designation
	designations: () => [...adminQK.all(), 'designations'],
	designation: (uuid) => [...adminQK.designations(), uuid],

	// users
	users: () => [...adminQK.all(), 'users'],
	user: (uuid) => [...adminQK.users(), uuid],
};

export const storeQK = {

	//* Stock
	store: () => ['store'],
	
	stock: () => [...storeQK.store(), 'stock'],
	stockByUUID: (uuid) => [...storeQK.stock(), uuid],

	//* Article
	article: () => [...storeQK.store(), 'article'],
	articleByUUID: (uuid) => [...storeQK.article(), uuid],

	//* Category
	category: () => [...storeQK.store(), 'category'],
	categoryByUUID: (uuid) => [...storeQK.category(), uuid],

	//* LC
	lc: () => [...storeQK.store(), 'lc'],
	lcByUUID: (uuid) => [...storeQK.lc(), uuid],

	//* Buyer
	buyer: () => [...storeQK.store(), 'buyer'],
	buyerByUUID: (uuid) => [...storeQK.buyer(), uuid],

	//* Vendor
	vendor: () => [...storeQK.store(), 'vendor'],
	vendorByUUID: (uuid) => [...storeQK.vendor(), uuid],


};
