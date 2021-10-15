import React from 'react'

export class UserSignupPage extends React.Component{

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: ''
    }

    onChangeDisplayName = (event) => {
        this.setState({displayName: event.target.value});
    }

    onChangeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value});
    }

    onChangePasswordRepeat = (event) => {
        this.setState({passwordRepeat: event.target.value});
    }

    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input placeholder="Your display name" 
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName}/>
                </div>
                <div>
                    <input placeholder="Your username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}/>
                </div>
                <div>
                    <input placeholder="Your password" 
                    type="password" value={this.state.password}
                    onChange={this.onChangePassword}/>
                </div>
                <div>
                    <input placeholder="Repeat Your password" 
                    type="password" value={this.state.passwordRepeat}
                    onChange={this.onChangePasswordRepeat}/>
                </div>
                <div>
                    <button>Sign Up</button>
                </div>
            </div>
        );
    }
}