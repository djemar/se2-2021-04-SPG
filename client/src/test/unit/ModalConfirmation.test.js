import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import ModalConfirmation from '../../components/content/Orders/ModalConfirmation';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

jest.mock('axios');

describe('Modal Confirmation', () => {
  test('render ModalConfirmation Submit', async () => {
    const promise = Promise.resolve({ data: true });
    axios.get.mockImplementationOnce(() => promise);
    let api = jest
      .spyOn(API, 'setDeliveredOrder')
      .mockImplementationOnce(id => Promise.resolve(true));

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <ModalConfirmation show={true} order_id={2} />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    expect(screen.getByText(/Change the status/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(/change-status-2/i));
  });

  test('render ModalConfirmation Cancel', async () => {
    const promise = Promise.resolve({ data: true });
    axios.get.mockImplementationOnce(() => promise);
    let api = jest
      .spyOn(API, 'setDeliveredOrder')
      .mockImplementationOnce(id => Promise.resolve(true));

    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <ModalConfirmation
              show={true}
              order_id={2}
              setShow={() => ''}
              setDirty={() => ''}
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    await act(() => promise);
    expect(screen.getByText(/Change the status/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText(/form-cancel/i));
  });
});
