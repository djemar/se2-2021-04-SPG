import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import Navbar from '../../components/common/Navbar/Navbar';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

jest.mock('axios');

describe('Navbar', () => {
  test('renders Navbar component', async () => {
    const user = { name: 'test user', userType: 'Client' };
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
      .spyOn(API, 'getAllProducts')
      .mockImplementationOnce(() => Promise.resolve(true));
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Navbar
              user={user}
              basketProducts={products}
              logout={() => false}
              isLogged={true}
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    //screen.debug();

    expect(screen.getByText(/SolidarityBay/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Basket/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(/navdropdown/i));
    await userEvent.click(screen.getByLabelText(/btn-bot/i));
    //await userEvent.click(screen.getByLabelText(/navdropdown-item/i));
  });
});
