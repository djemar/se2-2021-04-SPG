import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarItem from '../../components/common/Sidebar/SidebarItem/SidebarItem';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SidebarItem', () => {
  test('renders SidebarItem component', () => {
    render(
      <Router>
        <SidebarItem
          product={{
            name: 'test product',
            description:
              'text text text text text text text text text text text text text text',
            quantity: 2,
            unit: 'KG',
          }}
        />
      </Router>
    );

    screen.debug();

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
  });
});
