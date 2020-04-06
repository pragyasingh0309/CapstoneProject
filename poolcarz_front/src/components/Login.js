import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    state = {
        name: "",
        password: "",
        cMessage: "",
        message: "",
        isValid: false,
    }

    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value, cMessage: "" });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log("name: ", this.state.name, " password: ", this.state.password)
        if (this.state.name !== "" && this.state.password !== "") {
            e.stopPropagation()
            const user = {
                userName: this.state.name,
                password: this.state.password
            };
            axios.post('http://localhost:5000/login', user).then(res => {
                // console.log(res);
                // console.log(res.data);
                this.setState({ cMessage: "", message: res.data.message });
                sessionStorage.setItem('isLogged', true);
                sessionStorage.setItem('name', this.state.name);
                this.props.history.push('/show_rides');
            }).catch(err => {
                // console.log("error",err);
                this.setState({ cMessage: "Username/Password is incorrect", message: "" })
                // sessionStorage.setItem('isLogged', false);
                sessionStorage.clear();
            })

            // console.log("after axios")
            // this.setState({ cMessage: "", message: "Logged in successfully" })
        }
        else {
            if (this.state.name == "") {
                this.setState({ cMessage: "Username is required" });
            } else {
                this.setState({ cMessage: "Password is required" })
            }
        }
    }

    render() {
        const heading = {
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 10,
        }
        const upperMargin = {
            marginTop: 35,
        }

        return (
            <div className="row">
                <div className="col-md-6 offset-3" style={upperMargin}>
                    <div className="card">
                        <div className="card-header text-light bg-primary">Login</div>
                        <div className="card-body">
                            <form noValidate validated={this.state.isValid.toString()} onSubmit={this.handleSubmit}>
                                <div className="position">
                                    <div className="form-group">
                                        <label className="col-form-label">User Name</label>
                                        <input name="name" type="text" className="form-control" required onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password</label>
                                        <input name="password" type="password" className="form-control" required onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                {this.state.message !== "" && <div className="alert alert-success" role="alert">{this.state.message}</div>}
                                {this.state.cMessage !== "" && <div className="alert alert-danger" role="alert">{this.state.cMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;