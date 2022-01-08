import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyShop from '../../components/common/MyShop/MyShop';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';
import API from '../../API';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('MyShop', () => {
  test('renders MyShop component', async () => {
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
    let api = jest.spyOn(API, 'checkSession').mockImplementationOnce(() =>
      Promise.resolve(user={
        id: 2,
        userType: 'Farmer',
      })
    );
    const userTest = {id:2, userType:'Farmer'}
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <MyShop />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    expect(
      screen.getByText(/Select a product from your inventory/i)
    ).toBeInTheDocument();
  });
});
