import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Client', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Add client', async () => {
    const promise = Promise.resolve({ data: 5 });
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: 5 }));
    render(<App />);
    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-register/i,
      })
    );

    //screen.debug();

    await userEvent.type(screen.getByLabelText(/reg-name/i), 'Luke');
    await userEvent.type(screen.getByLabelText(/reg-surname/i), 'Skywalker');
    //await userEvent.type(screen.getByLabelText(/reg-farmer-company-name/i), 'MyShop');
    await userEvent.type(
      screen.getByLabelText(/reg-email/i),
      'luke@tatooine.com'
    );
    await userEvent.type(screen.getByLabelText(/reg-phone/i), '3335555555');
    await userEvent.type(screen.getByLabelText(/reg-country/i), 'Italy');
    await userEvent.type(screen.getByLabelText(/reg-city/i), 'Torino');
    await userEvent.type(screen.getByLabelText(/reg-zip-code/i), '10129');
    await userEvent.type(screen.getByLabelText(/reg-psw/i), 'leila99');
    await userEvent.type(
      screen.getByLabelText(/reg-psw-confirmation/i),
      'leila99'
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-create/i,
      })
    );

    expect(await screen.findByText(/Client ID:/i)).toBeInTheDocument();
    expect(await screen.findByText(/5/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Your favorite email address/i)
    ).not.toBeInTheDocument();

    //screen.debug();
  });
});
