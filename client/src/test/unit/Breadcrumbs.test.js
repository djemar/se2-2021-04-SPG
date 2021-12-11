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
    MockDate.set('2021-12-13T08:00:00.196Z');
});

afterEach(() => {
    MockDate.reset();
});

describe('Breadcumbs', () => {

    test('renders Breadcumbs component', async () => {
        //const promise = Promise.resolve({ data: products });
        //axios.get.mockImplementationOnce(() => promise);

        /* let api = jest
            .spyOn(API, 'addOrder')
            .mockImplementationOnce(() => Promise.resolve(true)); */
        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <Breadcumbs></Breadcumbs>
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        //await act(async () => promise);

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText("09:00, Monday, 13/12/2021")).toBeInTheDocument();
        screen.debug();

        /* userEvent.click(
            screen.getByRole('button', {
                name: /btn-confirm-order/i,
            })
        ); */

    })

})