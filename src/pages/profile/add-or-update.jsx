import { useAdminUsers } from '@/state/hr';
import * as yup from 'yup';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, PasswordInput, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import { PASSWORD, USER_NULL, USER_SCHEMA } from '@util/Schema';
import GetDateTime from '@/util/GetDateTime';

export default function Index({
	modalId = '',
	updateUser = { uuid: null, department: null },
	setUpdateUser,
}) {
	const { url, updateData, postData } = useAdminUsers();
	var schema = USER_SCHEMA;

	if (updateUser?.uuid == null) {
		schema = {
			...USER_SCHEMA,
			pass: PASSWORD,
			repeatPass: PASSWORD.oneOf(
				[yup.ref('pass')],
				'Passwords do not match'
			),
		};
	}
	const { register, handleSubmit, errors, reset, context } = useRHF(
		schema,
		USER_NULL
	);

	useFetchForRhfReset(
		`/hr/user/${updateUser?.uuid}`,
		updateUser?.uuid,
		reset
	);

	const onClose = () => {
		setUpdateUser((prev) => ({
			...prev,
			uuid: null,
			department: null,
		}));
		reset(USER_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// * Update item
		if (updateUser?.uuid !== null) {
			const updatedData = {
				...data,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `${url}/${updateUser?.uuid}`,
				uuid: updateUser?.uuid,
				updatedData,
				onClose,
			});

			return;
		}

		// * New item
		const updatedData = {
			...data,
			uuid: nanoid(),
			created_at: GetDateTime(),
		};

		await postData.mutateAsync({
			url,
			newData: updatedData,
			onClose,
		});
	};

	return (
		<AddModal
			id={modalId}
			title={updateUser?.uuid !== null ? 'Update User' : 'New User'}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<Input label='name' {...{ register, errors }} />
				<Input label='ext' {...{ register, errors }} />
				<Input label='phone' {...{ register, errors }} />
			</div>

			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<Textarea label='remarks' rows={3} {...{ register, errors }} />
			</div>
		</AddModal>
	);
}
