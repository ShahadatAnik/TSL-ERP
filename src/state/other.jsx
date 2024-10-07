import createGlobalState from '.';
import { otherQK } from './query-keys';

// GET OTHER HR USERS
export const useOtherHRUser = () =>
	createGlobalState({
		queryKey: otherQK.hrUser(),
		url: `/other/hr/user/value/label?designation=driver`,
	});

export const useOtherHRUserByDesignation = (designation) =>
	createGlobalState({
		queryKey: otherQK.hrUserByDesignation(designation),
		url: `/other/hr/user/value/label?designation=${designation}`,
		enabled: !!designation,
	});
//* GET BUYER VALUE LABEL
export const useOtherBuyerValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.buyerValueLabel(),
		url: '/other/buyer/value/label',
	});
//* GET CATEGORY VALUE LABEL
export const useOtherCategoryValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.categoryValueLabel(),
		url: '/other/category/value/label',
	});
//* GET ARTICLE VALUE LABEL
export const useOtherArticleValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.articleValueLabel(),
		url: '/other/article/value/label',
	});
//* GET VENDOR VALUE LABEL
export const useOtherVendorValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.vendorValueLabel(),
		url: '/other/vendor/value/label',
	});
//* GET MATERIAL VALUE LABEL
export const useOtherMaterialValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.materialValueLabel(),
		url: '/other/material/value/label',
	});
//* GET LC VALUE LABEL
export const useOtherLcValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.lcValueLabel(),
		url: '/other/lc/value/label',
	});
//* GET MASTER LC VALUE LABEL
export const useOtherMasterLcValueLabel = () =>
	createGlobalState({
		queryKey: otherQK.masterLCValueLabel(),
		url: '/other/master-lc/value/label',
	});
