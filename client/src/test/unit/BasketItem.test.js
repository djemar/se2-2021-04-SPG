import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import API from '../../API';
import BasketItem from '../../components/common/Basket/BasketItem/BasketItem';

describe('BasketItem', () => {
  test('renders BasketItem component', () => {
    const products = [
      {
        product_id: 'p0',
        name: 'product0',
        fid: 'f0',
        description: 'Lorem Ipsum',
        availability: '10',
        price: '5',
        unit_of_measure: '1 kg',
      },
      {
        product_id: 'p1',
        name: 'product1',
        fid: 'f1',
        description: 'Quousque tandem abutere',
        availability: '15',
        price: '6',
        unit_of_measure: '1 kg',
      },
    ];
    const users = [
      {
        user_id: 'f0',
        company_name: 'farm0',
      },
      {
        user_id: 'f1',
        company_name: 'farm1',
      },
    ];

    let api = jest
      .spyOn(API, 'getAllUsers')
      .mockImplementationOnce(() => Promise.resolve(users));

    render(
      <BasketItem
        product={products[0]}
        basketProducts={products}
        setBasketProducts={() => true}
      />
    );
    expect(screen.getByText(/product0/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText('btn-remove-basket-item'));
  });
});
