import React from 'react';
import { render, screen, act } from '@testing-library/react';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import MockDate from 'mockdate';
import API from '../../API';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

import Navbar from '../../components/common/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

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
        <UserContextProvider>
          <TimeContextProvider>
            <Navbar
              user={user}
              basketProducts={products}
              logout={() => ""}
              isLogged={true}

            />
          </TimeContextProvider>
        </UserContextProvider>
      </Router>
    );

    await act(() => promise);
    //screen.debug();

    expect(screen.getByText(/SolidarityBay/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Basket/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(/navdropdown/i));
    //await userEvent.click(screen.getByLabelText(/navdropdown-item/i));

  });
});
