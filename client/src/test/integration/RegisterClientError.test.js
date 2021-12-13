import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Client', () => {
  beforeEach(() => jest.resetAllMocks());
  test('Add client error', async () => {
    const promise = Promise.resolve({ data: 5 });
    //axios.post.mockImplementationOnce(() => Promise.resolve({ data: 5 }));
    render(<App />);
    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-register/i,
      })
    );

    //screen.debug();

    await userEvent.type(screen.getByLabelText(/reg-surname/i), 'Skywalker');
    await userEvent.type(
      screen.getByLabelText(/reg-email/i),
      'luke@tatooine.com'
    );
    await userEvent.type(screen.getByLabelText(/reg-psw/i), 'leila99');

    await userEvent.click(
      screen.getByRole('button', {
        name: /btn-create-client/i,
      })
    );

    expect(await screen.queryByText(/Client ID:/i)).not.toBeInTheDocument();
    screen.debug();
  });
});
