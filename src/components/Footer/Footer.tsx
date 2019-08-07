import React from "react";
import ShowPath from "./ShowPath";
import MenuToggle from "./MenuToggle";
import Router from "./Router";
import Loader from "./Loader";
import ShowStatistics from "./ShowStatistics";
import { connect } from "react-redux";

interface FooterProps {
  active: boolean;
}

class Footer extends React.Component<FooterProps> {
  render() {
    return (
      this.props.active && (
        <section className="hero is-light is-fullheight">
          <div className="hero-head" />

          <div className="hero-body" />

          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                <ul
                  style={{
                    backgroundColor: "white"
                  }}
                >
                  <MenuToggle />
                  <Loader />
                  <Router />
                  <ShowPath />
                  <ShowStatistics />
                </ul>
              </div>
            </nav>
          </div>
        </section>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    active: !(state.main === "stats")
  };
};

export default connect(mapStateToProps)(Footer);
