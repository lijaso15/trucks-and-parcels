import React from "react";
import { connect } from "react-redux";

interface RouterProps {}

class Router extends React.Component<RouterProps> {
  render() {
    return (
      <li>
        <a>
          <select
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              background: "none",
              outline: "none",
              border: "none",
              fontSize: "inherit"
            }}
            id="router"
          >
            <option>Select Routing Algorithm</option>
            <option> Unordered </option>
            <option> Naive </option>
            <option> Random </option>
            <option> Greedy </option>
          </select>
        </a>
      </li>
    );
  }
}

export default Router;
