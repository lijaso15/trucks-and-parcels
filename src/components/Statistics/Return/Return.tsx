import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { setMain, setMenu } from "../../../actions";
import ReactTooltip from "react-tooltip";

interface ReturnProps {
  toggleStatsView(): any;
  menuOn(): any;
}

class Return extends React.Component<ReturnProps> {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <a
                data-tip="return"
                data-for="return"
                className="button is-primary is-rounded"
                onClick={() => {
                  this.props.toggleStatsView();
                  this.props.menuOn();
                }}
              >
                <FontAwesomeIcon icon="arrow-left" size="lg" />
              </a>
              <ReactTooltip
                id="return"
                place="left"
                type="success"
                effect="float"
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleStatsView: () => dispatch(setMain("CHART")),
    menuOn: () => dispatch(setMenu("ON"))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Return);
