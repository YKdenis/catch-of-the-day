import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  constructor() {
    super();
  }
  myInput = React.createRef();

  goToStore = e => {
    // stop the form from submitting
    e.preventDefault();
    // Get text from that input
    const store = this.myInput.value.value;
    // Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${store}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          defaultValue={getFunName()}
          ref={this.myInput}
          required
          placeholder="Store"
          type="text"
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
