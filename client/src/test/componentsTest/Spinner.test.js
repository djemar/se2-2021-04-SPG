import React from 'react';
import { render, screen } from '@testing-library/react';

import Spinner from '../../components/misc/Spinner';

describe('Spinner', () => {
  test('renders Spinner component', () => {
    render(<Spinner />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
