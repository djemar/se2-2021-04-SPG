import React from 'react';
import { render, screen } from '@testing-library/react';

import Sidebar from '../../components/common/Sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Sidebar', () => {
  test('renders Sidebar component', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(screen.getByText(/basket/i)).toBeInTheDocument();
  });
});
