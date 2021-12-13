import React from 'react';
import { render, screen } from '@testing-library/react';
import MyShop from '../../components/common/MyShop/MyShop';
import { BrowserRouter as Router } from 'react-router-dom';
import * as dayjs from 'dayjs';

jest.mock('dayjs');

describe('Adding products alert', () => {
  test('render products adding when date match constraints', () => {
    dayjs.toISOString.mockImplementationOnce(() => '2021-12-09T13:00:00.000Z'); // Thursday
    render(
      <Router>
        <MyShop />
      </Router>
    );
    expect(screen.getByText(/Insert product details/i)).toBeInTheDocument();
  });

  test('render Alert when date does not match constraints', () => {
    dayjs.toISOString.mockImplementationOnce(() => '2021-12-12T13:00:00.000Z'); // Sunday
    render(
      <Router>
        <MyShop />
      </Router>
    );
    expect(screen.getByText(/Wuoops!/i)).toBeInTheDocument();
  });
});
