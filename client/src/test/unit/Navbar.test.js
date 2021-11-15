import React from 'react';
import { render, screen } from '@testing-library/react';

import Navbar from '../../components/common/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navbar', () => {
  test('renders Navbar component', () => {
    const user = { name: 'test user' };
    render(
      <Router>
        <Navbar user={user} />
      </Router>
    );

    expect(
      screen.getByText(/Solidarity Purchasing Group/i)
    ).toBeInTheDocument();
  });
});
