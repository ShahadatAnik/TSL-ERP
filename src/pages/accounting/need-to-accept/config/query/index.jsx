import createGlobalState from '@/state';

import { accQK } from './query-keys';

//* Accounting Ledger
export const useAccNeedToAccept = () =>
	createGlobalState({
		queryKey: accQK.needToAccept(),
		url: '/store/receive-with-entry',
	});
