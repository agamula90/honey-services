import { render, screen } from '@testing-library/react';
import AppRenamed from './AppRenamed';

test('renders learn react link', () => {
  render(<AppRenamed />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
