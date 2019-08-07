import React from "react";
import PointContainer from "../PointContainer";

class Menu extends React.Component {
  render() {
    return (
      <aside
        className="menu"
        style={{
          position: "absolute",
          height: "100%",
          width: "25%"
        }}
      >
        <PointContainer isTruck={false} />
        <PointContainer isTruck={true} />
      </aside>
    );
  }
}

export default Menu;
