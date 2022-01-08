import React from 'react';
import { render, screen } from '@testing-library/react';
import Reports from '../../components/content/ManagerPage/Reports';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockDate from 'mockdate';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2022-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('Manager Reports', () => {
  const unretrievedOrders = [
    {
      order_id: 1,
      ref_product: 53,
      ref_user: 2,
      date_order: '10/12/2021',
      quantity: 5,
      status: 'unretrieved',
    },
    {
      order_id: 2,
      ref_product: 54,
      ref_user: 3,
      date_order: '10/09/2022',
      quantity: 2,
      status: 'unretrieved',
    },
  ];
  // const user = {
  //   user_id: 1,
  //   name: 'test',
  //   surname: 'user',
  //   email: 'test@test.com',
  //   Type: 'Manager',
  //   wallet_balance: null,
  // };
  const promise = Promise.resolve({ data: unretrievedOrders });
  axios.get.mockImplementationOnce(() => promise);

  test('renders reports page', async () => {
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Reports />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );
    expect(screen.getByText(/Reports - Unretrieved food/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a year/i)).toBeInTheDocument();
    expect(screen.getByText(/You selected:/i)).toBeInTheDocument();
    expect(screen.getByText(/Select type/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekly/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/2018/i));
    expect(screen.getByText(/You selected:/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/weekly-radio/i));
    await userEvent.click(screen.getByLabelText(/monthly-radio/i));
    expect(screen.getByText(/You selected:/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/2024/i));
    expect(screen.getAllByText(/2024/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/2024/i)[1]).toBeInTheDocument();
  });

  test('renders graph logics', async () => {
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Reports />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );
    expect(screen.getByText(/Reports - Unretrieved food/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/2018/i));
    expect(
      screen.getByText(/There were no unretrieved orders during 2018!/i)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText(/2027/i));
    expect(
      screen.getByText(/Foreseeing future is not one of them./i)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText(/2021/i));
    await userEvent.click(screen.getByLabelText(/weekly-radio/i));
    expect(screen.getAllByText(/Weeks of Year/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/monthly-radio/i));
    expect(screen.getAllByText(/Months of Year/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Foreseeing future is not one of them./i)
    ).not.toBeInTheDocument();
  });
});
