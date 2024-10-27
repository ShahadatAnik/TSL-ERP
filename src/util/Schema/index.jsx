import * as yup from 'yup';

import {
	BOOLEAN, // default
	BOOLEAN_DEFAULT_VALUE, // default
	BOOLEAN_REQUIRED, // default
	DATE_REQUIRED,
	EMAIL, // default
	EMAIL_REQUIRED, // default
	FORTUNE_ZIP_EMAIL_PATTERN, // default
	JSON_STRING, // default
	JSON_STRING_REQUIRED, // default
	NAME,
	NAME_REQUIRED, // default
	NUMBER, // default
	NUMBER_DOUBLE, // default
	NUMBER_DOUBLE_REQUIRED, // default
	NUMBER_REQUIRED, // default
	ORDER_NUMBER, // default
	ORDER_NUMBER_NOT_REQUIRED, // default
	PASSWORD, // default
	PHONE_NUMBER, // default
	PHONE_NUMBER_REQUIRED, // default
	STRING, // default
	STRING_REQUIRED, // default
	URL, // default
	URL_REQUIRED, // default
	UUID, // default
	UUID_FK, // default
	UUID_PK, // default
	UUID_REQUIRED,
} from './utils';

export {
	BOOLEAN,
	BOOLEAN_REQUIRED,
	EMAIL,
	EMAIL_REQUIRED,
	FORTUNE_ZIP_EMAIL_PATTERN,
	JSON_STRING,
	JSON_STRING_REQUIRED,
	NUMBER,
	NUMBER_DOUBLE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	ORDER_NUMBER,
	ORDER_NUMBER_NOT_REQUIRED,
	PASSWORD,
	PHONE_NUMBER,
	PHONE_NUMBER_REQUIRED,
	STRING,
	STRING_REQUIRED,
};

// Login
export const LOGIN_SCHEMA = {
	email: FORTUNE_ZIP_EMAIL_PATTERN,
	pass: PASSWORD,
};

export const LOGIN_NULL = {
	email: '',
	pass: '',
};

//* User
export const USER_SCHEMA = {
	name: STRING_REQUIRED,
	email: FORTUNE_ZIP_EMAIL_PATTERN,
	department_uuid: STRING_REQUIRED,
	designation_uuid: STRING_REQUIRED,
	// pass: PASSWORD,
	// repeatPass: yup
	// 	.string()
	// 	.min(4, "Password length should be at least 4 characters")
	// 	.max(12, "Password cannot exceed more than 12 characters")
	// 	.oneOf([yup.ref("pass")], "Passwords do not match"),
	ext: STRING.nullable(),
	phone: PHONE_NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};

export const USER_NULL = {
	uuid: null,
	name: '',
	email: '',
	department_uuid: null,
	designation_uuid: null,
	pass: '',
	repeatPass: '',
	ext: '',
	phone: '',
	remarks: '',
};

