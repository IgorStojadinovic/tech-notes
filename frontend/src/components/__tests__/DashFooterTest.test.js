import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import DashFooter from '../DashFooter.jsx';
import useAuth from '../../hooks/useAuth.js';

jest.mock('../../hooks/useAuth.js', () => ({
    __esModule: true,
    default: () => ({username: 'TestUser', status: 'active'}),
}));

test('Displays current user and status', () => {
    render(
        <MemoryRouter initialEntries={['/not_dashboard']}>
            <DashFooter />
        </MemoryRouter>
    );

    expect(screen.getByText('Current User: TestUser')).toBeInTheDocument();
    expect(screen.getByText('Status: active')).toBeInTheDocument();
});

test('Redirects to dashboard when home button is clicked', () => {
    let testLocation;

    render(
        <MemoryRouter initialEntries={['/not_dashboard']}>
            <Route path="*" render={({ location }) => {
                testLocation = location;
                return null;
            }}/>
            <DashFooter />
        </MemoryRouter>
    );

    const button = screen.getByTitle('Home');
    fireEvent.click(button);

    expect(testLocation.pathname).toBe('/dashboard');
});