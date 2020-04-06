import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class Navigation extends React.Component {

    state = {
        logged: false,
    }

    componentDidMount() {
        this.interval = setInterval(this.handleChange, 1000);
    }

    /* componentWillUnmount() {
        clearInterval(this.interval);
    } */

    logout = () => {
        this.setState({ logged: false });
        sessionStorage.clear();
        // this.props.history.replace('/login');
        return <Redirect to="/login" />
    }

    handleChange = () => {
        var log = sessionStorage.getItem('isLogged');
        if (log) {
            this.setState({ logged: true });
        }
        else {
            this.setState({ logged: false });
        }
    }

    render() {
        const myStyle = {
            paddingTop: 8,
            paddingBottom: 8,
        }
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        <Link className="text text-white" to="/show_rides">PoolCarz</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {this.state.logged &&
                            <Nav className="ml-auto">
                                <Link to="/show_rides" className="nav-link text text-white">Home</Link>
                                <button onClick={this.logout} className="btn btn-dark">Logout</button>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
                <div className="bg-secondary">
                    <div className="text-center text-light" style={myStyle}>
                        Friends don't let friends ride alone.
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navigation;