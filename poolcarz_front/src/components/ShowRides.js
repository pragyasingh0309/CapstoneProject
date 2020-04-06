import React from 'react';
import axios from 'axios';

class ShowRides extends React.Component {
    state = {
        show: false,
        data: [],
        rideData: [],
        cMessage: "",
        showRide: false,
        showRideObj: {},
        bookRideMsg: "",
        cancelRideMsg: "",
        cancelRide: false,
    }

    showRides = () => {
        if (!this.state.show) {
            this.setState({ show: true });
            axios.get('http://localhost:5000/show_rides').then(res => {
                this.setState({ cMessage: "", data: res.data, rideData: res.data });
            }).catch(err => {
                this.setState({ cMessage: "No offers available", data: [], show: false });
            })
        } else {
            this.setState({ show: false, cMessage: "" });
        }
    }

    hideShow = (e) => {
        if (e) {
            this.setState({ show: false, cMessage: "" });
        }
    }

    dataToInfosys = () => {
        const data = this.state.rideData.filter(
            (obj) => {
                let dest = obj.destination.toLowerCase();
                if (dest == "infosys") {
                    return true;
                } else {
                    return false;
                }
            }
        )
        this.setState({ data: data, cMessage: "" });
        if (data.length == 0) {
            this.setState({ cMessage: "No offers available" })
        }
    }

    dataFromInfosys = () => {
        const data = this.state.rideData.filter(
            (obj) => {
                let pickUp = obj.pickUp.toLowerCase();
                if (pickUp == "infosys") {
                    return true;
                } else {
                    return false;
                }
            }
        )
        this.setState({ data: data, cMessage: "" });
        if (data.length == 0) {
            this.setState({ cMessage: "No offers available" })
        }
    }

    dataOther = () => {
        const data = this.state.rideData.filter(
            (obj) => {
                let dest = obj.destination.toLowerCase();
                let pickUp = obj.pickUp.toLowerCase();
                if (dest == "infosys" || pickUp == "infosys") {
                    return false;
                } else {
                    return true;
                }
            }
        )
        this.setState({ data: data, cMessage: "" });
        if (data.length == 0) {
            this.setState({ cMessage: "No offers available" });
        }
    }

    showRideDetail(e, data) {
        // console.log(e);
        // console.log(data.id);
        if (data) {
            this.setState({ showRide: true, showRideObj: data, cancelRide: false, bookRideMsg: "", cancelRideMsg: "" });
        }
        else {
            this.setState({ showRide: false, showRideObj: {} });
        }
    }

    bookRide = () => {
        let riderDemo = this.state.showRideObj;
        let rider = {
            id: riderDemo.id,
            name: riderDemo.name,
            ridee: sessionStorage.getItem('name'),
            pickUp: riderDemo.pickUp,
            destination: riderDemo.destination,
            seatsLeft: riderDemo.seatsLeft,
        }
        axios.post('http://localhost:5000/book_ride', rider).then(res => {
            this.setState({ cancelRide: true, bookRideMsg: res.data.message + res.data.id, cancelRideMsg: "" });
            sessionStorage.setItem('riderId', res.data.id);
        }).catch(err => {
            this.setState({ cancelRide: false, bookRideMsg: err.message, cancelRideMsg: "" });
        });
    }

    cancelRide = () => {
        // let riderDemo = this.state.showRideObj;
        // let rider = {
        //     name: riderDemo.name,
        //     ridee: sessionStorage.getItem('name'),
        //     pickUp: riderDemo.pickUp,
        //     destination: riderDemo.destination,
        //     seatsLeft: riderDemo.seatsLeft,
        // }
        let rider = {
            id: this.state.showRideObj.id,
            rideId: sessionStorage.getItem('riderId'),
            seatsLeft: this.state.showRideObj.seatsLeft,
        }
        axios.post('http://localhost:5000/cancel_ride', rider).then(res => {
            this.setState({ cancelRide: false, cancelRideMsg: res.data.message, bookRideMsg: "" });
        }).catch(err => {
            this.setState({ cancelRide: true, cancelRideMsg: err.message, bookRideMsg: "" });
        });
    }

    offerRide = () => {
        this.props.history.push('/offer_ride');
    }

    render() {
        const upperMargin = {
            marginTop: 35,
        }
        let listItems = this.state.data.map((obj, i) => {
            return (
                <tr key={i} onClick={((e) => this.showRideDetail(e, obj))}>
                    <td>{obj.pickUp}</td>
                    <td>{obj.destination}</td>
                    <td>{obj.seatsLeft}</td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-2" style={upperMargin}>
                        <div className="card">
                            <div className="card-header text-light bg-primary">Book a Ride</div>
                            <div className="card-body">
                                <div>
                                    Pool Carz is an online application which enable users to share rides with others. You can either book a ride or offer a ride. Did we mention that this app is advertisement free ? To add on top of that its free of cost | So what are you waiting for ? Check out the rides available and start PCing||
                                </div><br />
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={this.showRides}>Show All Rides</button>&nbsp;
                                {this.state.show && <>
                                        <button className="btn btn-primary" onClick={this.dataToInfosys}>To Infosys</button>&nbsp;
                                    <button className="btn btn-primary" onClick={this.dataFromInfosys}>From Infosys</button>&nbsp;
                                    <button className="btn btn-primary" onClick={this.dataOther}>Others</button><br /><br />
                                        <div className="text text-primary">Please select a ride!</div><br />
                                        {this.state.cMessage == "" && <div className="table-responsive">
                                            <table className="table table-hover table-bordered">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>Start Point</th>
                                                        <th>End Point</th>
                                                        <th>Seats Available</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listItems}
                                                </tbody>
                                            </table>
                                        </div>}
                                        {this.state.cMessage != "" && <div className="alert alert-danger" role="alert">{this.state.cMessage}</div>}
                                    </>}
                                    {this.state.showRide && this.state.show && <div className="card">
                                        <div className="card-header text-light bg-primary">Ride Details</div>
                                        <div className="card-body">
                                            <table className="table table-hover table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Start Point</th>
                                                        <th>End Point</th>
                                                        <th>Car</th>
                                                        <th>Seats Available</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{this.state.showRideObj.name}</td>
                                                        <td>{this.state.showRideObj.pickUp}</td>
                                                        <td>{this.state.showRideObj.destination}</td>
                                                        <td>{this.state.showRideObj.car}</td>
                                                        <td>{this.state.showRideObj.seatsLeft}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-center">
                                            {this.state.bookRideMsg != "" && <div><div className="text-center text-success">{this.state.bookRideMsg}</div><br /></div>}
                                            {this.state.cancelRideMsg != "" && <div><div className="text-center text-success">{this.state.cancelRideMsg}</div><br /></div>}
                                            {!this.state.cancelRide && <div><button className="btn btn-primary" onClick={this.bookRide}>Book Ride!</button><br /></div>}
                                            {this.state.cancelRide && <button className="btn btn-danger" onClick={this.cancelRide}>Cancel Ride</button>}
                                        </div>
                                        <br />
                                    </div>}
                                    <br /><br />
                                    <button className="btn btn-primary" onClick={this.offerRide}>Offer a Ride!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default ShowRides;