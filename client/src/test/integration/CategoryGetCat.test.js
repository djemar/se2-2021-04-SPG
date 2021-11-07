import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Category', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Correct get all products by category', async () => {
    const products = [
      {
        product_id: 'p0',
        name: 'test dairy',
        description: 'Lorem Ipsum',
        quantity_available: '10',
        price: '€5.00',
        unit_of_measure: 'kg',
      },
      {
        product_id: 'p1',
        name: 'product1',
        description: 'Naturally without lactose',
        quantity_available: '15',
        price: '€6.00',
        unit_of_measure: 'kg',
      },
    ];
    const promise = Promise.resolve({ data: products });
    axios.get.mockImplementationOnce(() => promise);
    axios.post.mockImplementationOnce(() => promise);
    render(<App />);
    //screen.debug();

    await userEvent.click(
      await screen.findByRole('button', {
        name: /explore-Dairy/i,
      })
    );
    await act(() => promise);
    //screen.debug();
    expect(screen.getByText(/test dairy/i)).toBeInTheDocument();
    const prices = screen.getAllByText(/Price/i);
    prices.forEach(price => expect(price).toBeInTheDocument());
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    const btns = screen.getAllByText(/Add/i);
    btns.forEach(btn => expect(btn).toBeInTheDocument());
    expect(screen.getByText(/Naturally without lactose/i)).toBeInTheDocument();
    expect(screen.getByText(/Your basket/i)).toBeInTheDocument();
  });
});
