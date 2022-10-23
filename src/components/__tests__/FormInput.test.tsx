import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { DropdownDataMap } from '../../utils';
import { FormInput } from '../FormInput';

jest.mock('@expo/vector-icons', () => ({ Entypo: View }));

describe('FormInput component', () => {
  it('should render text type FormInput and * ok', () => {
    const testPlaceholder = 'test placeholder';
    const testLable = 'test lable';
    render(
      <FormInput
        type="text"
        label={testLable}
        placeholder={testPlaceholder}
        isRequired
        keyboardType="default"
        value=""
        onChangeText={jest.fn()}
      />
    );
    expect(screen.getByText(testLable)).toBeTruthy();
    expect(screen.getByPlaceholderText(testPlaceholder)).toBeTruthy();
    expect(screen.getByText('*')).toBeTruthy();
  });

  it('should render dropdown type FormInput and * ok', () => {
    const testLable = 'test lable';
    const onSelect = jest.fn();
    render(
      <FormInput
        type="dropdown"
        label={testLable}
        dropdownData="countryCode"
        onSelect={onSelect}
        value={DropdownDataMap.countryCode[0]}
      />
    );
    expect(screen.getByText(testLable)).toBeTruthy();
    expect(
      screen.getByText(DropdownDataMap.countryCode[0].dial_code)
    ).toBeTruthy();
    expect(screen.queryByText('*')).toBeNull();
  });
});
