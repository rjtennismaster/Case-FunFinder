import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class DropDown extends Component {
  render() {
    return (
      <div>
        <Form>
          <span>Search for attractions: </span>
          <select name="cars" id="cars">
            <option value="volvo"></option>
            <option value="volvo">Parks</option>
            <option value="saab">Theatres</option>
            <option value="opel">Restaurants</option>
            <option value="audi">Museums</option>
            <option value="audi">Events</option>
          </select>

          <div>
            <span>Closing times: </span>
            <select name="cars" id="cars">
              <option value=""></option>
              <option value="volvo">3:00PM</option>
              <option value="saab">5:00PM</option>
              <option value="opel">8:00PM</option>
            </select>
          </div>
          <button variant="primary" type="submit">
            Submit
          </button>
        </Form>
      </div>
    );
  }
}
