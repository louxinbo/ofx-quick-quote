import { KeyboardTypeOptions } from 'react-native';
import CurrencyCode from './CurrencyCode.json';
import CountryCode from './CountryCode.json';
import { validators } from './validators';

export const DropdownDataMap = {
  countryCode: CountryCode,
  currencyCode: CurrencyCode,
};

export type CountryCodeType = typeof CountryCode[0];
export type CurrencyCodeType = typeof CurrencyCode[0];
export type DropdownDataType = CountryCodeType | CurrencyCodeType;
export type DropdownDataKeyType = keyof typeof DropdownDataMap;

type BaseFieldConfig = {
  label: string;
  isRequired?: boolean;
  isFullLenth?: boolean;
  width?: string;
};

export type TextConfig = BaseFieldConfig & {
  validation?: keyof typeof validators;
  keyboardType: KeyboardTypeOptions;
  placeholder?: string;
};

export type DropdownConfig = BaseFieldConfig & {
  dropdownData: DropdownDataKeyType;
  zIndex: number;
};

export type IField =
  | { type: 'text'; config: TextConfig }
  | { type: 'dropdown'; config: DropdownConfig };

export const FORM_FIELDS: Record<string, IField> = {
  firstName: {
    type: 'text',
    config: {
      label: 'First Name',
      placeholder: 'First Name',
      isRequired: true,
      validation: 'text',
      keyboardType: 'default',
    },
  },
  lastName: {
    type: 'text',
    config: {
      label: 'Last Name',
      placeholder: 'Last Name',
      isRequired: true,
      validation: 'text',
      keyboardType: 'default',
    },
  },
  email: {
    type: 'text',
    config: {
      label: 'Email',
      placeholder: 'Email',
      validation: 'email',
      isFullLenth: true,
      keyboardType: 'email-address',
    },
  },
  phonePrefix: {
    type: 'dropdown',
    config: {
      label: 'Phone',
      dropdownData: 'countryCode',
      width: '30%',
      zIndex: 100,
    },
  },
  phoneInput: {
    type: 'text',
    config: {
      label: ' ',
      validation: 'phone',
      keyboardType: 'phone-pad',
      width: '70%',
    },
  },
  fromCurrency: {
    type: 'dropdown',
    config: {
      label: 'From Currency',
      isRequired: true,
      dropdownData: 'currencyCode',
      zIndex: 99,
    },
  },
  toCurrency: {
    type: 'dropdown',
    config: {
      label: 'To Currency',
      isRequired: true,
      dropdownData: 'currencyCode',
      zIndex: 98,
    },
  },
  amount: {
    type: 'text',
    config: {
      placeholder: 'Amount',
      label: 'Amount',
      isRequired: true,
      validation: 'amount',
      keyboardType: 'decimal-pad',
    },
  },
};
