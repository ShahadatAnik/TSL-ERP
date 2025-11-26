import createGlobalState from '@/state';

import { accQK } from './query-keys';

//* Accounting Head
export const useAccHead = () =>
	createGlobalState({
		queryKey: accQK.head(),
		url: '/acc/head',
	});

export const useAccHeadByUUID = (uuid) =>
	createGlobalState({
		queryKey: accQK.headByUUID(uuid),
		url: `/acc/head/${uuid}`,
		enabled: !!uuid,
	});