// * User -> Department
export const USER_DEPARTMENT_SCHEMA = {
	department: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const USER_DEPARTMENT_NULL = {
	uuid: null,
	department: '',
	remarks: null,
};

// * User -> Designation
export const USER_DESIGNATION_SCHEMA = {
	designation: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const USER_DESIGNATION_NULL = {
	uuid: null,
	designation: '',
	remarks: null,
};

//* Reset Password
export const RESET_PASSWORD_SCHEMA = {
	pass: PASSWORD,
	repeatPass: PASSWORD.oneOf([yup.ref('pass')], 'Passwords do not match'),
};

export const RESET_PASSWORD_NULL = {
	pass: '',
	repeatPass: '',
};

//* STORE//

//* Store -> Vendor
export const VENDOR_SCHEMA = {
	name: STRING_REQUIRED,
	person: STRING,
	phone: PHONE_NUMBER.nullable(),
	address: STRING,
	remarks: STRING.nullable(),
};
export const VENDOR_NULL = {
	uuid: null,
	name: '',
	person: '',
	phone: null,
	address: '',
	remarks: null,
};
//*Store -> Article
export const ARTICLE_SCHEMA = {
	name: NAME_REQUIRED,
	buyer_uuid: STRING_REQUIRED,
	remarks: STRING.nullable(),
};
export const ARTICLE_NULL = {
	uuid: null,
	buyer_uuid: null,
	name: '',
	remarks: null,
};

//* Store -> LC
export const LC_SCHEMA = {
	master_lc_uuid: STRING_REQUIRED,
	number: STRING_REQUIRED,
	value: NUMBER_DOUBLE_REQUIRED,
	unit: STRING_REQUIRED,
	date: DATE_REQUIRED,
	lien_bank: STRING_REQUIRED,
	remarks: STRING.nullable(),
};
export const LC_NULL = {
	uuid: null,
	master_lc_uuid: null,
	number: '',
	value: 0.0,
	unit: '',
	date: null,
	lien_bank: '',
	remarks: null,
};
//* Store -> Master LC
export const MASTER_LC_SCHEMA = {
	number: STRING_REQUIRED,
	value: NUMBER_DOUBLE_REQUIRED,
	unit: STRING_REQUIRED,
	date: DATE_REQUIRED,
	lien_bank: STRING_REQUIRED,
	payment_terms: NUMBER.nullable(),
	remarks: STRING.nullable(),
};
export const MASTER_LC_NULL = {
	uuid: null,
	number: '',
	value: null,
	date: null,
	lien_bank: '',
	payment_terms: 0,
	remarks: null,
};
//* Store -> Category
export const CATEGORY_SCHEMA = {
	name: NAME_REQUIRED,
	remarks: STRING.nullable(),
};
export const CATEGORY_NULL = {
	uuid: null,
	name: '',
	remarks: null,
};

//* Store -> Buyer
export const BUYER_SCHEMA = {
	name: NAME_REQUIRED,
	remarks: STRING.nullable(),
};
export const BUYER_NULL = {
	uuid: null,
	name: '',
	remarks: null,
};

//* Store -> Stock
export const STOCK_SCHEMA = {
	article_uuid: STRING_REQUIRED,
	category_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	color: STRING.nullable(),
	unit: STRING_REQUIRED,
	remarks: STRING.nullable(),
};
export const STOCK_NULL = {
	uuid: null,
	article_uuid: null,
	category_uuid: null,
	name: '',
	color: '',
	quantity: 0.0,
	remarks: null,
};
//* Store -> Issue
export const ISSUE_SCHEMA = {
	quantity: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};
export const ISSUE_NULL = {
	uuid: null,
	quantity: null,
	remarks: null,
};
//* Store -> Receive
export const RECEIVE_SCHEMA = {
	vendor_uuid: STRING.nullable(),
	is_import: NUMBER_REQUIRED,
	lc_uuid: STRING.nullable(),
	commercial_invoice_number: STRING.nullable(),
	commercial_invoice_value: NUMBER_DOUBLE.nullable(),
	convention_rate: NUMBER_DOUBLE_REQUIRED.default(1),
	remarks: STRING.nullable(),

	receive_entry: yup.array().of(
		yup.object().shape({
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED,
			price: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};
export const RECEIVE_NULL = {
	uuid: null,
	vendor_uuid: null,
	lc_uuid: null,
	is_import: 0,
	commercial_invoice_number: '',
	commercial_invoice_value: 0.0,
	convention_rate: 1,
	remarks: null,
	receive_entry: [
		{
			material_uuid: null,
			quantity: null,
			price: 0.0,
			remarks: null,
		},
	],
};
// * Store -> Receive Entry
export const RECEIVE_ENTRY_SCHEMA = {
	material_uuid: STRING_REQUIRED,
	quantity: NUMBER_REQUIRED,
	price: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};
export const RECEIVE_ENTRY_NULL = {
	uuid: null,
	material_uuid: null,
	quantity: null,
	price: 0.0,
	remarks: null,
};

//* Store -> Report
export const REPORT_SCHEMA = {
	start_date: yup.date().nullable(),
	end_date: yup.date().nullable(),
};
export const REPORT_NULL = {
	start_date: null,
	end_date: null,
};
