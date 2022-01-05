import { React, TimeContext, useContext } from 'react';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import DeliveryModal from '../../components/common/Basket/DeliveryModal';
import Basket from '../../components/common/Basket/Basket';
import dayjs from 'dayjs';

import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';

import axios from 'axios';
import MockDate from 'mockdate';

jest.mock('axios');
beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('delivery', () => {
  test('renders Delivery component yes', async () => {
    const user = [{ user_id: 0, Type: 'Client', name: 'testName' }];
    const promise = Promise.resolve({ data: user });
    axios.get.mockImplementationOnce(() => promise);
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <DeliveryModal
              user={user}
              sum={5}
              mShow={true}
              computeConfirmationModal={true}
              handleMClose={() => {
                setMShow(false);
                setComputeConfirmationModal(false);
              }}
              wantDelivery={true}
              setWantDelivery={() => true}
              /*
              setDeliveryDate={() => '2021-12-09'}
              setDeliveryTime={() => '12:12'}
              setDeliveryAddress={() => 'add'}
              setDeliveryCountry={() => 'add'}
              setDeliveryCity={() => 'add'}
              setDeliveryZipCode={() => 'add'}*/
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    expect(screen.getByText(/confirmation/i)).toBeInTheDocument();
    expect(screen.getByText(/Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Place/i)).toBeInTheDocument();
  });

  test('renders Delivery component No', async () => {
    const user = [{ user_id: 0, Type: 'Client', name: 'testName' }];
    const promise = Promise.resolve({ data: user });
    axios.get.mockImplementationOnce(() => promise);
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <DeliveryModal
              user={user}
              sum={5}
              mShow={true}
              computeConfirmationModal={true}
              wantDelivery={false}
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );
    await act(() => promise);
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
  });

  test('Delivery radio button', async () => {
    const user = [{ user_id: 0, Type: 'Client', name: 'testName' }];
    const promise = Promise.resolve({ data: user });
    axios.get.mockImplementationOnce(() => promise);

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <DeliveryModal
              user={user}
              sum={5}
              mShow={true}
              computeConfirmationModal={true}
              handleMClose={() => {
                setMShow(false);
                setComputeConfirmationModal(false);
              }}
              wantDelivery={true}
              setWantDelivery={() => false}
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);

    expect(screen.getByText(/confirmation/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/No/i));
  });

  test('Delivery module close', async () => {
    const user = [{ user_id: 0, Type: 'Client', name: 'testName' }];
    const promise = Promise.resolve({ data: user });
    axios.get.mockImplementationOnce(() => promise);

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <DeliveryModal
              user={user}
              sum={5}
              mShow={true}
              computeConfirmationModal={true}
              handleMClose={() => {
                setMShow(false);
                setComputeConfirmationModal(false);
              }}
              wantDelivery={false}
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);

    expect(screen.getByText(/confirmation/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/Place/i));
  });

  test('user typing', async () => {
    const user = [{ user_id: 0, Type: 'Client', name: 'testName' }];
    const promise = Promise.resolve({ data: user });
    axios.get.mockImplementationOnce(() => promise);

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <DeliveryModal
              user={user}
              sum={5}
              mShow={true}
              computeConfirmationModal={true}
              handleMClose={() => {
                setMShow(false);
                setComputeConfirmationModal(false);
              }}
              wantDelivery={true}
              setDeliveryAddress={() => ''}
              setDeliveryCountry={() => ''}
              setDeliveryCity={() => ''}
              setDeliveryZipCode={() => 0}
              setDeliveryTime={() => ''}
              setDeliveryDate={() => ''}
              /*onChange={e => {
                setDeliveryAddress(e.target.value);
              }}*/
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);

    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/ZIP Code/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Date for delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Time for delivery/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Address for delivery/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Country for delivery/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/City for delivery/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Zip code for delivery/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select time/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select date/i)).toBeInTheDocument();

    userEvent.type(
      screen.getByPlaceholderText(/Address for delivery/i),
      'My address !'
    );
    expect(screen.getByPlaceholderText(/Address for delivery/i)).toHaveValue(
      'My address !'
    );
    userEvent.type(screen.getByPlaceholderText(/City for delivery/i), 'xy!');
    expect(screen.getByPlaceholderText(/City for delivery/i)).toHaveValue(
      'xy!'
    );

    userEvent.type(
      screen.getByPlaceholderText(/Zip code for delivery/i),
      '1010'
    );
    expect(screen.getByPlaceholderText(/Zip code for delivery/i)).toHaveValue(
      '1010'
    );

    userEvent.type(screen.getByPlaceholderText(/Country for delivery/i), 'xy!');
    expect(screen.getByPlaceholderText(/Country for delivery/i)).toHaveValue(
      'xy!'
    );

    userEvent.type(screen.getByPlaceholderText(/Select time/i), '10:10');
    expect(screen.getByPlaceholderText(/Select time/i)).toHaveValue('10:10');

    userEvent.type(screen.getByPlaceholderText(/Select date/i), '2021-12-12');

    expect(screen.getByPlaceholderText(/Select date/i)).toHaveValue(
      '2021-12-12'
    );
  });

  /*
  test('Basket', async () => {
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Basket user={user} 
            handleMClose = () => {
              setMShow(false);
              setComputeConfirmationModal(false);
            };/>
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );
    
  });
  */
});
