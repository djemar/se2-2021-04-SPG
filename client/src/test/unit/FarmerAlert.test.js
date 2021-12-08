import React from 'react';
import { render, screen } from '@testing-library/react';
import * as dayjs from 'dayjs';
import MyShop from '../../components/common/MyShop/MyShop';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Adding products alert', () => {
  test('renders Alert when date does not match constraints', () => {
    const currentDate = dayjs().toISOString();
    const day = dayjs(currentDate).get('day');
    const hour = dayjs(currentDate).get('hour');
    let res;
    render(
      <Router>
        <MyShop />
      </Router>
    );
    if (
      (day === 2 && hour >= 9) ||
      (day > 2 && day < 6) ||
      (day === 6 && hour < 23)
    ) {
      res = /Insert product details/i;
    } else {
      res = /Wuoops!/i;
    }
    expect(screen.getByText(res)).toBeInTheDocument();
  });
});
