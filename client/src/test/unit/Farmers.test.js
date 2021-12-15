import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import Farmers from '../../components/content/Farmers/Farmers';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

describe('Farmers', () => {
  test('render Farmers', () => {
    render(
      <Router>
        <TimeContextProvider>
          <UserContextProvider>
            <Farmers></Farmers>
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    expect(screen.getByText(/Farmers List/i)).toBeInTheDocument();
  });
});
