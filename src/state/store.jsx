import createGlobalState from '.';
import { storeQK } from './query-keys';

// * Buyer
export const useStoreBuyer = () =>
	createGlobalState({
		queryKey: storeQK.buyer(),
		url: '/public/buyer',
	});

export const useStoreBuyerByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.buyerByUUID(uuid),
		url: `/public/buyer/${uuid}`,
		//enabled: !!uuid,
	});

// * Article
export const useStoreArticle = () =>
	createGlobalState({
		queryKey: storeQK.article(),
		url: 'public/article',
	});

export const useStoreArticleByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.articleByUUID(uuid),
		url: `/public/article/${uuid}`,
		//enabled: !!uuid,
	});

// * Category
export const useStoreCategory = () =>
	createGlobalState({
		queryKey: storeQK.category(),
		url: `/public/category`,
	});

export const useStoreCategoryByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.categoryByUUID(uuid),
		url: `/public/category/${uuid}`,
		//enabled: !!uuid,
	});
// * Color
export const useStoreColor = () =>
	createGlobalState({
		queryKey: storeQK.color(),
		url: `/public/category`,
	});

export const useStoreColorByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.colorByUUID(uuid),
		url: `/public/category/${uuid}`,
		//enabled: !!uuid,
	});

// * Unit
export const useStoreUnit = () =>
	createGlobalState({
		queryKey: storeQK.unit(),
		url: `/public/category`,
	});

export const useStoreUnitByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.unitByUUID(uuid),
		url: `/public/category/${uuid}`,
		//enabled: !!uuid,
	});

// * Size
export const useStoreSize = () =>
	createGlobalState({
		queryKey: storeQK.size(),
		url: `/public/category`,
	});

export const useStoreSizeByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.sizeByUUID(uuid),
		url: `/public/category/${uuid}`,
		//enabled: !!uuid,
	});

// * Material
export const useStoreMaterial = () =>
	createGlobalState({
		queryKey: storeQK.material(),
		url: `/public/category`,
	});

export const useStoreMaterialByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.materialByUUID(uuid),
		url: `/public/category/${uuid}`,
		//enabled: !!uuid,
	});

// * LC
export const useStoreLC = () =>
	createGlobalState({
		queryKey: storeQK.lc(),
		url: '/commercial/lc',
	});

export const useStoreLCByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.lcByUUID(uuid),
		url: `/commercial/lc/${uuid}`,
		//enabled: !!uuid,
	});
// *Master LC
export const useStoreMasterLC = () =>
	createGlobalState({
		queryKey: storeQK.masterLC(),
		url: '/commercial/master-lc',
	});

export const useStoreMasterLCByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.masterLCByUUID(uuid),
		url: `/commercial/master-lc/${uuid}`,
		//enabled: !!uuid,
	});

// * Vendor
export const useStoreVendor = () =>
	createGlobalState({
		queryKey: storeQK.vendor(),
		url: '/store/vendor',
	});

export const useStoreVendorByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.vendorByUUID(uuid),
		url: `/store/vendor/${uuid}`,
		//enabled: !!uuid,
	});
// * stock
export const useStoreStock = () =>
	createGlobalState({
		queryKey: storeQK.stock(),
		url: `/store/material`,
	});

export const useStoreStockByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.stockByUUID(uuid),
		url: `/store/material/${uuid}`,
		//enabled: !!uuid,
	});

// * Issue
export const useStoreIssue = () =>
	createGlobalState({
		queryKey: storeQK.issue(),
		url: `/store/issue`,
	});

export const useStoreIssueByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.issueByUUID(uuid),
		url: `/store/issue/${uuid}`,
		//enabled: !!uuid,
	});
// * Receive
export const useStoreReceive = () =>
	createGlobalState({
		queryKey: storeQK.receive(),
		url: `/store/receive`,
	});

export const useStoreReceiveByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.receiveByUUID(uuid),
		url: `/store/receive/${uuid}`,
		//enabled: !!uuid,
	});

export const useStoreReceiveEntry = () =>
	createGlobalState({
		queryKey: storeQK.receiveEntry(),
		url: `/store/receive-entry`,
	});

export const useStoreReceiveEntryByUUID = (uuid) =>
	createGlobalState({
		queryKey: storeQK.receiveEntryByUUID(uuid),
		url: `/store/receive-entry/${uuid}`,
		//enabled: !!uuid,
	});
