import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import axios from 'axios';
import MockDate from 'mockdate';
import Breadcrumbs from '../../components/misc/Breadcrumbs'
import UserContextProvider from '../../context/UserContext';
import TimeContextProvider from '../../context/TimeContext';
import UserContext from '../../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

beforeEach(() => {
    // Consider that it will be print +1 hours
    MockDate.set('2021-12-20T20:00:00.196Z');
});

afterEach(() => {
    MockDate.reset();
    jest.resetAllMocks();
});

describe('Delete pending', () => {
    beforeEach(() => jest.resetAllMocks());
    test('Delete pending cancellation test', async () => {
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
        const promise = Promise.resolve({data: products});
        axios.get.mockImplementationOnce(() => promise);
        render(<Router>
            <TimeContextProvider>
                <UserContextProvider>
                    <Breadcrumbs/>
                </UserContextProvider>
            </TimeContextProvider>
        </Router>);
        await act(() => promise);
        //screen.debug();

        //screen.debug();

        expect(screen.getByText('21:00, Monday, 20/12/2021')).toBeInTheDocument();
        screen.debug();
    });
});