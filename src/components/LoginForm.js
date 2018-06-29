import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";



class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            errorMessage: ''
        };
    }

    login = (event) => {
        axios.post("http://localhost:5000/users/login", this.state)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);                
                localStorage.setItem('username', this.state.username);
                this.setState({
                    error: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    errorMessage: err.message
                })
            })
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="col-sm-9">
                <div className='signup-form-div'>
                    <h2> Login </h2>
                    <div className={this.state.error ? "error" : "hidden"}>
                        {this.state.errorMessage}
                    </div>
                    <div className='signup-form'>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" name='username' type="text" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" name='password' type="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <div className='signup-buts'>
                            <button type="submit" className="signup-button" onClick={this.login}>
                                Login
                            </button>
                            <Link to="/">
                                <button className="home-button">
                                    Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}

export default LoginForm;