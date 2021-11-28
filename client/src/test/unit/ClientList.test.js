import React from 'react';
import { render, screen } from '@testing-library/react';

import Clients from "../../components/content/Clients/Clients"
import { BrowserRouter as Router } from 'react-router-dom';


describe('Clients', () => {
    test('renders Client list', () => {
        render(
            <Router>
            <Clients />
                </Router>);
        expect(screen.getByText(/Id/i)).toBeInTheDocument();
        expect(screen.getByText(/Email/i)).toBeInTheDocument();
        expect(screen.getByText(/Wallet/i)).toBeInTheDocument();
    });
});