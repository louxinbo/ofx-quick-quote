import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Header } from '../Header';

it('should be true', () => {
  const title = 'test header';
  render(<Header title={title} />);
  expect(screen.getByText(title)).toBeTruthy();
});
