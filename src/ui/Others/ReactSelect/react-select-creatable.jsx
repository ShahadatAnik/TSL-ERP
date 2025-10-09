import React from 'react';
import Creatable from 'react-select/creatable';

import cn from '@/lib/cn';

import { ButtonComponents } from './buttons';
import { classNames, styles } from './utils';

const ReactSelectCreatable = ({ className, ...props }) => {
	return (
		<Creatable
			unstyled
			classNamePrefix={'react-select-'}
			classNames={{
				...classNames,

				control: ({ isFocused, isDisabled }) =>
					cn(
						classNames.control({ isDisabled, isFocused }),
						className
					),
			}}
			styles={styles}
			components={ButtonComponents}
			closeMenuOnSelect={!props.isMulti}
			hideSelectedOptions
			maxMenuHeight={150}
			placeholder={props.placeholder}
			options={props.options}
			isDisabled={props.isDisabled}
			{...props}
		/>
	);
};

export default ReactSelectCreatable;
