/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';
import { FORM_FIELDS, TextConfig } from '../../utils';
import { QuickQuote } from '../QuickQuote';

jest.mock('@expo/vector-icons', () => ({ Entypo: View }));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterEach(() => {
  jest.resetAllMocks();
});

describe('QuickQuote feature', () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ CustomerRate: 0.496, CustomerAmount: 4960 }),
      })
    ) as any;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });
  const formFieldsValues = Object.values(FORM_FIELDS);
  it('should render all Fields ok', () => {
    render(<QuickQuote />);
    formFieldsValues.forEach((item) => {
      expect(screen.getByText(item.config.label)).toBeTruthy();
      const { placeholder } = item.config as TextConfig;
      if (placeholder) {
        expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
      }
    });
    expect(screen.getByText('Quick Quote')).toBeTruthy();
    expect(screen.getByText('Get Quote')).toBeTruthy();
  });

  it('should validate and show error modal and can restart', () => {
    render(<QuickQuote />);
    const quoteButton = screen.getByText('Get Quote');
    fireEvent.press(quoteButton);
    expect(screen.getByText('Amount must be greater than 0')).toBeTruthy();
    const restartButton = screen.getByText('Start New Quote');
    fireEvent.press(restartButton);
    expect(screen.queryByText('Amount must be greater than 0')).toBeNull();
  });

  it('should show quote modal and can restart', async () => {
    render(<QuickQuote />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const amountInput = screen.getByPlaceholderText('Amount');
    fireEvent.changeText(firstNameInput, 'First Name');
    fireEvent.changeText(lastNameInput, 'Last Name');
    fireEvent.changeText(amountInput, '10000');
    const quoteButton = screen.getByText('Get Quote');
    fireEvent.press(quoteButton);
    expect(await screen.findByText('OFX Customer Rate')).toBeTruthy();
    expect(await screen.findByText('0.496')).toBeTruthy();
    expect(await screen.findByText('4,960.00')).toBeTruthy();
    const restartButton = screen.getByText('Start New Quote');
    fireEvent.press(restartButton);
    expect(screen.queryByText('OFX Customer Rate')).toBeNull();
  });
});
