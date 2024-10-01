import createGlobalState from '.';
import {} from './query-keys';

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
