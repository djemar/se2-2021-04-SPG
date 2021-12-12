import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import Order from '../../components/content/Order/Order';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

describe("Order", () => {

    test("render Order", () => {
        const id =
            render(
                <Router>
                    <UserContextProvider>
                        <TimeContextProvider>
                            <Order />
                        </TimeContextProvider>
                    </UserContextProvider>
                </Router>
            );

        expect(
            screen.getByText(/Order Resume/i)
        ).toBeInTheDocument();
    })

});