import { useAuth } from '@/context/auth';
import { useStoreIssue, useStoreStock } from '@/state/store';
import { useFetch, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { JoinInput, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import { DevTool } from '@lib/react-hook-devtool';
import GetDateTime from '@/util/GetDateTime';
import { ISSUE_NULL, ISSUE_SCHEMA } from '@/util/Schema';

export default function Index({
	modalId = '',
	updateIssue = {
		uuid: null,
		quantity: null,
	},
	setUpdateIssue,
}) {
	const { user } = useAuth();
	const { url, postData } = useStoreIssue();
	const { invalidateQuery: invalidateStock } = useStoreStock();
	const schema = {
		...ISSUE_SCHEMA,
		quantity: ISSUE_SCHEMA.quantity.max(
			updateIssue?.quantity,
			`Quantity cannot be greater than ${updateIssue?.quantity}`
		),
	};
	const { register, handleSubmit, errors, reset, control, context } = useRHF(
		schema,
		ISSUE_NULL
	);

	const onClose = () => {
		setUpdateIssue((prev) => ({
			...prev,
			uuid: null,
			quantity: 0,
		}));
		reset(ISSUE_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Add Item
		const updatedData = {
			...data,
			uuid: nanoid(),
			material_uuid: updateIssue?.material_uuid,
			created_at: GetDateTime(),
			created_by: user?.uuid,
		};
		await postData.mutateAsync({
			url,
			newData: [updatedData],
			onClose,
		});
		invalidateStock();
	};

	return (
		<AddModal
			id={modalId}
			title={`Issue: ${updateIssue?.name}`}
			isSmall={true}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}>
			<JoinInput
				title='quantity'
				label={`quantity`}
				sub_label={`Max: ${updateIssue?.quantity}`}
				unit={updateIssue?.unit}
				{...{ register, errors }}
			/>
			<Textarea label='remarks' rows={2} {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
