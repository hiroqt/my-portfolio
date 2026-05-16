import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Chip } from '../../components/ui/Chip';

test('renders Chip with label', () => {
  render(<Chip label="React" />);
  expect(screen.getByText('React')).toBeInTheDocument();
});
