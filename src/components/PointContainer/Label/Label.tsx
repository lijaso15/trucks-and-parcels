import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { setPoint, clearCalled } from "../../../actions";

interface LabelProps {
  points: {
    x?: number;
    y?: number;
    value?: number;
    name: string;
  }[];
  active: boolean;
  max: number;
  clearCalled(): any;
  Add(x: number, y: number, value: number, isTruck: boolean): any;
  isTruck: boolean;
}

class Label extends React.Component<LabelProps> {
  constructor(props) {
    super(props);
    this.generateRandomPoint = this.generateRandomPoint.bind(this);
    this.generateRandomPair = this.generateRandomPair.bind(this);
  }
  generateRandomPoint() {
    const { max, Add, clearCalled, isTruck } = this.props;
    let res = this.generateRandomPair(
      Math.floor(max * Math.random()),
      Math.floor(max * Math.random())
    );
    let val = isTruck
      ? Math.floor(20 * Math.random()) + 10
      : Math.floor(10 * Math.random()) + 1;

    Add(res.x, res.y, val, isTruck);
    clearCalled();
  }

  generateRandomPair(x, y) {
    const { points, max } = this.props;
    if (!points.filter(p => p.x === x && p.y === y).length) {
      // unique
      return { x, y };
    } else {
      return this.generateRandomPair(
        3 + Math.floor(max * Math.random()),
        3 + Math.floor(max * Math.random())
      );
    }
  }
  render() {
    const { active, isTruck } = this.props;

    if (active) {
      return (
        <p
          className="menu-label"
          style={{
            textAlign: "right",
            paddingRight: "10px"
          }}
        >
          {" ."}
          <span
            style={{
              position: "absolute",
              cursor: "pointer",
              fontSize: "10pt",
              left: "5%"
            }}
            data-tip={
              isTruck ? "Generate Random Truck" : "Generate Random Parcel"
            }
            onClick={this.generateRandomPoint}
          >
            <FontAwesomeIcon icon="random" size="lg" />
          </span>
          <span
            style={{
              position: "absolute",
              right: "50%"
            }}
          >
            {isTruck ? "trucks" : "parcels"}
          </span>
          <ReactTooltip place="right" type="dark" effect="float" />
        </p>
      );
    }

    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Add: (x, y, value, isTruck) =>
      dispatch(setPoint("ADD", x, y, value, null, isTruck)),
    clearCalled: () => dispatch(clearCalled("DATA"))
  };
};

const mapStateToProps = state => {
  const valid = state.points.filter(p => p.x && p.y).length;
  const maxx = Math.max(...state.points.filter(p => p.x && p.y).map(p => p.x));
  const maxy = Math.max(...state.points.filter(p => p.x && p.y).map(p => p.y));
  return {
    max: valid ? (maxx > maxy ? maxx : maxy) : 10,
    points: state.points,
    deleted: state.called.delete
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Label);
