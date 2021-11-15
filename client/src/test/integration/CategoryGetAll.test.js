import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Category', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Correct get all products', async () => {
    const products = [
      {
        product_id: 'p0',
        name: 'product0',
        description: 'Lorem Ipsum',
        quantity_available: '10',
        price: '€5.00',
        unit_of_measure: 'kg',
      },
      {
        product_id: 'p1',
        name: 'product1',
        description: 'Lorem Ipsum',
        quantity_available: '15',
        price: '€6.00',
        unit_of_measure: 'kg',
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
    expect(
      screen.getByText(/Solidarity Purchasing Group/i)
    ).toBeInTheDocument();
    //expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/product0/i)).toBeInTheDocument();
    expect(screen.getByText(/Your basket/i)).toBeInTheDocument();
    expect(screen.getByText(/TOT/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/i)).toBeInTheDocument();
  });
});
