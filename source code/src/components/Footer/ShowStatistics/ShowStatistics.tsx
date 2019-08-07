import React from "react";
import { connect } from "react-redux";
import { setMain, setMenu } from "../../../actions";

interface ShowStatisticsProps {
  toggleStatsView(): any;
  menuOff(): any;
}

class ShowStatistics extends React.Component<ShowStatisticsProps> {
  render() {
    return (
      <li
        onClick={() => {
          this.props.toggleStatsView();
          this.props.menuOff();
        }}
      >
        <a> Stats </a>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleStatsView: () => dispatch(setMain("STATS")),
    menuOff: () => dispatch(setMenu("OFF"))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShowStatistics);
