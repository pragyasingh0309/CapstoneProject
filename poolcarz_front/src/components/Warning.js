import React from 'react';

class Warning extends React.Component {

    loginPage = () => {
        this.props.history.push('/login');
    }

    render() {
        const upperMargin = {
            marginTop: 35,
        }
        return (
            <div className="container">
                <div className="col-sm-4 offset-4" style={upperMargin}>
                    <div className="card">
                        <div className="card-header bg-primary text-light">Please login first</div>
                        <div className="card-body text-center">
                            <button onClick={this.loginPage} className="btn btn-warning">Click here!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Warning;