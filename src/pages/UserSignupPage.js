import React from 'react'

export class UserSignupPage extends React.Component{

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false
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

    onClickSignup = () => {
        const user = {
            username : this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({pendingApiCall: true})
        this.props.actions.postSignup(user)
        .then((response) => {
            this.setState({pendingApiCall: false});
        })
        .catch((error) => {
            this.setState({pendingApiCall: false});
        });
    }

    render(){
        return(
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <label>Display Name</label>
                    <input className="form-control" 
                        placeholder="Your display name" 
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}/>
                </div>
                <div className="col-12 mb-3">
                    <label>User Name</label>
                    <input className="form-control"   
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}/>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input className="form-control" 
                        placeholder="Your password" 
                        type="password" value={this.state.password}
                        onChange={this.onChangePassword}/>
                </div>
                <div className="col-12 mb-3">
                    <label>Repeat Password</label>
                    <input className="form-control" 
                        placeholder="Repeat your password" 
                        type="password" value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat}/>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" 
                    onClick={this.onClickSignup}
                    disabled={this.state.pendingApiCall}
                    >
                        {this.state.pendingApiCall && (
                        <div className="spinner-border text-light spinner-border-sm mr-sm-1">
                            <span className="sr-only">Loading...</span>
                        </div>
                        )}
                        Sign Up</button>
                </div>
            </div>
        );
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) =>{
            resolve({});
        })
    }
}