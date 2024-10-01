import { useAdminUsers } from '@/state/hr';
import * as yup from 'yup';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, PasswordInput, ReactSelect, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import GetDateTime from '@/util/GetDateTime';
import { PASSWORD, USER_NULL, USER_SCHEMA } from '@/util/schema';

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
	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(schema, USER_NULL);

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

	const { value: department } = useFetch('/other/department/value/label');
	const { value: designation } = useFetch('/other/designation/value/label');

	return (
		<AddModal
			id={modalId}
			title={updateUser?.uuid !== null ? 'Update User' : 'New User'}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<div className='flex flex-col gap-2 md:flex-row'>
				<FormField
					label='department_uuid'
					title='Department'
					errors={errors}>
					<Controller
						name={'department_uuid'}
						control={control}
						render={({ field: { onChange } }) => {
							return (
								<ReactSelect
									placeholder='Select Department'
									options={department}
									value={department?.find(
										(item) =>
											item.value ==
											getValues('department_uuid')
									)}
									onChange={(e) => onChange(e.value)}
								/>
							);
						}}
					/>
				</FormField>
				<FormField
					label='designation_uuid'
					title='Designation'
					errors={errors}>
					<Controller
						name={'designation_uuid'}
						control={control}
						render={({ field: { onChange } }) => (
							<ReactSelect
								placeholder='Select Designation'
								options={designation}
								value={designation?.find(
									(item) =>
										item.value ==
										getValues('designation_uuid')
								)}
								onChange={(e) => onChange(e.value)}
							/>
						)}
					/>
				</FormField>
				<Input label='name' {...{ register, errors }} />
				<Input label='email' {...{ register, errors }} />
			</div>
			<div className='mb-4 flex flex-col gap-2 md:flex-row'>
				<Input label='ext' {...{ register, errors }} />
				<Input label='phone' {...{ register, errors }} />
				<Textarea label='remarks' {...{ register, errors }} />
			</div>

			{updateUser?.uuid === null && (
				<div className='mb-4 flex flex-col gap-2 md:flex-row'>
					<PasswordInput
						title='Password'
						label='pass'
						{...{ register, errors }}
					/>
					<PasswordInput
						title='Repeat Password'
						label='repeatPass'
						{...{ register, errors }}
					/>
				</div>
			)}
		</AddModal>
	);
}
