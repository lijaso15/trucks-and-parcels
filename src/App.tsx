import React from "react";
import "./App.css";
import Chart from "./components/Chart";
import Test from "./components/Test";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Statistics from "./components/Statistics";
import "bulma/css/bulma.css";
import {
  faTimes,
  faArrowLeft,
  faRandom
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTimes, faArrowLeft, faRandom);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Test />
        <Menu />
        <Statistics />
        <Chart />
        <Loading />
        <Footer />
      </div>
    );
  }
}

export default App;
