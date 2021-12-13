import React, { useState, useContext } from 'react';
import { act, render, screen } from '@testing-library/react';
import Breadcumbs from '../../components/misc/Breadcrumbs';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import UserContext from '../../context/UserContext';
import MockDate from 'mockdate';
import API from '../../API';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

beforeEach(() => {
    MockDate.set('2021-12-11T15:00:00.196Z');
});

afterEach(() => {
    MockDate.reset();
});

describe('Breadcumbs toast order', () => {

    test('renders Breadcumbs toast order component', async () => {

        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <Breadcumbs></Breadcumbs>
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        expect(screen.getByText(/Order now!/i)).toBeInTheDocument();


    })

})