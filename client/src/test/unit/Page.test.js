import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from '../../components/misc/Page';

describe('Page', () => {
  test('renders Page component', () => {
    render(
      <Router>
        <Page transparent={true} title="Test page" />
      </Router>
    );
    expect(screen.getByText(/Test page/i)).toBeInTheDocument();
  });
});
