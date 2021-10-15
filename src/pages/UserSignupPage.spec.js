import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { UserSignupPage } from './UserSignupPage'

beforeEach(cleanup);

describe('UserSignupPage', () =>{
    describe('Layout', () =>{
        it('has header of sign up', () =>{
           const { container } = render(<UserSignupPage/>)
           const header = container.querySelector('h1');
           expect(header).toHaveTextContent('Sign Up')
        });
        it('has input for display name', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const displayName = queryByPlaceholderText('Your display name');
            expect(displayName).toBeInTheDocument();
        });
        it('has input for username', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const userName = queryByPlaceholderText('Your username');
            expect(userName).toBeInTheDocument();
        });
        it('has input for password', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const password = queryByPlaceholderText('Your password');
            expect(password).toBeInTheDocument();
        });
        it('has password type for password input', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for reapeat password', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const password = queryByPlaceholderText('Repeat Your password');
            expect(password).toBeInTheDocument();
        });
        it('has password type for submit password input', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Repeat Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has submit button', () =>{
            const { container } = render(<UserSignupPage/>)
            const header = container.querySelector('button');
            expect(header).toBeInTheDocument()
         });
    })
    describe('Interactions', () =>{
        const changeEvent = (content) => {
            return {
                target: { value: content }
            };
        };
        it('sets the displayname value into state', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const displayName = queryByPlaceholderText('Your display name');
            fireEvent.change(displayName, changeEvent("my-display-name"));
            expect(displayName).toHaveValue('my-display-name');
        });
        it('sets the username value into state', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const userName = queryByPlaceholderText('Your username');
            fireEvent.change(userName, changeEvent("my-username"));
            expect(userName).toHaveValue('my-username');
        });
        it('sets the password value into state', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const password = queryByPlaceholderText('Your password');
            fireEvent.change(password, changeEvent("my-password"));
            expect(password).toHaveValue('my-password');
        });
        it('sets the password repeat value into state', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const passwordRepeat = queryByPlaceholderText('Repeat Your password');
            fireEvent.change(passwordRepeat, changeEvent("my-password-repeat"));
            expect(passwordRepeat).toHaveValue('my-password-repeat');
        });
    })
});