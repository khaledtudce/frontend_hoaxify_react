import React from 'react';
import { render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
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
            const password = queryByPlaceholderText('Repeat your password');
            expect(password).toBeInTheDocument();
        });
        it('has password type for submit password input', () =>{
            const{queryByPlaceholderText} = render(<UserSignupPage/>);
            const passwordInput = queryByPlaceholderText('Repeat your password');
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
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            fireEvent.change(passwordRepeat, changeEvent("my-password-repeat"));
            expect(passwordRepeat).toHaveValue('my-password-repeat');
        });
                
        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;
        const setUpForSubmit = (props) => {
            const rendered = render(
                <UserSignupPage {...props}/>
            );
            const {container, queryByPlaceholderText} = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent("my-display-name"));
            fireEvent.change(usernameInput, changeEvent("my-username"));
            fireEvent.change(passwordInput, changeEvent("my-password"));
            fireEvent.change(passwordRepeatInput, changeEvent("my-password-repeat"));

            button = container.querySelector('button');
            return rendered;
        }

        it('calls postSignup when the fields are valid and the actions are provided in props', () =>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setUpForSubmit({actions})
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('does not throw excepton when clicking the button when actions are not provided in props', () =>{
            setUpForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post with user body when the fields are valid', () =>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setUpForSubmit({actions})
            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-username',
                displayName: 'my-display-name',
                password: 'my-password'
            };
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) =>{
                    setTimeout(() => {
                        resolve({});
                    }, 300)
                })
            })
        }

        xit('does not allow user to click the sign up button when there is an ongoing api call', () =>{
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            setUpForSubmit({actions})
            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        xit('display spinner when there is an ongoing api call', () =>{
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            const {queryByText} = setUpForSubmit({actions})
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });

        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            }
            const {queryByText} = setUpForSubmit({actions});
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            await waitForElementToBeRemoved(() => queryByText('Loading...'), {timeout: 400});
            expect(spinner).not.toBeInTheDocument();
        });

        it('hides spinner after api call finished with error', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) =>{
                        setTimeout(() => {
                            reject({
                                response: { data: {} }
                            });
                        }, 300)
                    })
                })
            }
            const {queryByText} = setUpForSubmit({actions});
            fireEvent.click(button);
            const spinner = queryByText('Loading...');
            await waitForElementToBeRemoved(() => queryByText('Loading...'), {timeout: 400});
            expect(spinner).not.toBeInTheDocument();
        });
    })
});

console.error = () => {}