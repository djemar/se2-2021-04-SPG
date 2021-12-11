import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import DateModal from '../../components/misc/DateModal';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import MockDate from 'mockdate';
import API from '../../API';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

beforeEach(() => {
    MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
    MockDate.reset();
});

describe('Date Modal', () => {

    test('renders DateModal component', async () => {
        //const promise = Promise.resolve({ data: products });
        //axios.get.mockImplementationOnce(() => promise);

        /* let api = jest
            .spyOn(API, 'addOrder')
            .mockImplementationOnce(() => Promise.resolve(true)); */
        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <DateModal show={true}
                        title={'Set a new date'}
                        
                        ></DateModal>
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        //await act(async () => promise);

        expect(screen.getByText(/Set a new date/i)).toBeInTheDocument();
        expect(screen.getByText(/Invalid date/i)).toBeInTheDocument();
        expect(screen.getAllByRole('button')[0]
        ).toBeInTheDocument();
        
        screen.debug();

        /* userEvent.click(
            screen.getByRole('button', {
                name: /btn-confirm-order/i,
            })
        ); */

    })

})