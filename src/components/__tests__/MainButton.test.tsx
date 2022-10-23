import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { MainButton } from '../MainButton';

describe('Main Button', () => {
  it('should render Main Button ok', () => {
    const text = 'test button';
    render(<MainButton text={text} onPress={jest.fn()} />);
    expect(screen.getByText(text)).toBeTruthy();
  });
  it('should call the onPress callback', () => {
    const text = 'test button';
    const callback = jest.fn();
    render(<MainButton text={text} onPress={callback} />);
    const button = screen.getByText(text);
    fireEvent.press(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should not call the onPress callback if disabled', () => {
    const text = 'test button';
    const callback = jest.fn();
    render(<MainButton text={text} onPress={callback} disabled />);
    const button = screen.getByText(text);
    fireEvent.press(button);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
