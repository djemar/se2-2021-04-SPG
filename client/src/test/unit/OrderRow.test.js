import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import ModalConfirmation from '../../components/content/Orders/ModalConfirmation';
import ProductsModal from '../../components/content/Orders/ProductsModal';
import OrderRow from '../../components/content/Orders/OrderRow';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';

describe("Order Row", () => {

    test("render OrderRow Row details", async () => {

        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <OrderRow
                            order_id={2}
                            ref_user={2}
                            date_order={2}
                            products_and_qnt={2}
                            tot_price={2}
                            status={'order-pending'}
                            isManager={true} />
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        expect(
            screen.getByText(/see details/i)
        ).toBeInTheDocument();

        userEvent.click(screen.getByLabelText(/button-details/i))
    })

    test("render OrderRow schenge status", async () => {
        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <OrderRow
                            order_id={2}
                            ref_user={2}
                            date_order={2}
                            products_and_qnt={2}
                            tot_price={2}
                            status={'order-pending'}
                            isManager={true} />
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        userEvent.click(screen.getByLabelText(/button-change-status/i))
    })


})



