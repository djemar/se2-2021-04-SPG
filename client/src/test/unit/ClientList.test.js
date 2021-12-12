import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClientRow } from '../../components/content/Clients';
import Clients from '../../components/content/Clients/Clients';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('Clients', () => {
  test('renders Clients component', async () => {
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
    const promise = Promise.resolve({ data: products });
    axios.get.mockImplementationOnce(() => promise);

    render(
      <Router>
        <UserContextProvider>
          <TimeContextProvider>
            <Clients />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    expect(screen.getByText(/Clients/i)).toBeInTheDocument();
  });
  test('renders ClientRow component', async () => {
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
        <UserContextProvider>
          <TimeContextProvider>
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
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
