import React from 'react';
import axios from 'axios';

class OfferRide extends React.Component {

    state = {
        name: "",
        car: "",
        seatsLeft: 0,
        pickUp: "",
        destination: "",
        cMessage: "",
        message: "",
        isValid: false,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, cMessage: "" });
        // console.log([e.target.name],": ",e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name != "" && this.state.car != "" && this.state.pickUp != "" && this.state.destination != "") {
            e.stopPropagation();
            const ride = {
                name: this.state.name,
                car: this.state.car,
                pickUp: this.state.pickUp,
                destination: this.state.destination,
                seatsLeft: this.state.seatsLeft,
            }
            if (0 < this.state.seatsLeft && this.state.seatsLeft < 8) {
                axios.post('http://localhost:5000/offer_ride', ride).then(res => {
                    this.setState({ cMessage: "", message: res.data.message });
                }).catch(err => {
                    this.setState({ cMessage: err.message, message: "" });
                })
            }
            else {
                this.setState({ cMessage: "Seats should be greater than 0 and less than 8", message: "" });
            }
        }
        else {
            this.setState({ cMessage: "Empty fields are not allowed", message: "" });
        }
    }

    render() {
        const upperMargin = {
            marginTop: 35,
        }
        return (
            < div className="container" >
                <div className="row" style={upperMargin}>
                    <div className="col-md-6 offset-3">
                        <div className="card">
                            <div className="card-header bg-primary text-light">
                                Car Ride Registration Form
                            </div>
                            <div className="card-body">
                                <form noValidate validated={this.state.isValid.toString()} onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-form-label">Name</label>
                                        <input name="name" type="text" className="form-control" placeholder="Mathan" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Start Location</label>
                                        <input name="pickUp" type="text" className="form-control" placeholder="ECR" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Destination</label>
                                        <input name="destination" type="text" className="form-control" placeholder="Infosys" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Car</label>
                                        <input name="car" type="text" className="form-control" placeholder="BMW" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Seats Available</label>
                                        <input name="seatsLeft" type="number" className="form-control" placeholder="2" onChange={this.handleChange} />
                                    </div>
                                    {this.state.message !== "" && <div className="text text-center text-success">{this.state.message}</div>}
                                    {this.state.cMessage !== "" && <div className="alert alert-danger" role="alert">{this.state.cMessage}</div>}<br/>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OfferRide;