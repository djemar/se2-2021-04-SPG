import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Top Up wallet', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Top Up 10 Euros', async () => {
    const clients = [
      {
        user_id: 1,
        name: 'Mario',
        surname: 'Rossi',
        company: null,
        email: 'mario.rossi@polito.it',
        hash: 'hasshhhhhh',
        Type: 'Client',
        address: 'via Roma 1',
        phone: '3355555555',
        country: 'Italy',
        city: 'Turin',
        zip_code: 10129,
      },
      {
        user_id: 2,
        name: 'Maria',
        surname: 'Rossi',
        company: null,
        email: 'maria.rossi@polito.it',
        hash: 'hasshhhhhhhhhh',
        Type: 'Client',
        address: 'via Roma 3',
        phone: '3385555555',
        country: 'Italy',
        city: 'Turin',
        zip_code: 10129,
      },
    ];
    const promise = Promise.resolve({ data: clients });
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

    // Go to 'Clients' page
    await userEvent.click(
      screen.getByRole('link', {
        name: /nav-clients/i,
      })
    );

    // Load clients:
    await act(() => promise);

    await userEvent.click(
      screen.getByRole('button', {
        name: /clientbtn-1/i,
      })
    );

    //screen.debug();

    await userEvent.click(
      screen.getByRole('button', {
        name: /submit-1/i,
      })
    );
    expect(screen.getByText(/€ 10/i)).toBeInTheDocument();
  });
});
