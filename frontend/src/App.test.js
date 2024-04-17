import { render, screen } from '@testing-library/react';
import App from './App';

test('renders trip search form', async () => {
  render(<App />);
  const mainHeader = screen.getByText(/Trip Search/i);
  const checkbox = screen.getByText(/Include canceled trips/i);
  const distanceFilter = screen.getByText(/Distance/i);
  const timeFilter = screen.getByText(/Time/i);
  expect(mainHeader).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  expect(distanceFilter).toBeInTheDocument();
  expect(timeFilter).toBeInTheDocument();
});
