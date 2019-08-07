import React from "react";
import Return from "./Return";
import Tables from "./Tables";
import { connect } from "react-redux";

interface StatisticsProps {
  active: boolean;
}

class Statistics extends React.Component<StatisticsProps> {
  render() {
    const { active } = this.props;
    return active && [<Return />, <Tables />];
  }
}

const mapStateToProps = state => {
  return {
    active: state.main === "stats"
  };
};

export default connect(mapStateToProps)(Statistics);
