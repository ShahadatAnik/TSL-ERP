import createGlobalState from '.';
import { storeQK } from './query-keys';

// * Buyer
export const useStoreBuyer = () =>
	createGlobalState({
		queryKey: storeQK.buyer(),
		url: '',
	});

export const useStoreBuyerByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.buyerByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});

// * Article
export const useStoreArticle = () =>
	createGlobalState({
		queryKey: storeQK.article(),
		url: '',
	});

export const useStoreArticleByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.articleByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});

// * Category
export const useStoreCategory = () =>
	createGlobalState({
		queryKey: storeQK.category(),
		url: '',
	});

export const useStoreCategoryByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.categoryByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});

// * LC
export const useStoreLC = () =>
	createGlobalState({
		queryKey: storeQK.lc(),
		url: '',
	});

export const useStoreLCByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.lcByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});

// * Vendor
export const useStoreVendor = () =>
	createGlobalState({
		queryKey: storeQK.vendor(),
		url: '',
	});

export const useStoreVendorByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.vendorByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});
// * stock
export const useStoreStock = () =>
	createGlobalState({
		queryKey: storeQK.stock(),
		url: '',
	});

export const useStoreStockByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.stockByUUID(uuid),
		url: '',
		enabled: !!uuid,
	});
