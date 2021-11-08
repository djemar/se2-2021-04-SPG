import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const el = screen.getByText(/basket/i);
  expect(el).toBeInTheDocument();
});
