import createGlobalState from '@/state';

import { adminQK } from './query-keys';

// * User
export const useAdminUsers = () =>
	createGlobalState({
		queryKey: adminQK.users(),
		url: '/hr/user',
	});

// * Department
export const useAdminDepartments = () =>
	createGlobalState({
		queryKey: adminQK.departments(),
		url: '/hr/department',
	});

export const useAdminDesignationByUUID = (uuid) =>
	createGlobalState({
		queryKey: adminQK.designation(uuid),
		url: `/hr/designation/${uuid}`,
	});

// * Designation
export const useAdminDesignations = () =>
	createGlobalState({
		queryKey: adminQK.designations(),
		url: '/hr/designation',
	});

export const useAdminDepartmentsByUUID = (uuid) =>
	createGlobalState({
		queryKey: adminQK.department(uuid),
		url: `/hr/department/${uuid}`,
	});
