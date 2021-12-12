import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockDate from 'mockdate';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from '../../API';
import userEvent from '@testing-library/user-event';
import OrderRow from '../../components/content/Orders/OrderRow';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';
import ProductsModal from '../../components/content/Orders/ProductsModal';

describe("ProductsModal", () => {

    test("render ProductsModal", async () => {

        render(
            <Router>
                <UserContextProvider>
                    <TimeContextProvider>
                        <ProductsModal
                            order_id={2}
                            ref_user={2}
                            date_order={22}
                            products_and_qnt={2}
                            status={'pending'}
                            show={true}
                        />
                    </TimeContextProvider>
                </UserContextProvider>
            </Router>
        );

        expect(
            screen.getByText(/Order ID:/i)
        ).toBeInTheDocument();

        //userEvent.click(screen.getByLabelText(/button-details/i))
    })

})



