import React from "react";
import PointContainer from "../PointContainer";

class Menu extends React.Component {
  render() {
    return (
      <aside
        className="menu"
        style={{
          position: "absolute",
          maxHeight: "100%",
          width: "25%",
          overflow: "auto"
        }}
      >
        <PointContainer isTruck={false} />
        <PointContainer isTruck={true} />
      </aside>
    );
  }
}

export default Menu;
