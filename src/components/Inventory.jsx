import React from "react";
import AddFishForm from "./addFishForm.jsx";
import EditFishForm from "./editFishForm.jsx";
import PropTypes from "prop-types";
import Login from "./login";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  render() {
    const logout = <button onClick={this.props.logout}>Log Out!</button>;
    // Check if logged in
    if (!this.props.uid) {
      console.log(this.props);
      return <Login authenticate={this.props.authenticate} />;
    }
    // Check if they are not the owner of the store
    if (this.props.uid !== this.props.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    // They must be the owner, render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
            fish={this.props.fishes[key]}
            key={key}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
