import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Basket', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Add to basket', async () => {
    const products = [
      {
        product_id: 'p0',
        name: 'product0',
        description: 'Lorem Ipsum',
        availability: '10',
        price: '5',
        unit_of_measure: '1 kg',
      },
      {
        product_id: 'p1',
        name: 'product1',
        description: 'Quousque tandem abutere',
        availability: '15',
        price: '6',
        unit_of_measure: '1 kg',
      },
    ];
    const promise = Promise.resolve({ data: products });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    await userEvent.click(
      screen.getByRole('button', {
        name: /explore-All products/i,
      })
    );
    await act(() => promise);
    //screen.debug();
    await userEvent.click(
      screen.getByRole('button', {
        name: /add-basket-p0/i,
      })
    );

    //screen.debug();

    expect(screen.getByText(/product0 x 1 - 1 kg/i)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /add-basket-p0/i,
      })
    );
    expect(screen.getByText(/product0 x 2 - 1 kg/i)).toBeInTheDocument();
  });
});
