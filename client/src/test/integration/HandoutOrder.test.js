import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Handout order', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Handout: from pending to delivered', async () => {
    const orders = [
      {
        order_id: 1,
        ref_product: 62,
        ref_user: 1,
        date_order: '29/11/2021',
        quantity: 3,
        status: 'pending',
      },
      {
        order_id: 2,
        ref_product: 63,
        ref_user: 2,
        date_order: '30/11/2021',
        quantity: 6,
        status: 'pending',
      },
    ];
    const promise = Promise.resolve({ data: orders });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);

    // Employee login:
    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-login/i,
      })
    );
    await userEvent.type(
      screen.getByLabelText(/inputEmail/i),
      'employee@spg.com'
    );
    await userEvent.type(screen.getByLabelText(/inputPassword/i), 'employee');
    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-sign-in/i,
      })
    );

    // Go to 'Orders' page
    await userEvent.click(
      screen.getByRole('link', {
        name: /nav-orders/i,
      })
    );

    // Load orders:
    await act(() => promise);

    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-update-status-1/i,
      })
    );

    //screen.debug();

    await userEvent.click(
      screen.getByRole('button', {
        name: /change-status-1/i,
      })
    );
    expect(screen.getByText(/delivered/i)).toBeInTheDocument();
  });
});
