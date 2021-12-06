import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Basket from '../../components/common/Basket/Basket';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import MockDate from 'mockdate';
import API from '../../API';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
});

describe('Basket', () => {
  test('renders Basket component', async () => {
    const user = { name: 'test user', type: 'Client', id: 100 };
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
    let api = jest
      .spyOn(API, 'addOrder')
      .mockImplementationOnce(() => Promise.resolve(true));
    render(
      <Router>
        <UserContextProvider>
          <TimeContextProvider>
            <Basket
              user={user}
              show={true}
              basketProducts={[
                {
                  pid: 1,
                  fid: 1,
                  name: 'test',
                  description: 'test',
                  category: 'test',
                  quantity: 1,
                  availability: 2,
                  price: 1,
                  unit: 'test',
                },
                {
                  pid: 2,
                  fid: 1,
                  name: 'test',
                  description: 'test',
                  category: 'test',
                  quantity: 1,
                  availability: 2,
                  price: 1,
                  unit: 'test',
                  orderQuantity: 2,
                },
              ]}
            />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );
    await act(() => promise);

    expect(screen.getByText(/Your Basket/i)).toBeInTheDocument();
    // screen.debug();

    userEvent.click(
      screen.getByRole('button', {
        name: /btn-confirm-order/i,
      })
    );

    expect(
      await screen.queryByText(/product0 x 1 - 1 kg/i)
    ).not.toBeInTheDocument();
  });
});