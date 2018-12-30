import React from "react";
import PropTypes from "prop-types";

class addFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  };
  createFish = e => {
    // stop form from submitting
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    };
    this.props.addFish(fish);
    // Refresh teh form
    e.currentTarget.reset();
  };
  render() {
    return (
      <div className="addFishForm">
        <form className="fish-edit" onSubmit={this.createFish}>
          <input
            type="text"
            ref={this.nameRef}
            name="name"
            placeholder="Name"
          />
          <input
            type="text"
            ref={this.priceRef}
            name="price"
            placeholder="Price"
          />
          <select ref={this.statusRef} name="status">
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea ref={this.descRef} name="desc" placeholder="Desc" />
          <input
            ref={this.imageRef}
            type="text"
            name="image"
            placeholder="Image"
          />
          <button type="submit">+ Add Fish</button>
        </form>
      </div>
    );
  }
}

export default addFishForm;
