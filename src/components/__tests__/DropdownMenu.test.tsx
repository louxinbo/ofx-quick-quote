import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { DropdownDataMap } from '../../utils';
import { DropdownMenu } from '../DropdownMenu';

jest.mock('@expo/vector-icons', () => ({ Entypo: View }));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('DropdownMenu component', () => {
  it('should render DropdownMenu ok', () => {
    render(
      <DropdownMenu
        data="countryCode"
        onSelect={jest.fn()}
        value={DropdownDataMap.countryCode[0]}
      />
    );
    expect(
      screen.getByText(DropdownDataMap.countryCode[0].dial_code)
    ).toBeTruthy();
  });
  it('should expand dropdown menu, and be selectedable', () => {
    const onSelect = jest.fn();
    render(
      <DropdownMenu
        data="countryCode"
        onSelect={onSelect}
        value={DropdownDataMap.countryCode[0]}
      />
    );
    const button = screen.getByText(DropdownDataMap.countryCode[0].dial_code);
    fireEvent.press(button);
    const buttonInDropdown = screen.getByText(
      DropdownDataMap.countryCode[2].dial_code
    );
    expect(buttonInDropdown).toBeTruthy();
    fireEvent.press(buttonInDropdown);
    expect(onSelect).toHaveBeenCalledWith(DropdownDataMap.countryCode[2]);
  });
});
