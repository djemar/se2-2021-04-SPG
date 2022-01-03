import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import Orders from '../../components/content/Orders/Orders';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

describe('Order', () => {
  test('render Order', () => {
    const id = render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Orders />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    expect(
      screen.getByText(/Please wait, we're loading your orders.../i)
    ).toBeInTheDocument();
  });
});
