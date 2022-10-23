/* eslint-disable @typescript-eslint/no-unused-vars */
export const validators = {
  text: (fieldName: string, value: string) =>
    value.length > 0 ? null : `${fieldName} cannot be empty.`,
  email: (fieldName: string, value: string) => null,
  phone: (fieldName: string, value: string) => null,
  amount: (fieldName: string, value: string) =>
    parseFloat(value) > 0 ? null : 'Amount must be greater than 0',
};
