import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClientRow } from '../../components/content/Clients';
import Clients from '../../components/content/Clients/Clients';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

jest.mock('axios');

describe('Top Up wallet', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Top Up 10 Euros', async () => {
    const products = [
      {
        product_id: 0,
        name: 'product0',
        description: 'Lorem Ipsum',
        availability: '10',
        price: '5',
        unit_of_measure: '1 kg',
      },
      {
        product_id: 1,
        name: 'product1',
        description: 'Quousque tandem abutere',
        availability: '15',
        price: '6',
        unit_of_measure: '1 kg',
      },
    ];
    const user = {
      user_id: 1,
      name: 'test',
      surname: 'user',
      email: 'test@test.com',
      Type: 'Client',
      wallet_balance: 10,
    };
    const promise = Promise.resolve({ data: products });
    axios.get.mockImplementationOnce(() => promise);

    render(
        <Router>
          <TimeContextProvider>
            <UserContextProvider>
              <ClientRow
                  key={user.user_id}
                  index={0}
                  user_id={user.user_id}
                  name={user.name}
                  surname={user.surname}
                  email={user.email}
                  type={user.Type}
                  wallet_balance={user.wallet_balance}
                  isClient={user.Type === 'Client'}
                  setDirty={() => true}
              />
            </UserContextProvider>
          </TimeContextProvider>
        </Router>
    );

    await act(() => promise);

    await userEvent.click(
        screen.getByText("Top-Up")
    );

    //screen.debug();

    await userEvent.click(
        screen.getByRole('button', {
          name: /submit-1/i,
        })
    );
  });
});