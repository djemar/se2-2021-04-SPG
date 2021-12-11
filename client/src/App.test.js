import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import { React } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from './API';
import App from './App';
import TimeContextProvider from './context/TimeContext';
import UserContextProvider from './context/UserContext';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('App', () => {
  test('renders App for unregistered user', async () => {
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
            <App />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );
    await act(() => promise);
    const el = await screen.findByText(/SolidarityBay/i);
    expect(el).toBeInTheDocument();
  });

  test('renders App for client', async () => {
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
    const orders = [
      {
        ref_user: 0,
        name: 'product0',
        description: 'Lorem Ipsum',
        availability: '10',
        price: '5',
        unit_of_measure: '1 kg',
      },
      {
        ref_user: 1,
        name: 'product1',
        description: 'Quousque tandem abutere',
        availability: '15',
        price: '6',
        unit_of_measure: '1 kg',
      },
    ];
    const promise = Promise.resolve({ data: products });
    const promiseOrders = Promise.resolve({ data: orders });
    axios.get.mockImplementationOnce(() => promise);
    let apiSession = jest
      .spyOn(API, 'checkSession')
      .mockImplementationOnce(() =>
        Promise.resolve({
          id: 2,
          userType: 'Client',
        })
      );
    let apiOrders = jest
      .spyOn(API, 'getAllOrders')
      .mockImplementationOnce(() => promiseOrders);

    let apiMap = jest.spyOn(API, 'mapOrders').mockImplementationOnce(() => {
      return {
        order_id: 1,
        ref_user: 0,
        date_order: 'orderFilters[0].date_order',
        products_and_qnt: {},
        tot_price: 11,
        status: 'orderFilters[0].status',
      };
    });

    render(
      <Router>
        <UserContextProvider>
          <TimeContextProvider>
            <App />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );
    await act(() => promise);
    await act(() => promiseOrders);
    const el = await screen.findByText(/SolidarityBay/i);
    expect(el).toBeInTheDocument();
  });

  test('renders App for farmer', async () => {
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
      Promise.resolve({
        id: 2,
        userType: 'Farmer',
      })
    );
    render(
      <Router>
        <UserContextProvider>
          <TimeContextProvider>
            <App />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );
    await act(() => promise);
    const el = await screen.findByText(/SolidarityBay/i);
    expect(el).toBeInTheDocument();
  });

  /*   test('renders App for employee', async () => {
    let api = jest.spyOn(API, 'checkSession').mockImplementationOnce(() =>
      Promise.resolve({
        id: 2,
        userType: 'Employee',
      })
    );
    render(
      <Router>
        <UserContextProvider>
          <TimeContextProvider>
            <App />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );
    const el = await screen.findByText(/SolidarityBay/i);
    expect(el).toBeInTheDocument();
  }); */
});
