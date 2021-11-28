import React from 'react';
import { render, screen } from '@testing-library/react';

import Orders from "../../components/content/Orders/Orders"
import { BrowserRouter as Router } from 'react-router-dom';


describe('Orderss', () => {
    test('renders order list', () => {
        render(
            <Router>
            <Orders />
            </Router>);
        expect(screen.getByText(/Order ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Ordered product/i)).toBeInTheDocument();
        expect(screen.getByText(/Ordering user/i)).toBeInTheDocument();
    });
});