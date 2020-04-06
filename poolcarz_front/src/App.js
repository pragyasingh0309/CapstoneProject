import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import OfferRide from './components/OfferRide';
import ShowRides from './components/ShowRides';
import Warning from './components/Warning';
// import CancelRide from './components/CancelRide';

class App extends React.Component {

  state = {
    logged: false,
  }

  componentDidMount() {
    this.interval = setInterval(this.handleChange, 500);
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
    /* const bg = {
      backgroundImage: 'url(background_img.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: "fixed",
      height: "100vh",
    } */
    return (
      <div style={{backgroundImage:'url(background_img.jpg)'}} className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/login" component={Login}></Route>
            {this.state.logged && <Route exact path="/offer_ride" component={OfferRide}></Route>}
            {/* {this.state.logged && <Route exact path="/cancel_ride" component={CancelRide}></Route>} */}
            {this.state.logged && <Route exact path="/show_rides" component={ShowRides}></Route>}
            {this.state.logged == false && <Route path="/" component={Warning}></Route>}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;