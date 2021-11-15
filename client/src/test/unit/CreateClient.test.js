import React from 'react';
import { render, screen } from '@testing-library/react';

import CreateClient from '../../components/common/CreateClient/CreateClient';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar', () => {
  test('renders Navbar component', () => {
    const user = { name: 'test user' };
    render(
      <Router>
        <CreateClient />
      </Router>
    );

    expect(screen.getByText(/Create new client/i)).toBeInTheDocument();
  });
});
