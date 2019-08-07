import React from "react";
import { connect } from "react-redux";
import { draw, clearCalled } from "../../../actions";
import ReactTooltip from "react-tooltip";

interface ShowPathProps {
  draw(): any;
  active: boolean;
  clearCalled(): any;
}

class ShowPath extends React.Component<ShowPathProps> {
  render() {
    return [
      <li
        data-tip={!this.props.active ? "DRAW PATH" : "ERASE PATH"}
        onClick={() => {
          if (this.props.active) {
            this.props.clearCalled();
          }
          this.props.draw();
        }}
        data-for="draw"
      >
        <a>Run Experiment</a>
      </li>,
      <ReactTooltip id="draw" place="top" type="dark" effect="float" />
    ];
  }
}

const mapStateToProps = state => {
  return {
    active: state.draw
  };
};

const mapDispatchToProps = dispatch => {
  return {
    draw: () => dispatch(draw()),
    clearCalled: () => dispatch(clearCalled("STATS"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPath);
