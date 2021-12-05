import React from 'react';
import { render, screen } from '@testing-library/react';

import QuantitySelector from '../../components/misc/QuantitySelector';
import { BrowserRouter as Router } from 'react-router-dom';

describe('QuantitySelectr', () => {
  test('renders QuantitySelector component not for preview', () => {
    const addedProduct = {
      product_id: 0,
      name: 'product0',
      ref_farmer: 'user',
      description: 'Lorem Ipsum',
      availability: 10,
      price: 5,
      unit_of_measure: '1 kg',
    };
    render(
      <QuantitySelector
        orderQuantity={addedProduct.availability}
        setOrderQuantity={() => {
          return true;
        }}
        max={addedProduct.availability}
        pid={addedProduct.product_id}
        setBasketProducts={() => {
          return true;
        }}
        basketProducts={[]}
        location={'Basket'}
        setAvailability={() => {
          return true;
        }}
        preview={false}
      />
    );

    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });

  test('renders QuantitySelectr component for preview', () => {
    const addedProduct = {
      product_id: 0,
      name: 'product0',
      ref_farmer: 'user',
      description: 'Lorem Ipsum',
      availability: 10,
      price: 5,
      unit_of_measure: '1 kg',
    };
    render(
      <QuantitySelector
        orderQuantity={addedProduct.availability}
        setOrderQuantity={() => {
          return true;
        }}
        max={addedProduct.availability}
        pid={addedProduct.product_id}
        setBasketProducts={() => {
          return true;
        }}
        basketProducts={[]}
        location={'Basket'}
        setAvailability={() => {
          return true;
        }}
        preview={false}
      />
    );

    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
