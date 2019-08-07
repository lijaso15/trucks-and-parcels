import React from "react";
import { connect } from "react-redux";
import { setMain } from "../../../actions";
interface LoaderProps {
  active: boolean;
  toggleMain(value: string): any;
}

class Loader extends React.Component<LoaderProps> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { active, toggleMain } = this.props;
    if (active) {
      toggleMain("CHART");
      return;
    }
    toggleMain("LOADING");
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        <a>Select Loading Algorithm</a>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.main === "loading"
  };
};

const dispatchToProps = dispatch => {
  return {
    toggleMain: value => dispatch(setMain(value))
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Loader);
