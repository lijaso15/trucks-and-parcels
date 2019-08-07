import React from "react";
import { connect } from "react-redux";
import { setMenu } from "../../../actions";
import ReactTooltip from "react-tooltip";

interface MenuToggleProps {
  toggleMenuActive(): any;
  active: boolean;
}

class MenuToggle extends React.Component<MenuToggleProps> {
  render() {
    return [
      <li
        data-tip={this.props.active ? "CLOSE MENU" : "OPEN MENU"}
        data-for="menu"
        onClick={() => this.props.toggleMenuActive()}
      >
        <a>Menu</a>
      </li>,
      <ReactTooltip id="menu" place="top" type="dark" effect="float" />
    ];
  }
}

const mapStateToProps = state => {
  return {
    active: state.menu.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuActive: () => dispatch(setMenu("ACTIVE"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuToggle);
