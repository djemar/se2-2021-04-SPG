import React from 'react';
import { render, screen } from '@testing-library/react';

import ProductCard from '../../components/common/Product/ProductCard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ProductCard', () => {
  test('renders ProductCard component', () => {
    render(
      <Router>
        <ProductCard title={'test product'} />
      </Router>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
  });
});
