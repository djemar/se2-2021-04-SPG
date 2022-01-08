import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import ModalConfirmation from '../../components/content/Orders/ModalConfirmation';
import ProductsList from '../../components/content/Orders/ProductsList';
import OrderRow from '../../components/content/Orders/OrderRow';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

describe('Order Row', () => {
  test('render OrderRow Row details', async () => {
    const prod_and_qnt = [
      { prod: 2, prod_name: 'ss', price_per_unit: 2, qnt: 2 },
    ];

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <ProductsList products_and_qnt={prod_and_qnt} loading={false} />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    expect(screen.getByText(/Prod ID/i)).toBeInTheDocument();

    //userEvent.click(screen.getByLabelText(/button-details/i))
  });
});
