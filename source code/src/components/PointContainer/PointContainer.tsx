import React from "react";
import PointForm from "./PointForm";
import { connect } from "react-redux";
import { clearCalled } from "../../actions";
import Label from "./Label";

interface PointContainerProps {
  points: {
    x?: number;
    y?: number;
    name: string;
    isTruck: boolean;
    id: number;
    value?: number;
  }[];
  deleted: boolean;
  clearDelete(): any;
  active: boolean;
  isTruck: boolean;
}

class PointContainer extends React.Component<PointContainerProps> {
  render() {
    const { points, deleted, clearDelete, active, isTruck } = this.props;
    if (deleted && isTruck) {
      clearDelete();
      return null;
    }
    return [
      <Label active={active} isTruck={isTruck} />,

      active ? (
        <ul className="menu-list">
          <li>
            {points.map((p, i) => {
              if (p.isTruck === isTruck) {
                const last = points.filter(pt => pt.isTruck === isTruck);
                return (
                  <PointForm
                    {...p}
                    isLast={last[last.length - 1].id === p.id}
                    isTruck={isTruck}
                  />
                );
              }
            })}
          </li>
        </ul>
      ) : null
    ];
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearDelete: () => dispatch(clearCalled("DELETE"))
  };
};

const mapStateToProps = state => {
  return {
    active: state.menu.active,
    points: state.points,
    deleted: state.called.delete
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointContainer);
