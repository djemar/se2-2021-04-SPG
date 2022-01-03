import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../components/common/HomePage/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import App from './../../App';
import userEvent from '@testing-library/user-event';

describe('Homepage', () => {
  test('renders homepage', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByLabelText(/buy-local/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start-shopping-btn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/paragraph/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/our-products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact-us/i)).toBeInTheDocument();
  });

  test('renders homepage buttons', async () => {
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );
    const el = await screen.findByLabelText(/buy-local/i);
    expect(el).toBeInTheDocument();
    expect(screen.getByLabelText(/start-shopping-btn/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/start-shopping-btn/i));
    expect(screen.getByText(/products available/i)).toBeInTheDocument();
  });
});
