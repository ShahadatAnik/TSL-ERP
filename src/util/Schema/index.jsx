import * as yup from 'yup';

import {
	BOOLEAN, // default
	BOOLEAN_DEFAULT_VALUE, // default
	BOOLEAN_REQUIRED, // default
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

// Section
export const SECTION_SCHEMA = {
	name: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const SECTION_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

// Buyer
export const BUYER_SCHEMA = {
	name: NAME_REQUIRED,
	short_name: STRING.nullable(),
	remarks: STRING.nullable(),
};

export const BUYER_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

export const PARTY_SCHEMA = {
	name: STRING_REQUIRED,
	short_name: STRING.nullable(),
	address: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const PARTY_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	address: '',
	remarks: '',
};

// Merchandiser
export const MERCHANDISER_SCHEMA = {
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	email: EMAIL.nullable(),
	phone: PHONE_NUMBER.nullable().transform((value, originalValue) =>
		originalValue === '' ? null : value
	),
	address: STRING.nullable(),
	remarks: STRING.nullable(),
};

export const MERCHANDISER_NULL = {
	uuid: null,
	party_uuid: null,
	name: '',
	email: '',
	phone: '',
	address: '',
	remarks: '',
};

// Factory
// party_id	name	email	phone	address	created_at	updated_at
export const FACTORY_SCHEMA = {
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	phone: PHONE_NUMBER.nullable().transform((value, originalValue) =>
		originalValue === '' ? null : value
	),
	address: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const FACTORY_NULL = {
	uuid: null,
	party_uuid: null,
	name: '',
	phone: '',
	address: '',
	remarks: '',
};

// Marketing
export const MARKETING_SCHEMA = {
	user_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	short_name: STRING.nullable(),
	remarks: STRING.nullable(),
};

export const MARKETING_NULL = {
	uuid: null,
	user_uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

// Material
export const MATERIAL_SCHEMA = {
	name: STRING_REQUIRED,
	unit: STRING_REQUIRED,
	short_name: STRING,
	threshold: NUMBER_DOUBLE,
	description: STRING.nullable(),
	remarks: STRING.nullable(),
};

export const MATERIAL_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	unit: 'kg',
	threshold: 0,
	description: '',
	section_uuid: null,
	type_uuid: null,
	remarks: '',
};

export const MATERIAL_STOCK_SCHEMA = {
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const MATERIAL_STOCK_NULL = {
	uuid: null,
	material_uuid: null,
	trx_to: '',
	trx_quantity: '',
	created_by: '',
	remarks: '',
};

export const MATERIAL_TRX_AGAINST_ORDER_SCHEMA = {
	order_description_uuid: STRING_REQUIRED,
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const MATERIAL_TRX_AGAINST_ORDER_NULL = {
	uuid: null,
	material_uuid: null,
	order_description_uuid: null,
	trx_to: '',
	trx_quantity: '',
	created_by: '',
	remarks: '',
};

export const SFG_TRANSFER_LOG_SCHEMA = {
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const SFG_TRANSFER_LOG_NULL = {
	uuid: null,
	order_entry_uuid: null,
	trx_from: '',
	trx_to: '',
	trx_quantity: '',
	created_by: '',
	remarks: '',
};

export const SFG_PRODUCTION_LOG_SCHEMA = {
	production_quantity: NUMBER_REQUIRED.moreThan(0, 'More than 0'),
	production_quantity_in_kg: NUMBER_DOUBLE_REQUIRED.moreThan(
		0,
		'More than 0'
	),
	wastage: NUMBER_DOUBLE.min(0, 'Minimum of 0')
		.nullable()
		.transform((value, originalValue) =>
			String(originalValue).trim() === '' ? 0 : value
		),
	remarks: STRING.nullable(),
};

export const SFG_PRODUCTION_LOG_NULL = {
	uuid: null,
	order_entry_uuid: null,
	section: '',
	used_quantity: null,
	production_quantity: null,
	wastage: null,
	remarks: '',
};

// Purchase
export const PURCHASE_ENTRY_SCHEMA = {
	material_uuid: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	price: NUMBER_DOUBLE_REQUIRED,
	unit: STRING.nullable(),
	remarks: STRING.nullable(),
};
export const PURCHASE_ENTRY_NULL = {
	material_uuid: null,
	quantity: null,
	price: null,
	unit: null,
	remarks: null,
};

// vendor page
export const VENDOR_SCHEMA = {
	name: STRING_REQUIRED,
	contact_name: STRING.nullable(),
	contact_number: PHONE_NUMBER.nullable(),
	email: EMAIL.nullable(),
	office_address: STRING.nullable(),
	remarks: STRING.nullable(),
};

export const VENDOR_NULL = {
	uuid: null,
	name: '',
	contact_number: '',
	email: '',
	office_address: '',
	remarks: '',
};
// purchase page
export const PURCHASE_SCHEMA = {
	vendor_uuid: NUMBER_REQUIRED,
	is_local: NUMBER_REQUIRED.default(0),
	remarks: STRING.nullable(),
	purchase: yup.array().of(
		yup.object().shape({
			material_uuid: NUMBER_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED,
			price: NUMBER_DOUBLE_REQUIRED,
		})
	),
};

export const PURCHASE_NULL = {
	uuid: null,
	vendor_uuid: null,
	is_local: '',
	remarks: '',
	purchase: [
		{
			material_uuid: null,
			quantity: '',
			price: '',
		},
	],
};

// purchase entry page
export const PURCHASE_RECEIVE_SCHEMA = {
	vendor_uuid: STRING_REQUIRED,
	is_local: NUMBER_REQUIRED.default(0),
	lc_number: STRING.nullable(),
	challan_number: STRING.nullable().when('lc_number', {
		is: (value) => value !== '',
		then: (Schema) =>
			Schema.matches(/^$/, 'Enter Challan Number or L/C Number'),
		otherwise: (Schema) => Schema,
	}),
	remarks: STRING.nullable(),
	purchase: yup.array().of(
		yup.object().shape({
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED,
			price: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const PURCHASE_RECEIVE_NULL = {
	uuid: null,
	vendor_uuid: null,
	is_local: null,
	lc_number: '',
	challan_number: null,
	remarks: '',
	purchase: [
		{
			purchase_description_uuid: null,
			material_uuid: null,
			quantity: '',
			price: '',
			remarks: '',
		},
	],
};

// Shade Recipe
export const SHADE_RECIPE_SCHEMA = {
	name: STRING_REQUIRED,
	sub_streat: STRING_REQUIRED,
	remarks: STRING.nullable(),
	lab_status: BOOLEAN.default(false),
	bleaching: STRING_REQUIRED.default('non-bleach'),
	shade_recipe_entry: yup.array().of(
		yup.object().shape({
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED.moreThan(
				0,
				'Quantity must be more than 0'
			).default(0),
			remarks: STRING.nullable(),
		})
	),
};

export const SHADE_RECIPE_NULL = {
	uuid: null,
	name: '',
	sub_streat: '',
	bleaching: 'non-bleach',
	remarks: '',
	shade_recipe_entry: [
		{
			uuid: null,
			shade_recipe_uuid: null,
			material_uuid: null,
			quantity: '',
			remarks: '',
			lab_status: 0,
		},
	],
};

// Received
export const RECEIVED_SCHEMA = {
	received_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const RECEIVED_NULL = {
	uuid: null,
	vendor_uuid: null,
	material_uuid: null,
	received_quantity: '',
	price: '',
	is_local: '',
	remarks: '',
};

// Order
// Order Properties
export const PROPERTIES_SCHEMA = {
	item_for: STRING_REQUIRED,
	type: STRING_REQUIRED,
	name: STRING_REQUIRED,
	short_name: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const PROPERTIES_NULL = {
	uuid: null,
	item_for: '',
	type: '',
	name: '',
	short_name: '',
	remarks: '',
	created_by: '',
	created_at: '',
	updated_at: '',
};

// Product Order
export const handelNumberDefaultValue = (value) =>
	value === null ? undefined : value;

// Order Info
export const ORDER_INFO_SCHEMA = {
	reference_order_info_uuid: STRING.nullable(),
	is_sample: BOOLEAN_REQUIRED.default(false),
	is_bill: BOOLEAN.default(true),
	is_cash: BOOLEAN_REQUIRED,
	conversion_rate: NUMBER_DOUBLE.nullable().default(80),
	status: BOOLEAN_REQUIRED.default(false),
	marketing_uuid: STRING_REQUIRED,
	merchandiser_uuid: STRING.when('is_sample', {
		is: true,
		then: (Schema) => Schema.nullable(),
		otherwise: (Schema) => Schema.required('Required'),
	}),
	factory_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	buyer_uuid: STRING_REQUIRED,
	marketing_priority: STRING,
	factory_priority: STRING,
	remarks: STRING.nullable(),
};

export const ORDER_INFO_NULL = {
	uuid: null,
	reference_order_info_uuid: '',
	is_sample: false,
	is_bill: true,
	is_cash: false,
	conversion_rate: 80,
	status: false,
	marketing_uuid: null,
	merchandiser_uuid: null,
	factory_uuid: null,
	party_uuid: null,
	buyer_uuid: null,
	marketing_priority: '',
	factory_priority: '',
	remarks: '',
};

export const ORDER_SCHEMA = {
	// * item section
	order_info_uuid: UUID_REQUIRED,
	item: UUID_REQUIRED,
	zipper_number: UUID_REQUIRED,
	end_type: UUID_REQUIRED,
	lock_type: UUID_REQUIRED,
	teeth_color: UUID_REQUIRED,
	special_requirement: JSON_STRING_REQUIRED,
	description: STRING.nullable(),
	remarks: STRING.nullable(),

	// * slider section
	// puller
	puller_type: UUID_REQUIRED,
	puller_color: UUID_REQUIRED,

	coloring_type: UUID_REQUIRED,

	// slider
	slider: UUID.nullable(),
	slider_body_shape: UUID_FK,
	slider_link: UUID_FK,

	slider_starting_section: STRING_REQUIRED.default('---'),

	// stopper
	top_stopper: UUID_FK,
	bottom_stopper: UUID_FK,

	// logo
	logo_type: UUID_FK,
	is_logo_body: BOOLEAN.default(false).when('logo_type', {
		is: (value) => value != null && value !== '', // Check if logo_type has a value
		then: (schema) =>
			schema.test(
				'is_logo_body_test',
				'Either logo body or logo puller is required',
				function (value) {
					// Pass if either is_logo_body is true or is_logo_puller is true
					return value || this.parent.is_logo_puller;
				}
			),
		otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	}),
	is_logo_puller: BOOLEAN.default(false).when('logo_type', {
		is: (value) => value != null && value !== '', // Check if logo_type has a value
		then: (schema) =>
			schema.test(
				'is_logo_puller_test',
				'Either logo body or logo puller is required',
				function (value) {
					// Pass if either is_logo_puller is true or is_logo_body is true
					return value || this.parent.is_logo_body;
				}
			),
		otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	}),
	is_slider_provided: BOOLEAN_DEFAULT_VALUE(false),

	// garments
	end_user: UUID_FK,
	garment: STRING.nullable(),
	light_preference: UUID_FK,
	garments_wash: JSON_STRING_REQUIRED,
	garments_remarks: STRING.nullable(),

	order_entry: yup.array().of(
		yup.object().shape({
			style: STRING_REQUIRED,
			color: STRING_REQUIRED,
			size: NUMBER_DOUBLE_REQUIRED,
			quantity: NUMBER_REQUIRED,
			company_price: NUMBER_DOUBLE_REQUIRED.transform(
				handelNumberDefaultValue
			).default(0),
			party_price: NUMBER_DOUBLE_REQUIRED.transform(
				handelNumberDefaultValue
			).default(0),
			bleaching: STRING_REQUIRED,
		})
	),
};

export const ORDER_NULL = {
	id: null,
	order_info_uuid: null,
	order_description_uuid: null,
	item: null,
	zipper_number: null,
	end_type: null,
	lock_type: null,
	puller_type: null,
	teeth_color: null,
	puller_color: null,
	is_logo_body: false,
	is_logo_puller: false,
	special_requirement: '',
	description: '',
	remarks: '',
	slider_starting_section: '---',
	garments_wash: '',
	order_entry: [
		{
			order_description_uuid: null,
			style: '',
			color: '',
			size: '',
			quantity: '',
			company_price: 0,
			party_price: 0,
			status: 1,
			swatch_approval_date: null,
			bleaching: 'non-bleach',
		},
	],
};

// * Lab recipe schema*//
export const LAB_RECIPE_SCHEMA = {
	lab_dip_info_uuid: null,
	name: STRING_REQUIRED,
	bleaching: STRING_REQUIRED,
	sub_streat: STRING.nullable(),
	approved: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	status: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	remarks: STRING.nullable(),
	recipe_entry: yup.array().of(
		yup.object().shape({
			material_uuid: STRING_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const LAB_RECIPE_NULL = {
	lab_dip_info_uuid: null,
	name: '',
	bleaching: 'non-bleach',
	sub_streat: '',
	approved: 0,
	status: 0,
	remarks: '',
	recipe_entry: [
		{
			color: '',
			quantity: '',
			remarks: '',
		},
	],
};

// * Lab info schema*//
export const LAB_INFO_SCHEMA = {
	order_info_uuid: STRING.nullable(),
	name: STRING_REQUIRED,
	lab_status: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	remarks: STRING.nullable(),
	recipe: yup.array().of(
		yup.object().shape({
			status: BOOLEAN.transform(handelNumberDefaultValue).default(false),
			approved: BOOLEAN.transform(handelNumberDefaultValue).default(
				false
			),
			recipe_uuid: STRING_REQUIRED,
		})
	),
};

export const LAB_INFO_NULL = {
	order_info_uuid: null,
	name: '',
	lab_status: 0,
	remarks: '',
	recipe: [
		{
			status: false,
			approved: false,
			recipe_uuid: null,
		},
	],
};

// Issue
// Wastage
export const WASTAGE_SCHEMA = {
	order_uuid: STRING_REQUIRED,
	material_id: NUMBER_REQUIRED,
	assigned_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const WASTAGE_NULL = {
	id: null,
	order_uuid: '',
	material_id: '',
	quantity: '',
	remarks: '',
};
// ISSUE Order page
export const ORDER_ISSUE_SCHEMA = {
	quantity: NUMBER_DOUBLE_REQUIRED,
	isWastage: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};

export const ORDER_ISSUE_NULL = {
	id: null,
	order_uuid: null,
	material_id: null,
	quantity: '',
	isWastage: null,
	remarks: '',
};

// Maintenance
export const MAINTENANCE_SCHEMA = {
	material_id: NUMBER_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	description: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const MAINTENANCE_NULL = {
	id: null,
	material_id: null,
	quantity: '',
	description: '',
	remarks: '',
};

// Spare Parts
export const SPARE_PARTS_SCHEMA = {
	material_id: NUMBER_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	description: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const SPARE_PARTS_NULL = {
	id: null,
	material_id: null,
	quantity: '',
	description: '',
	remarks: '',
};

// Material Entry

// Material
export const MATERIAL_ENTRY_SCHEMA = {
	price: NUMBER_DOUBLE_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	purchase_type: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const MATERIAL_ENTRY_NULL = {
	id: null,
	price: '',
	quantity: '',
	purchase_type: '',
	material_id: null,
	remarks: '',
};

// Consumption to Issue
export const CONSUMPTION_TO_ISSUE_SCHEMA = {
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const CONSUMPTION_TO_ISSUE_NULL = {
	id: null,
	order_uuid: null,
	order_number: null,
	material_id: null,
	material_name: null,
	material_unit: null,
	quantity: '',
	remarks: '',
};

// Waste to Issue
export const WASTE_TO_ISSUE_SCHEMA = {
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const WASTE_TO_ISSUE_NULL = {
	id: null,
	order_uuid: null,
	material_id: null,
	quantity: '',
	remarks: '',
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

// User
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

// Reset Password
export const RESET_PASSWORD_SCHEMA = {
	pass: PASSWORD,
	repeatPass: PASSWORD.oneOf([yup.ref('pass')], 'Passwords do not match'),
};

export const RESET_PASSWORD_NULL = {
	pass: '',
	repeatPass: '',
};

// Common
// Tape Add
export const TAPE_STOCK_ADD_SCHEMA = {
	name: STRING_REQUIRED,
	item_uuid: STRING_REQUIRED,
	zipper_number_uuid: STRING_REQUIRED,
	is_import: NUMBER.nullable(),
	is_reverse: STRING.nullable(),
	// top: NUMBER_DOUBLE_REQUIRED,
	// bottom: NUMBER_DOUBLE_REQUIRED,
	raw_per_kg_meter: NUMBER_DOUBLE_REQUIRED,
	dyed_per_kg_meter: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const TAPE_STOCK_ADD_NULL = {
	uuid: null,
	name: '',
	item_uuid: '',
	zipper_number_uuid: '',
	is_imported: 0,
	is_reverse: 0,
	// top: '',
	// bottom: '',
	raw_per_kg_meter: '',
	dyed_per_kg_meter: '',
	remarks: '',
};
// Tape Production
export const TAPE_PROD_SCHEMA = {
	production_quantity: NUMBER_REQUIRED.moreThan(0),
	wastage: NUMBER.nullable().default(0),
	remarks: STRING.nullable(),
};

export const TAPE_PROD_NULL = {
	uuid: null,
	section: '',
	tape_or_coil_stock_id: '',
	production_quantity: '',
	wastage: 0,
	remarks: '',
};
//Tape To Coil
export const TAPE_TO_COIL_TRX_SCHEMA = {
	trx_quantity: NUMBER_REQUIRED,
	wastage: NUMBER.nullable().default(0),
	remarks: STRING.nullable(),
};

export const TAPE_TO_COIL_TRX_NULL = {
	uuid: null,
	tape_coil_stock_uuid: '',
	created_by: '',
	trx_quantity: '',
	quantity: '',
	wastage: 0,
	remarks: '',
};
// Dyeing Against Stock
export const DYEING_AGAINST_STOCK_SCHEMA = {
	trx_quantity: NUMBER_REQUIRED.moreThan(0),
	remarks: STRING.nullable(),
};

export const DYEING_AGAINST_STOCK_NULL = {
	uuid: null,
	trx_quantity: '',
	remarks: '',
};
//* Tape Stock Trx To Dying
export const TAPE_STOCK_TRX_TO_DYING_SCHEMA = {
	order_description_uuid: NUMBER_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED.moreThan(0),
	remarks: STRING.nullable(),
};

export const TAPE_STOCK_TRX_TO_DYING_NULL = {
	id: null,
	order_description_uuid: '',
	trx_quantity: '',
	trx_from: 'tape_making',
	trx_to: 'dying_and_iron_stock',
	issued_by: '',
	remarks: '',
};

//*Dyeing Transfer From Stock
export const DYEING_TRANSFER_FROM_STOCK_SCHEMA = {
	dyeing_transfer_entry: yup.array().of(
		yup.object().shape({
			order_description_uuid: STRING_REQUIRED,
			trx_quantity: NUMBER_DOUBLE.required('Required').transform(
				(value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
			), // Transforms empty strings to null
			remarks: STRING.nullable(),
		})
	),
};

export const DYEING_TRANSFER_FROM_STOCK_NULL = {
	dyeing_transfer_entry: [
		{
			order_description_uuid: null,
			trx_quantity: null,
			remarks: '',
		},
	],
};

export const TAPE_OR_COIL_PRODUCTION_LOG_SCHEMA = {
	production_quantity: NUMBER_DOUBLE_REQUIRED.moreThan(0),
	wastage: NUMBER_DOUBLE.nullable().default(0),
	remarks: STRING.nullable(),
};

export const TAPE_OR_COIL_PRODUCTION_LOG_NULL = {
	uuid: null,
	type_of_zipper: null,
	tape_or_coil_stock_id: null,
	prod_quantity: null,
	wastage: 0,
	remarks: null,
};

// * Tape Required
export const TAPE_REQUIRED_SCHEMA = {
	end_type_uuid: UUID_REQUIRED,
	item_uuid: UUID_REQUIRED,
	nylon_stopper_uuid: UUID,
	zipper_number_uuid: UUID_REQUIRED,
	top: NUMBER_DOUBLE_REQUIRED,
	bottom: NUMBER_DOUBLE_REQUIRED,
	raw_mtr_per_kg: NUMBER_DOUBLE_REQUIRED,
	dyed_mtr_per_kg: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const TAPE_REQUIRED_NULL = {
	uuid: null,
	end_type_uuid: null,
	item_uuid: null,
	nylon_stopper_uuid: null,
	zipper_number_uuid: null,
	top: '',
	bottom: '',
	raw_mtr_per_kg: '',
	dyed_mtr_per_kg: '',
	remarks: '',
};

// Coil Production
export const COIL_PROD_SCHEMA = {
	production_quantity: NUMBER_DOUBLE_REQUIRED.moreThan(0),
	wastage: NUMBER_DOUBLE.nullable().default(0),
	remarks: STRING.nullable(),
};

export const COIL_PROD_NULL = {
	uuid: null,
	section: '',
	tape_or_coil_stock_id: '',
	production_quantity: '',
	wastage: 0,
	remarks: '',
};

// Coil Stock
export const COIL_STOCK_SCHEMA = {
	order_entry_id: NUMBER_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED.moreThan(0),
	remarks: STRING.nullable(),
};

export const COIL_STOCK_NULL = {
	uuid: null,
	order_entry_id: null,
	tape_or_coil_stock_id: null,
	quantity: '',
	remarks: '',
	zipper_number: null,
	trx_quantity: '',
};

// * common coil to dyeing

export const COMMON_COIL_TO_DYEING_SCHEMA = {
	coil_to_dyeing_entry: yup.array().of(
		yup.object().shape({
			order_id: UUID_REQUIRED,
			trx_quantity: NUMBER_DOUBLE_REQUIRED,
			// .max(yup.ref('max_trf_qty'), 'Beyond Stock'), // Transforms empty strings to null
			remarks: STRING.nullable(),
		})
	),
};

export const COMMON_COIL_TO_DYEING_NULL = {
	coil_to_dyeing_entry: [
		{
			order_id: null,
			trx_quantity: null,
			remarks: '',
		},
	],
};
export const COMMON_COIL_TO_DYEING_LOG_SCHEMA = {
	order_description_uuid: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};
export const COMMON_COIL_TO_DYEING_LOG_NULL = {
	order_description_uuid: null,
	trx_quantity: null,
	remarks: null,
};

// RM Material Used
// material_stock_id	section	quantity	wastage	issued_by

export const RM_MATERIAL_USED_SCHEMA = {
	remaining: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER_DOUBLE.nullable().default(0),
	remarks: STRING.nullable(),
};

export const RM_MATERIAL_USED_NULL = {
	uuid: null,
	material_stock_id: null,
	used_quantity: '',
	section: '',
	remaining: '',
	wastage: 0,
	issued_by: '',
	remarks: '',
	tape_making: '',
	coil_forming: '',
	dying_and_iron: '',
	lab_dip: '',
};

export const RM_MATERIAL_USED_EDIT_SCHEMA = {
	used_quantity: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER_DOUBLE.nullable().default(0),
	remarks: STRING.nullable(),
};

export const RM_MATERIAL_USED_EDIT_NULL = {
	uuid: null,
	material_stock_id: null,
	section: '',
	used_quantity: '',
	wastage: 0,
	issued_by: '',
	remarks: '',
};
export const RM_MATERIAL_ORDER_AGAINST_EDIT_SCHEMA = {
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const RM_MATERIAL_ORDER_AGAINST_EDIT_NULL = {
	uuid: null,
	material_stock_id: null,
	section: '',
	trx_quantity: '',
	issued_by: '',
	remarks: '',
};

// Swatch Schema
export const SWATCH_SCHEMA = {
	remarks: STRING.nullable(),
};

export const SWATCH_NULL = {
	order_entry_id: null,
	remarks: '',
};

// SFG Transaction
// id	order_entry_id	trx_from	trx_to	trx_quantity	issued_by

export const SFG_TRX_SCHEMA = {
	trx_quantity: NUMBER_DOUBLE_REQUIRED.moreThan(0),
	remarks: STRING.nullable(),
};

export const SFG_TRX_NULL = {
	id: null,
	order_entry_id: null,
	trx_from: '',
	trx_to: '',
	trx_quantity: '',
	issued_by: '',
	remarks: '',
};

// Slider Die Casting

export const SLIDER_DIE_CASTING_SCHEMA = {
	array: yup.array().of(
		yup.object().shape({
			mc_no: NUMBER_REQUIRED,
			die_casting_uuid: STRING_REQUIRED,
			order_info_uuid: STRING.nullable(),
			cavity_goods: NUMBER_REQUIRED,
			cavity_defect: NUMBER_REQUIRED,
			push: NUMBER_REQUIRED,
			weight: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const SLIDER_DIE_CASTING_NULL = {
	array: [
		{
			mc_no: '',
			die_casting_uuid: '',
			order_info_uuid: null,
			cavity_goods: '',
			cavity_defect: '',
			push: '',
			weight: '',
			remarks: '',
		},
	],
};

export const SLIDER_DIE_CASTING_PRODUCT_EDIT_SCHEMA = {
	mc_no: NUMBER_REQUIRED,
	cavity_goods: NUMBER_REQUIRED,
	cavity_defect: NUMBER_REQUIRED,
	push: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const SLIDER_DIE_CASTING_PRODUCT_EDIT_NULL = {
	mc_no: '',
	cavity_goods: '',
	cavity_defect: '',
	push: '',
	weight: '',
	remarks: '',
};
// Slider Assembly

export const SLIDER_SLIDER_ASSEMBLY_SCHEMA = {
	slider_slider_assembly_details: yup.array().of(
		yup.object().shape({
			slider_slider_assembly_uuid: STRING,
			order_number: STRING,
			party: STRING,
			slider_item_id: STRING_REQUIRED,
			production_quantity: NUMBER_DOUBLE_REQUIRED,
			production_weight: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const SLIDER_SLIDER_ASSEMBLY_NULL = {
	slider_slider_assembly_details: [
		{
			slider_slider_assembly_uuid: '',
			order_number: '',
			party: '',
			slider_item_id: '',
			production_quantity: '',
			production_weight: '',
			remarks: '',
		},
	],
};

// * Slider Assembly Production entry

export const SLIDER_ASSEMBLY_PRODUCTION_ENTRY_SCHEMA = {
	with_link: BOOLEAN.default(true),
	production_quantity: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? 0 : value
	),
	remarks: STRING.nullable(),
};

export const SLIDER_ASSEMBLY_PRODUCTION_ENTRY_NULL = {
	with_link: true,
	production_quantity: null,
	weight: null,
	wastage: 0,
	remarks: '',
};

// * Slider Assembly Transaction entry
export const SLIDER_ASSEMBLY_TRANSACTION_SCHEMA = {
	trx_quantity: NUMBER_REQUIRED,
	weight: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const SLIDER_ASSEMBLY_TRANSACTION_NULL = {
	trx_quantity: null,
	weight: null,
	remarks: '',
};

// Item Library (Die Casting, Slider Assembly)

export const ITEM_LIBRARY_SCHEMA = {
	name: STRING_REQUIRED,
	short_name: STRING,
	remarks: STRING.nullable(),
};

export const ITEM_LIBRARY_NULL = {
	id: null,
	name: '',
	short_name: '',
	section: '',
	remarks: '',
};

// Slider Item Transaction (Die Casting, Slider Assembly)

export const SLIDER_ITEM_TRANSACTION_SCHEMA = {
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const SLIDER_ITEM_TRANSACTION_NULL = {
	id: null,
	order_entry_id: null,
	trx_from: '',
	trx_to: '',
	trx_quantity: '',
	issued_by: '',
	remarks: '',
};

// Delivery
export const PACKING_LIST_SCHEMA = {
	order_info_uuid: STRING_REQUIRED,
	carton_size: STRING_REQUIRED,
	carton_weight: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
	packing_list_entry: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN,
			sfg_uuid: STRING_REQUIRED,
			packing_list_uuid: STRING.nullable(),
			order_number: STRING,
			item_description: STRING,
			style_color_size: STRING,
			order_quantity: NUMBER_DOUBLE,
			warehouse: NUMBER_DOUBLE,
			delivered: NUMBER_DOUBLE,
			balance_quantity: NUMBER_DOUBLE,
			short_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number').max(
						yup.ref('order_quantity'),
						'Beyond Order Quantity'
					),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			reject_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number').max(
						yup.ref('order_quantity'),
						'Beyond Order Quantity'
					),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(
							yup.ref('balance_quantity'),
							'Beyond Balance Quantity'
						),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
			isDeletable: BOOLEAN,
		})
	),
};

export const PACKING_LIST_NULL = {
	order_info_uuid: '',
	carton_size: '',
	carton_weight: '',
	remarks: '',
	packing_list_entry: [
		{
			is_checked: false,
			sfg_uuid: '',
			packing_list_uuid: '',
			order_number: '',
			item_description: '',
			style_color_size: '',
			order_quantity: null,
			warehouse: null,
			delivered: null,
			balance_quantity: null,
			quantity: null,
			short_quantity: 0,
			reject_quantity: 0,
			remarks: '',
			isDeletable: false,
		},
	],
};

// Challan
export const CHALLAN_SCHEMA = {
	assign_to: STRING_REQUIRED,
	order_info_uuid: STRING_REQUIRED,
	packing_list_uuids: JSON_STRING_REQUIRED,
	new_packing_list_uuids: JSON_STRING_REQUIRED,
	receive_status: BOOLEAN_DEFAULT_VALUE(false),
	gate_pass: BOOLEAN_DEFAULT_VALUE(false),
	challan_entry: yup.array().of(
		yup.object().shape({
			packing_list_uuid: STRING_REQUIRED,
			remarks: STRING.nullable(),
		})
	),

	new_challan_entry: yup
		.array()
		.of(
			yup.object().shape({
				packing_list_uuid: STRING_REQUIRED,
				remarks: STRING.nullable(),
			})
		)
		.optional(),
};

export const CHALLAN_NULL = {
	assign_to: '',
	order_info_uuid: '',
	packing_list_uuids: [],
	new_packing_list_uuids: [],
	receive_status: false,
	gate_pass: false,
	challan_entry: [
		{
			packing_list_uuid: '',
			remarks: '',
		},
	],

	new_challan_entry: [],
};

// Commercial
// PI

export const PI_SCHEMA = {
	lc_uuid: STRING.nullable(),
	marketing_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	order_info_uuids: JSON_STRING_REQUIRED,
	thread_order_info_uuids: JSON_STRING.optional(),
	new_order_info_uuids: JSON_STRING.optional(),
	new_order_info_thread_uuids: JSON_STRING.optional(),
	merchandiser_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	bank_uuid: STRING_REQUIRED,
	validity: NUMBER_REQUIRED,
	payment: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
	weight: NUMBER_DOUBLE.optional(),
	pi_cash_entry: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN,
			sfg_uuid: STRING_REQUIRED,
			max_quantity: NUMBER,
			pi_cash_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
			isDeletable: BOOLEAN,
		})
	),

	new_pi_cash_entry: yup
		.array()
		.of(
			yup.object().shape({
				is_checked: BOOLEAN,
				sfg_uuid: STRING_REQUIRED,
				max_quantity: NUMBER,
				pi_cash_quantity: yup.number().when('is_checked', {
					is: true,
					then: (Schema) =>
						Schema.typeError('Must be a number')
							.required('Quantity is required')
							.max(
								yup.ref('max_quantity'),
								'Beyond Max Quantity'
							),
					otherwise: (Schema) =>
						Schema.nullable().transform((value, originalValue) =>
							String(originalValue).trim() === '' ? null : value
						),
				}),
				remarks: STRING.nullable(),
				isDeletable: BOOLEAN,
			})
		)
		.optional(),

	pi_cash_entry_thread: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN,
			max_quantity: NUMBER,
			pi_cash_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
			isDeletable: BOOLEAN.optional(),
		})
	),

	new_pi_cash_entry_thread: yup
		.array()
		.of(
			yup.object().shape({
				is_checked: BOOLEAN,
				max_quantity: NUMBER,
				pi_cash_quantity: yup.number().when('is_checked', {
					is: true,
					then: (Schema) =>
						Schema.typeError('Must be a number')
							.required('Quantity is required')
							.max(
								yup.ref('max_quantity'),
								'Beyond Max Quantity'
							),
					otherwise: (Schema) =>
						Schema.nullable().transform((value, originalValue) =>
							String(originalValue).trim() === '' ? null : value
						),
				}),
				remarks: STRING.nullable(),
				isDeletable: BOOLEAN.optional(),
			})
		)
		.optional(),
};

export const PI_NULL = {
	uuid: null,
	marketing_uuid: '',
	party_uuid: '',
	order_info_uuids: [],
	thread_order_info_uuids: [],
	new_order_info_uuids: [],
	new_order_info_thread_uuids: [],
	merchandiser_uuid: '',
	factory_uuid: '',
	bank_uuid: '',
	validity: '',
	payment: '',
	remarks: '',
	weight: 0,
	pi_cash_entry: [
		{
			is_checked: false,
			sfg_uuid: '',
			pi_uuid: '',
			max_quantity: null,
			pi_cash_quantity: null,
			remarks: '',
			isDeletable: false,
		},
	],
	new_pi_cash_entry: [],
	pi_cash_entry_thread: [],
	new_pi_cash_entry_thread: [],
};
export const PI_CASH_SCHEMA = {
	marketing_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	order_info_uuids: JSON_STRING_REQUIRED,
	thread_order_info_uuids: JSON_STRING.optional(),
	new_order_info_uuids: JSON_STRING.optional(),
	new_order_info_thread_uuids: JSON_STRING.optional(),
	merchandiser_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	conversion_rate: NUMBER_DOUBLE_REQUIRED,
	receive_amount: NUMBER_DOUBLE,
	remarks: STRING.nullable(),
	pi_cash_entry: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN,
			sfg_uuid: STRING_REQUIRED,
			max_quantity: NUMBER,
			pi_cash_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
			isDeletable: BOOLEAN,
		})
	),

	new_pi_cash_entry: yup
		.array()
		.of(
			yup.object().shape({
				is_checked: BOOLEAN,
				sfg_uuid: STRING_REQUIRED,
				max_quantity: NUMBER,
				pi_cash_quantity: yup.number().when('is_checked', {
					is: true,
					then: (Schema) =>
						Schema.typeError('Must be a number')
							.required('Quantity is required')
							.max(
								yup.ref('max_quantity'),
								'Beyond Max Quantity'
							),
					otherwise: (Schema) =>
						Schema.nullable().transform((value, originalValue) =>
							String(originalValue).trim() === '' ? null : value
						),
				}),
				remarks: STRING.nullable(),
				isDeletable: BOOLEAN,
			})
		)
		.optional(),

	pi_cash_entry_thread: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN,
			max_quantity: NUMBER,
			pi_cash_quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(yup.ref('max_quantity'), 'Beyond Max Quantity'),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
			isDeletable: BOOLEAN.optional(),
		})
	),

	new_pi_cash_entry_thread: yup
		.array()
		.of(
			yup.object().shape({
				is_checked: BOOLEAN,
				max_quantity: NUMBER,
				pi_cash_quantity: yup.number().when('is_checked', {
					is: true,
					then: (Schema) =>
						Schema.typeError('Must be a number')
							.required('Quantity is required')
							.max(
								yup.ref('max_quantity'),
								'Beyond Max Quantity'
							),
					otherwise: (Schema) =>
						Schema.nullable().transform((value, originalValue) =>
							String(originalValue).trim() === '' ? null : value
						),
				}),
				remarks: STRING.nullable(),
				isDeletable: BOOLEAN.optional(),
			})
		)
		.optional(),
};

export const PI_CASH_NULL = {
	uuid: null,
	marketing_uuid: '',
	party_uuid: '',
	order_info_uuids: [],
	thread_order_info_uuids: [],
	new_order_info_uuids: [],
	new_order_info_thread_uuids: [],
	merchandiser_uuid: '',
	factory_uuid: '',
	remarks: '',
	conversion_rate: 0,
	receive_amount: 0,
	pi_cash_entry: [
		{
			is_checked: false,
			sfg_uuid: '',
			pi_uuid: '',
			max_quantity: null,
			pi_cash_quantity: null,
			remarks: '',
			isDeletable: false,
		},
	],
	new_pi_cash_entry: [],
	pi_cash_entry_thread: [],
	new_pi_cash_entry_thread: [],
};

export const BANK_SCHEMA = {
	name: STRING_REQUIRED,
	swift_code: STRING_REQUIRED,
	routing_no: STRING.nullable(),
	address: STRING_REQUIRED,
	policy: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const BANK_NULL = {
	uuid: null,
	name: '',
	swift_code: '',
	routing_no: '',
	address: '',
	policy: '',
	remarks: null,
};

// LC
export const LC_SCHEMA = {
	party_uuid: STRING_REQUIRED,
	lc_number: STRING_REQUIRED,
	lc_date: STRING_REQUIRED,
	payment_value: NUMBER_DOUBLE_REQUIRED,
	payment_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	ldbc_fdbc: STRING_REQUIRED.nullable(),
	acceptance_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	maturity_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	commercial_executive: STRING_REQUIRED,
	party_bank: STRING_REQUIRED,
	production_complete: BOOLEAN_REQUIRED,
	lc_cancel: BOOLEAN_REQUIRED,
	problematical: BOOLEAN_REQUIRED,
	epz: BOOLEAN_REQUIRED,
	is_rtgs: BOOLEAN_REQUIRED,
	document_receive_date: STRING.nullable().transform(
		(value, originalValue) =>
			String(originalValue).trim() === '' ? null : value
	), // dev
	handover_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	shipment_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	expiry_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	ud_no: STRING.nullable(),
	ud_received: STRING.nullable(),
	at_sight: STRING,
	amd_date: STRING.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	),
	amd_count: NUMBER,
	remarks: STRING.nullable(),
	pi: yup.array().of(
		yup.object().shape({
			uuid: STRING_REQUIRED,
		})
	),
};

export const LC_NULL = {
	party_uuid: null,
	lc_number: null,
	lc_date: null,
	payment_value: 0,
	payment_date: null,
	ldbc_fdbc: null,
	acceptance_date: null,
	maturity_date: null,
	commercial_executive: null,
	party_bank: null,
	production_complete: false,
	lc_cancel: false,
	handover_date: null,
	document_receive_date: null,
	shipment_date: null,
	expiry_date: null,
	ud_no: null,
	ud_received: null,
	at_sight: false,
	amd_date: null,
	amd_count: 0,
	problematical: false,
	epz: false,
	is_rtgs: false,
	remarks: null,
	pi: [
		{
			uuid: null,
		},
	],
};

// Thread
// Count Length
export const THREAD_COUNT_LENGTH_SCHEMA = {
	count: STRING_REQUIRED,
	length: NUMBER_REQUIRED,
	min_weight: NUMBER_DOUBLE_REQUIRED.max(
		yup.ref('max_weight'),
		'Beyond Max Weight'
	),
	max_weight: NUMBER_DOUBLE_REQUIRED.min(
		yup.ref('min_weight'),
		'Less than Min Weight'
	),
	con_per_carton: NUMBER_REQUIRED.default(0),
	price: NUMBER_DOUBLE_REQUIRED,
	sst: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const THREAD_COUNT_LENGTH_NULL = {
	uuid: null,
	count: '',
	length: '',
	min_weight: null,
	max_weight: null,
	con_per_carton: 0,
	price: null,
	sst: '',
	remarks: '',
};
// Thread Machine
export const THREAD_MACHINE_SCHEMA = {
	name: NAME_REQUIRED,
	max_capacity: NUMBER_REQUIRED.min(
		yup.ref('min_capacity'),
		'Less than Min Capacity'
	),
	min_capacity: NUMBER_REQUIRED.max(
		yup.ref('max_capacity'),
		'Beyond Max Capacity'
	),
	is_nylon: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_metal: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_vislon: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_sewing_thread: BOOLEAN.transform(handelNumberDefaultValue).default(
		false
	),
	is_bulk: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_sample: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	water_capacity: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};

export const THREAD_MACHINE_NULL = {
	uuid: null,
	name: '',
	min_capacity: null,
	max_capacity: null,
	is_nylon: false,
	is_metal: false,
	is_vislon: false,
	is_sewing_thread: false,
	is_bulk: false,
	is_sample: false,
	water_capacity: null,
	remarks: '',
};

// Thread DyesCategory
export const THREAD_DYES_CATEGORY_SCHEMA = {
	name: NAME_REQUIRED,
	id: NUMBER_REQUIRED,
	bleaching: STRING_REQUIRED,
	upto_percentage: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const THREAD_DYES_CATEGORY_NULL = {
	uuid: null,
	name: '',
	bleaching: '',
	id: null,
	upto_percentage: null,
	remarks: '',
};

// Thread Programs
export const THREAD_PROGRAMS_SCHEMA = {
	dyes_category_uuid: STRING_REQUIRED,
	material_uuid: STRING_REQUIRED,
	quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const THREAD_PROGRAMS_NULL = {
	uuid: null,
	dyes_category_uuid: null,
	material_uuid: null,
	quantity: null,
	remarks: '',
};

// Shade Recipe
export const THREAD_SHADE_RECIPE_SCHEMA = {
	name: STRING_REQUIRED,
	sub_streat: STRING_REQUIRED,
	lab_status: STRING,
	remarks: STRING.nullable(),
	thread_shade_recipe_entry: yup.array().of(
		yup.object().shape({
			material_id: NUMBER_REQUIRED,
			quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const THREAD_SHADE_RECIPE_NULL = {
	id: null,
	name: '',
	thread_shade_recipe_uuid: null,
	sub_streat: '',
	lab_status: '',
	remarks: '',
	thread_shade_recipe_entry: [
		{
			id: null,
			thread_shade_recipe_uuid: null,
			material_id: null,
			quantity: '',
			remarks: '',
		},
	],
};

// Order Info Entry
export const THREAD_ORDER_INFO_ENTRY_SCHEMA = {
	party_uuid: STRING_REQUIRED,
	marketing_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	merchandiser_uuid: STRING_REQUIRED,
	buyer_uuid: STRING_REQUIRED,
	is_sample: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_bill: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	is_cash: BOOLEAN.transform(handelNumberDefaultValue).default(false),
	delivery_date: yup.date().nullable(),
	remarks: STRING.nullable(),
	order_info_entry: yup.array().of(
		yup.object().shape({
			color: STRING_REQUIRED,
			// shade_recipe_uuid: STRING.nullable(),
			// po: STRING_REQUIRED,
			style: STRING_REQUIRED,
			count_length_uuid: STRING_REQUIRED,
			bleaching: STRING_REQUIRED,
			quantity: NUMBER_REQUIRED.moreThan(
				0,
				'Quantity must be more than 0'
			),
			company_price: NUMBER_DOUBLE_REQUIRED,
			party_price: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING.nullable(),
		})
	),
};

export const THREAD_ORDER_INFO_ENTRY_NULL = {
	uuid: null,
	party_uuid: null,
	marketing_uuid: null,
	factory_uuid: null,
	merchandiser_uuid: null,
	buyer_uuid: null,
	is_sample: false,
	is_bill: false,
	is_cash: false,
	issued_by: null,
	remarks: '',
	delivery_date: null,
	order_info_entry: [
		{
			uuid: null,
			order_info_uuid: null,
			// po: '',
			// shade_recipe_uuid: null,
			style: '',
			color: '',
			count_length_uuid: null,
			bleaching: 'non-bleach',
			quantity: 0,
			company_price: 0,
			party_price: 0,
			remarks: '',
		},
	],
};
//* Thread Coning Schema*//
export const THREAD_CONING_SCHEMA = {
	coning_operator: STRING_REQUIRED,
	coning_supervisor: STRING_REQUIRED,
	coning_machines: STRING_REQUIRED,
	batch_entry: yup.array().of(
		yup.object().shape({
			coning_production_quantity: NUMBER_REQUIRED.max(
				yup.ref('quantity'),
				'Beyond Max Quantity'
			),
			coning_production_quantity_in_kg: NUMBER_REQUIRED,
			transfer_quantity: NUMBER_REQUIRED.max(
				yup.ref('quantity'),
				'Beyond Max Quantity'
			),
		})
	),
};

export const THREAD_CONING_NULL = {
	uuid: null,
	coning_operator: '',
	coning_supervisor: '',
	coning_machines: '',
	batch_entry: [
		{
			coning_production_quantity: null,
			coning_production_quantity_in_kg: null,
			transfer_quantity: null,
		},
	],
};

// * Dyeing Planning SNO schema*//
export const DYEING_PLANNING_SNO_SCHEMA = {
	remarks: STRING.nullable(),
	planning_entry: yup.array().of(
		yup.object().shape({
			sno_quantity: NUMBER.nullable() // Allows the field to be null
				.transform((value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
				) // Transforms empty strings to null
				.max(yup.ref('max_sno_quantity'), ({ max }) => {
					return `Beyond Max Quantity of ${Math.floor(max)}`;
				}),

			sno_remarks: STRING.nullable(),
		})
	),
};

export const DYEING_PLANNING_SNO_NULL = {
	week: '',
	remarks: '',
	planning_entry: yup.array().of(
		yup.object().shape({
			sno_quantity: null,
			factory_quantity: null,
			sno_remarks: '',
			factory_remarks: '',
		})
	),
};

// * Dyeing Planning Head Office schema*//
export const DYEING_PLANNING_HEADOFFICE_SCHEMA = {
	remarks: STRING.nullable(),
	planning_entry: yup.array().of(
		yup.object().shape({
			factory_quantity: NUMBER.nullable() // Allows the field to be null
				.transform((value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
				) // Transforms empty strings to null
				.max(yup.ref('max_factory_quantity'), ({ max }) => {
					return `Beyond Max Quantity of ${Math.floor(max)}`;
				}),

			factory_remarks: STRING.nullable(),
		})
	),
};

export const DYEING_PLANNING_HEADOFFICE_NULL = {
	week: '',
	remarks: '',
	planning_entry: yup.array().of(
		yup.object().shape({
			factory_quantity: null,
			factory_remarks: '',
		})
	),
};

// * Dyeing Planning Batch schema*//

export const DYEING_BATCH_SCHEMA = {
	machine_uuid: STRING_REQUIRED,
	slot: NUMBER.default(0),
	remarks: STRING.nullable(),
	batch_entry: yup.array().of(
		yup.object().shape({
			is_checked: yup.boolean().default(false),
			quantity: yup.number().when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.typeError('Must be a number')
						.required('Quantity is required')
						.max(
							yup.ref('order_quantity'),
							'Beyond Order Quantity'
						),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			batch_remarks: STRING.nullable(),
		})
	),
};

export const DYEING_BATCH_NULL = {
	machine_uuid: null,
	slot: 0,
	remarks: '',
	batch_entry: [
		{
			is_checked: false,
			quantity: null,
			batch_remarks: '',
		},
	],
};

// * Dyeing Thread Batch schema*//

export const DYEING_THREAD_BATCH_SCHEMA = {
	machine_uuid: STRING_REQUIRED,
	slot: NUMBER.default(0),
	remarks: STRING.nullable(),
	batch_entry: yup.array().of(
		yup.object().shape({
			batch_remarks: STRING.nullable(),
		})
	),
};

export const DYEING_THREAD_BATCH_NULL = {
	machine_uuid: null,
	slot: 0,
	remarks: '',
	batch_entry: [
		{
			quantity: null,
			batch_remarks: '',
		},
	],
};

// * Dyeing Planning Batch production schema*//

export const DYEING_BATCH_PRODUCTION_SCHEMA = {
	batch_entry: yup.array().of(
		yup.object().shape({
			production_quantity: NUMBER.nullable() // Allows the field to be null
				.transform((value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
				)
				.max(yup.ref('quantity'), 'Beyond Batch Quantity'), // Transforms empty strings to null
			//
			production_quantity_in_kg: NUMBER_DOUBLE.nullable()
				.transform((value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
				)
				.max(yup.ref('quantity'), 'Beyond Batch Quantity'),
			batch_production_remarks: STRING.nullable(),
		})
	),
};

export const DYEING_BATCH_PRODUCTION_NULL = {
	batch_entry: [
		{
			production_quantity: null,
			production_quantity_in_kg: null,
			batch_production_remarks: '',
		},
	],
};

// * Dyeing Thread Batch Yarn schema*//
export const DYEING_THREAD_BATCH_YARN_SCHEMA = {
	yarn_quantity: NUMBER.moreThan(0),
};
export const DYEING_THREAD_BATCH_YARN_NULL = {
	uuid: null,
	yarn_quantity: null,
};

// * Dyeing Thread Batch Entry Transfer Schema*//
export const DYEING_THREAD_BATCH_ENTRY_TRANSFER_SCHEMA = {
	transfer_quantity: NUMBER.moreThan(0),
};
export const DYEING_THREAD_BATCH_ENTRY_TRANSFER_NULL = {
	uuid: null,
	transfer_quantity: null,
};

// * Dyeing Thread Batch Dyeing schema*//
export const DYEING_THREAD_BATCH_DYEING_SCHEMA = {
	yarn_quantity: NUMBER_REQUIRED,
	dyeing_operator: STRING_REQUIRED,
	reason: STRING_REQUIRED,
	category: STRING_REQUIRED,
	status: STRING_REQUIRED,
	pass_by: STRING_REQUIRED,
	shift: STRING_REQUIRED,
	dyeing_supervisor: STRING_REQUIRED,
	remarks: STRING.nullable(),
};

export const DYEING_THREAD_BATCH_DYEING_NULL = {
	dyeing_operator: '',
	reason: '',
	category: '',
	status: '',
	pass_by: '',
	shift: '',
	dyeing_supervisor: '',
	remarks: '',
};
//* Dyeing Thread Batch Conneing
export const DYEING_THREAD_CONNEING_SCHEMA = {
	...DYEING_THREAD_BATCH_DYEING_SCHEMA,
	uuid: STRING_REQUIRED,
	machine_uuid: STRING_REQUIRED,
	batch_entry: yup.array().of(
		yup.object().shape({
			coning_production_quantity: NUMBER,
			coning_production_quantity_in_kg: NUMBER,
			transfer_quantity: NUMBER,
		})
	),
};

export const DYEING_THREAD_CONNEING_NULL = {
	...DYEING_THREAD_BATCH_DYEING_NULL,
	uuid: '',
	machine_uuid: '',
	batch_entry: [
		{
			coning_production_quantity: null,
			coning_production_quantity_in_kg: null,
			transfer_quantity: null,
		},
	],
};
// * Dyeing Transfer

export const DYEING_TRANSFER_SCHEMA = {
	dyeing_transfer_entry: yup.array().of(
		yup.object().shape({
			order_description_uuid: STRING_REQUIRED,
			colors: yup.array().of(yup.string()).nullable(),
			trx_quantity: NUMBER_DOUBLE.required('Required').transform(
				(value, originalValue) =>
					String(originalValue).trim() === '' ? null : value
			), // Transforms empty strings to null
			remarks: STRING.nullable(),
		})
	),
};

export const DYEING_TRANSFER_NULL = {
	dyeing_transfer_entry: [
		{
			order_description_uuid: null,
			colors: [],
			trx_quantity: null,
			remarks: '',
		},
	],
};

export const UPDATE_DYEING_TRANSFER_SCHEMA = {
	order_description_uuid: UUID_FK,
	trx_quantity: NUMBER_DOUBLE_REQUIRED.transform((value, originalValue) =>
		String(originalValue).trim() === '' ? null : value
	), // Transforms empty strings to null
	remarks: STRING.nullable(),
};

export const UPDATE_DYEING_TRANSFER_NULL = {
	order_description_uuid: null,
	trx_quantity: 0,
	remarks: '',
};

// *Slider/Die Casting --> (STOCK)*//
export const SLIDER_DIE_CASTING_STOCK_SCHEMA = {
	name: STRING_REQUIRED, //
	item: STRING_REQUIRED, //
	zipper_number: STRING_REQUIRED, //
	end_type: STRING.nullable(), //
	puller_type: STRING.nullable(), //
	logo_type: STRING.nullable(), //
	slider_body_shape: STRING.nullable(), //
	puller_link: STRING.nullable(), //
	stopper_type: STRING.nullable(), //
	type: STRING_REQUIRED,
	// quantity: NUMBER_REQUIRED, //
	// weight: NUMBER_REQUIRED, //
	// pcs_per_kg: NUMBER_REQUIRED, //
	remarks: STRING.nullable(),
	is_body: BOOLEAN,
	is_puller: BOOLEAN,
	is_cap: BOOLEAN,
	is_link: BOOLEAN,
	is_h_bottom: BOOLEAN,
	is_u_top: BOOLEAN,
	is_box_pin: BOOLEAN,
	is_two_way_pin: BOOLEAN,
	is_logo_body: BOOLEAN.default(false).when('logo_type', {
		is: (value) => value != null && value !== '', // Check if logo_type has a value
		then: (schema) =>
			schema.test(
				'is_logo_body_test',
				'Either logo body or logo puller is required',
				function (value) {
					// Pass if either is_logo_body is true or is_logo_puller is true
					return value || this.parent.is_logo_puller;
				}
			),
		otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	}),
	is_logo_puller: BOOLEAN.default(false).when('logo_type', {
		is: (value) => value != null && value !== '', // Check if logo_type has a value
		then: (schema) =>
			schema.test(
				'is_logo_puller_test',
				'Either logo body or logo puller is required',
				function (value) {
					// Pass if either is_logo_puller is true or is_logo_body is true
					return value || this.parent.is_logo_body;
				}
			),
		otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	}),
};

export const SLIDER_DIE_CASTING_STOCK_NULL = {
	uuid: null,
	name: '',
	item: '',
	zipper_number: '',
	end_type: null,
	puller_type: null,
	logo_type: null,
	slider_body_shape: null,
	puller_link: null,
	stopper_type: null,
	// quantity: null,
	// weight: null,
	// pcs_per_kg: null,
	created_at: '',
	updated_at: '',
	remarks: '',
	is_body: false,
	is_puller: false,
	is_cap: false,
	is_link: false,
	is_h_bottom: false,
	is_u_top: false,
	is_box_pin: false,
	is_two_way_pin: false,
	is_logo_body: false,
	is_logo_puller: false,
};

// * Slider Assembly --> (STOCK)*//
export const SLIDER_ASSEMBLY_STOCK_SCHEMA = {
	name: STRING_REQUIRED, //
	die_casting_body_uuid: STRING_REQUIRED, //
	die_casting_puller_uuid: STRING_REQUIRED, //
	die_casting_cap_uuid: STRING_REQUIRED, //
	die_casting_link_uuid: STRING, //
	remarks: STRING.nullable(),
};

export const SLIDER_ASSEMBLY_STOCK_NULL = {
	name: '',
	die_casting_body_uuid: '',
	die_casting_puller_uuid: '',
	die_casting_cap_uuid: '',
	die_casting_link_uuid: '',

	remarks: '',
};

// * Slider/Dashboard --> (INFO)*//
export const SLIDER_DASHBOARD_INFO_SCHEMA = {
	order_info_uuid: STRING_REQUIRED,
	item: STRING_REQUIRED,
	zipper_number: STRING_REQUIRED,
	end_type: STRING_REQUIRED,
	puller_type: STRING_REQUIRED,
	color: STRING_REQUIRED,
	order_quantity: NUMBER_REQUIRED,
	body_quantity: NUMBER_REQUIRED,
	cap_quantity: NUMBER_REQUIRED,
	puller_quantity: NUMBER_REQUIRED,
	link_quantity: NUMBER_REQUIRED,
	sa_prod: NUMBER_REQUIRED,
	coloring_stock: NUMBER_REQUIRED,
	coloring_prod: NUMBER_REQUIRED,
	trx_to_finishing: NUMBER_REQUIRED,
	u_top_quantity: NUMBER_REQUIRED,
	h_bottom_quantity: NUMBER_REQUIRED,
	box_pin_quantity: NUMBER_REQUIRED,
	two_way_pin_quantity: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};

export const SLIDER_DASHBOARD_INFO_NULL = {
	uuid: null,
	order_info_uuid: '',
	item: '',
	zipper_number: '',
	end_type: '',
	puller_type: '',
	color: '',
	order_quantity: null,
	body_quantity: null,
	cap_quantity: null,
	puller_quantity: null,
	link_quantity: null,
	sa_prod: null,
	coloring_stock: null,
	coloring_prod: null,
	trx_to_finishing: null,
	u_top_quantity: null,
	h_bottom_quantity: null,
	box_pin_quantity: null,
	two_way_pin_quantity: null,
	remarks: '',
};

// * Slider/Die Casting --> (TRANSFER AGAINST STOCK)*//
export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_SCHEMA = {
	section: STRING_REQUIRED,
	order_description_uuid: STRING.when('section', {
		is: (value) => value == 'coloring',
		then: (schema) => schema.required('order is required'),
		otherwise: (schema) => schema.nullable(),
	}),
	stocks: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN_REQUIRED,
			assigned_quantity: NUMBER.when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.required('Quantity is required').max(
						yup.ref('quantity'),
						'Beyond Max Quantity'
					),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			assigned_weight: NUMBER_DOUBLE.when('is_checked', {
				is: true,
				then: (Schema) =>
					Schema.required('Weight is required').max(
						yup.ref('weight'),
						'Beyond Max Weight'
					),
				otherwise: (Schema) =>
					Schema.nullable().transform((value, originalValue) =>
						String(originalValue).trim() === '' ? null : value
					),
			}),
			remarks: STRING.nullable(),
		})
	),
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_NULL = {
	uuid: null,
	order_description_uuid: null,
	section: '',
	is_body: false,
	is_cap: false,
	is_puller: false,
	is_link: false,
	stocks: [],
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_UPDATE = {
	quantity: NUMBER_REQUIRED.max(
		yup.ref('max_quantity'),
		'Beyond Max Quantity'
	),
	weight: NUMBER_DOUBLE_REQUIRED.max(
		yup.ref('max_weight'),
		'Beyond Max Quantity'
	),
	remarks: STRING.nullable(),
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_STOCK_UPDATE_NULL = {
	quantity: null,
	weight: null,
	remarks: '',
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_UPDATE = {
	trx_quantity: NUMBER_REQUIRED.max(
		yup.ref('max_quantity'),
		'Beyond Max Quantity'
	),
	weight: NUMBER_DOUBLE_REQUIRED.max(
		yup.ref('max_weight'),
		'Beyond Max Quantity'
	),
	remarks: STRING.nullable(),
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_UPDATE_NULL = {
	trx_quantity: null,
	weight: null,
	remarks: '',
};

// * Slider/Die Casting --> (TRANSFER AGAINST ORDER)*//
export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_SCHEMA = {
	order_info_uuids: yup.array().of(STRING_REQUIRED),
	is_body: BOOLEAN_REQUIRED,
	is_cap: BOOLEAN_REQUIRED,
	is_puller: BOOLEAN_REQUIRED,
	is_link: BOOLEAN_REQUIRED,

	stocks: yup.array().of(
		yup.object().shape({
			is_checked: BOOLEAN_REQUIRED,
			order_number: STRING,
			order_info_uuids: yup.array().of(yup.string()).nullable(),
			name: STRING,
			item_name: STRING,
			zipper_number_name: STRING,
			end_type_name: STRING,
			puller_type_name: STRING,
			logo_type_name: STRING,
			slider_body_shape_name: STRING,
			puller_link_name: STRING,
			stopper_type_name: STRING,
			is_body: BOOLEAN,
			is_cap: BOOLEAN,
			is_puller: BOOLEAN,
			is_link: BOOLEAN,
			is_h_bottom: BOOLEAN,
			is_u_top: BOOLEAN,
			is_box_pin: BOOLEAN,
			is_two_way_pin: BOOLEAN,
			assigned_quantity: NUMBER.required(),
		})
	),
};

export const SLIDER_DIE_CASTING_TRANSFER_AGAINST_ORDER_NULL = {
	uuid: null,
	order_info_uuids: [],
	is_body: false,
	is_cap: false,
	is_puller: false,
	is_link: false,
	stocks: [],
};

// * vislon production
export const VISLON_PRODUCTION_SCHEMA = {
	production_quantity_in_kg: NUMBER_REQUIRED,
	wastage: NUMBER.nullable().transform((value, originalValue) =>
		String(originalValue).trim() === '' ? 0 : value
	),
	remarks: STRING.nullable(),
};

export const VISLON_PRODUCTION_SCHEMA_NULL = {
	production_quantity_in_kg: null,
	wastage: null,
	remarks: '',
};

// * vislon transaction

export const VISLON_TRANSACTION_SCHEMA = {
	trx_quantity_in_kg: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING.nullable(),
};

export const VISLON_TRANSACTION_SCHEMA_NULL = {
	trx_quantity_in_kg: null,
	remarks: '',
};

// * Metal Teeth Molding Production
export const METAL_TEETH_MOLDING_PRODUCTION_SCHEMA = {
	production_quantity: NUMBER_REQUIRED,
	production_quantity_in_kg: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER,
	remarks: STRING.nullable(),
};

export const METAL_TEETH_MOLDING_PRODUCTION_SCHEMA_NULL = {
	uuid: null,
	production_quantity: null,
	production_quantity_in_kg: null,
	wastage: null,
	remarks: null,
};

// * SFG PRODUCTION

export const SFG_PRODUCTION_SCHEMA_IN_KG = {
	production_quantity_in_kg: NUMBER_DOUBLE_REQUIRED.moreThan(
		0,
		'More Than 0'
	),
	wastage: NUMBER_DOUBLE.min(0, 'Minimum of 0')
		.nullable()
		.transform((value, originalValue) =>
			String(originalValue).trim() === '' ? 0 : value
		),
	remarks: STRING.nullable(),
};

export const SFG_PRODUCTION_SCHEMA_IN_KG_NULL = {
	uuid: null,
	order_entry_uuid: null,
	section: '',
	production_quantity_in_kg: '',
	wastage: '',
	remarks: '',
};

export const SFG_PRODUCTION_SCHEMA_IN_PCS = {
	production_quantity: NUMBER_REQUIRED.moreThan(0, 'More Than 0'),
	wastage: NUMBER_DOUBLE.min(0, 'Minimum of 0')
		.nullable()
		.transform((value, originalValue) =>
			String(originalValue).trim() === '' ? 0 : value
		),
	remarks: STRING.nullable(),
};

export const SFG_PRODUCTION_SCHEMA_IN_PCS_NULL = {
	uuid: null,
	order_entry_uuid: null,
	section: '',
	production_quantity: '',
	wastage: '',
	remarks: '',
};

export const SFG_PRODUCTION_SCHEMA = {
	...SFG_PRODUCTION_SCHEMA_IN_KG,
	...SFG_PRODUCTION_SCHEMA_IN_PCS,
};

export const SFG_PRODUCTION_NULL = {
	...SFG_PRODUCTION_SCHEMA_IN_KG_NULL,
	...SFG_PRODUCTION_SCHEMA_IN_PCS_NULL,
};

export const SFG_PRODUCTION_SCHEMA_NULL = {
	...SFG_PRODUCTION_SCHEMA_IN_KG_NULL,
	...SFG_PRODUCTION_SCHEMA_IN_PCS_NULL,
};

// * SFG transaction in kg
export const SFG_TRANSACTION_SCHEMA_IN_KG = {
	trx_quantity_in_kg: NUMBER_REQUIRED,
	remarks: STRING.nullable(),
};

export const SFG_TRANSACTION_SCHEMA_IN_KG_NULL = {
	trx_quantity_in_kg: null,
	remarks: '',
};

// * SFG transaction in pcs
export const SFG_TRANSACTION_SCHEMA_IN_PCS = {
	trx_quantity: NUMBER_REQUIRED.moreThan(0, 'More Than 0'),
	remarks: STRING.nullable(),
};

export const SFG_TRANSACTION_SCHEMA_IN_PCS_NULL = {
	trx_quantity_in_kg: null,
	remarks: '',
};

// * SFG transaction
export const SFG_TRANSACTION_SCHEMA = {
	...SFG_TRANSACTION_SCHEMA_IN_KG,
	...SFG_TRANSACTION_SCHEMA_IN_PCS,
};

export const SFG_TRANSACTION_SCHEMA_NULL = {
	...SFG_TRANSACTION_SCHEMA_IN_KG_NULL,
	...SFG_TRANSACTION_SCHEMA_IN_PCS_NULL,
};
