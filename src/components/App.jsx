import React from "react";
import PropTypes from "prop-types";
import { firebaseApp } from "../base";
import Header from "./Header.jsx";
import Order from "./Order.jsx";
import Inventory from "./Inventory.jsx";
import Fish from "./Fish.jsx";
import sampleFishes from "../sample-fishes";
import base from "../base";
import firebase from "firebase";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
    uid: null,
    owner: null
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    // reinstate localstorage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add new fish to fishes var
    fishes[`fish${Date.now()}`] = fish;
    // Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // Tke copy of current state
    const fishes = { ...this.state.fishes };
    // Update that state
    fishes[key] = updatedFish;
    // Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Copy of state
    const order = { ...this.state.order };
    // Add to the order or update the number of the order
    order[key] = order[key] + 1 || 1;
    // Call setState toupdate the state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  logout = async () => {
    console.log("Logging Out!");
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  };

  authHandler = async authData => {
    // Look up the current store in the firebase database
    const store = await base.fetch(this.props.match.params.storeId, {
      context: this
    });
    console.log(store);
    // Claim it if there is no owner
    if (!store.owner) {
      // save as our own
      await base.post(`${this.props.match.params.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => {
              return (
                <Fish
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.fishes[key]}
                  key={key}
                />
              );
            })}
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder} {...this.state} />
        <Inventory
          updateFish={this.updateFish}
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          {...this.state}
          authenticate={this.authenticate}
          logout={this.logout}
        />
      </div>
    );
  }
}

export default App;
