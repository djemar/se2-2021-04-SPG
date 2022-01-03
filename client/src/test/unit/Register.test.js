import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import Register from '../../components/common/Register/Register';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-13T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('Register', () => {
  test('register as client', async () => {
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
    const user = { user_id: 1 };
    const mockSetState = jest.fn();

    jest.mock('react', () => ({
      useState: initial => [initial, mockSetState],
    }));
    let api = jest
      .spyOn(API, 'addUser')
      .mockImplementationOnce(() => Promise.resolve(user));

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Register />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    await expect(screen.getByText(/Register as/i)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/reg-name/i), 'ss');
    await userEvent.type(screen.getByLabelText(/reg-surname/i, 'ss'));
    await userEvent.type(screen.getByLabelText(/reg-email/i), 'ss@sss.it');
    await userEvent.type(screen.getByLabelText(/reg-phone/i), '3232');
    await userEvent.type(screen.getByLabelText(/reg-address/i), 'via Roma');
    await userEvent.type(screen.getByLabelText(/reg-country/i), 'sds');
    await userEvent.type(screen.getByLabelText(/reg-city/i), 'rere');
    await userEvent.type(screen.getByLabelText(/reg-zip-code/i), '211');
    await userEvent.type(screen.getByLabelText('reg-psw'), 'psw');
    await userEvent.type(screen.getByLabelText(/reg-psw-confirmation/i), 'psw');
    await userEvent.click(screen.getByLabelText(/btn-create/i));
    await expect(
      screen.getByText(/User successfully created with ID:/i)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/btn-back-to-register/i));
    await expect(screen.getByText(/Register as/i)).toBeInTheDocument();
  });

  test('register as farmer', async () => {
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
    const user = { user_id: 1 };
    const mockSetState = jest.fn();

    jest.mock('react', () => ({
      useState: initial => [initial, mockSetState],
    }));
    let api = jest
      .spyOn(API, 'addUser')
      .mockImplementationOnce(() => Promise.resolve(user));

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Register />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    await expect(screen.getByText(/Register as/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/register-as-farmer/i));
    await userEvent.type(screen.getByLabelText(/reg-name/i), 'ss');
    await userEvent.type(screen.getByLabelText(/reg-surname/i, 'ss'));
    await userEvent.type(screen.getByLabelText(/reg-email/i), 'ss2@rrsss.it');
    await userEvent.type(screen.getByLabelText(/reg-phone/i), '3232');
    await userEvent.type(
      screen.getByLabelText(/reg-farmer-companyName/i),
      'companyyyyy'
    );
    await userEvent.type(screen.getByLabelText(/reg-address/i), 'via Roma');
    await userEvent.type(screen.getByLabelText(/reg-country/i), 'sds');
    await userEvent.type(screen.getByLabelText(/reg-city/i), 'rere');
    await userEvent.type(screen.getByLabelText(/reg-zip-code/i), '211');
    await userEvent.type(screen.getByLabelText('reg-psw'), 'psw');
    await userEvent.type(screen.getByLabelText(/reg-psw-confirmation/i), 'psw');
    await userEvent.click(screen.getByLabelText(/btn-create/i));
    expect(
      screen.getByLabelText(/user-successfully-created/i)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/btn-go-to-login/i));
  });

  /*test('Checking email error', async () => {
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
    const user = { user_id: 1 };
    const mockSetState = jest.fn();

    jest.mock('react', () => ({
      useState: initial => [initial, mockSetState],
    }));
    let api = jest
      .spyOn(API, 'addUser')
      .mockImplementationOnce(() => Promise.resolve(user));

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Register />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    // screen.debug();
    await userEvent.type(screen.getByLabelText(/reg-name/i), 'ss');
    await userEvent.type(screen.getByLabelText(/reg-surname/i, 'ss'));
    await userEvent.type(screen.getByLabelText(/reg-email/i), 'ss@sss.u');
    await userEvent.type(screen.getByLabelText(/reg-phone/i), '3232');
    await userEvent.type(screen.getByLabelText(/reg-address/i), 'via Roma');
    await userEvent.type(screen.getByLabelText(/reg-country/i), 'sds');
    await userEvent.type(screen.getByLabelText(/reg-city/i), 'rere');
    await userEvent.type(screen.getByLabelText(/reg-zip-code/i), '211');
    await userEvent.type(screen.getByLabelText('reg-psw'), 'psw');
    await userEvent.type(screen.getByLabelText(/reg-psw-confirmation/i), 'psw');
    await userEvent.click(screen.getByLabelText(/btn-create/i));
    screen.debug();
    expect(screen.getByLabelText(/alert-wrong-email/i)).toBeInTheDocument();
  });*/
});
