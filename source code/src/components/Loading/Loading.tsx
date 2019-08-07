import React from "react";
import { connect } from "react-redux";
import { setLoading, setMain } from "../../actions";

interface LoadingProps {
  isFullSize: boolean;
  active: boolean;
  selected: {
    algorithm: string;
    parcelPriority: string;
    parcelOrder: string;
    truckOrder: string;
  };

  setAL(value: string): any;
  setTO(value: string): any;
  setPP(value: string): any;
  setPO(value: string): any;
  close(): any;
}

interface LoadingState {
  isGreedy: boolean;
}

class Loading extends React.Component<LoadingProps, LoadingState> {
  constructor(props) {
    super(props);
    this.state = {
      isGreedy: this.selectedToIndices()[0] === 1
    };
    this.handleAlgorithmSelection = this.handleAlgorithmSelection.bind(this);
    this.selectedToIndices = this.selectedToIndices.bind(this);
    this.handlePPSelection = this.handlePPSelection.bind(this);
    this.handlePOSelection = this.handlePOSelection.bind(this);
    this.handleTOSelection = this.handleTOSelection.bind(this);
  }

  componentDidMount() {
    const al = document.querySelector("#algorithm") as HTMLSelectElement;
    const selected = this.selectedToIndices();
    al.selectedIndex = selected[0];
    if (selected[0] === 1) {
      //greedy
      const pp = document.querySelector("#parcelPriority") as HTMLSelectElement;
      const po = document.querySelector("#parcelOrder") as HTMLSelectElement;
      const to = document.querySelector("#truckOrder") as HTMLSelectElement;
      console.log(selected);
      pp.selectedIndex = selected[1];
      po.selectedIndex = selected[2];
      to.selectedIndex = selected[3];
    }
  }

  selectedToIndices(): number[] {
    const { selected } = this.props;
    let res: number[] = [];

    switch (selected.algorithm) {
      case "greedy":
        res.push(1);
        break;
      case "random":
        res.push(2);
        break;
      default:
        res.push(0);
    }
    switch (selected.parcelPriority) {
      case "destination":
        res.push(1);
        break;
      default:
        res.push(0);
    }
    switch (selected.parcelOrder) {
      case "non-decreasing":
        res.push(1);
        break;
      default:
        res.push(0);
    }
    switch (selected.truckOrder) {
      case "non-decreasing":
        res.push(1);
        break;
      default:
        res.push(0);
    }
    return res;
  }

  indicesToSelected() {}

  handleAlgorithmSelection(e) {
    if (e.target.selectedIndex === 1) {
      this.setState({
        isGreedy: true
      });
    } else {
      this.setState({
        isGreedy: false
      });
    }
    switch (e.target.selectedIndex) {
      case 1:
        this.props.setAL("greedy");
        break;
      case 2:
        this.props.setAL("random");
        break;
      default:
        this.props.setAL("default");
    }
  }
  handlePPSelection(e) {
    switch (e.target.selectedIndex) {
      case 1:
        this.props.setPP("destination");
        break;
      default:
        this.props.setPP("volume");
    }
  }
  handlePOSelection(e) {
    switch (e.target.selectedIndex) {
      case 1:
        this.props.setPO("non-decreasing");
        break;
      default:
        this.props.setPO("non-increasing");
    }
  }

  handleTOSelection(e) {
    switch (e.target.selectedIndex) {
      case 1:
        this.props.setTO("non-decreasing");
        break;
      default:
        this.props.setTO("non-increasing");
    }
  }

  render() {
    const { isFullSize, active, close } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: isFullSize ? "10pt" : "25%",
          width: "100%",
          height: "100%",
          display: active ? "block" : "none"
        }}
      >
        <div className="box">
          <div className="subtitle">Select Loading Algorithm</div>
          <div className="select">
            <select onChange={this.handleAlgorithmSelection} id="algorithm">
              <option>default</option>
              <option>greedy</option>
              <option>random</option>
            </select>
          </div>
        </div>
        {this.state.isGreedy && (
          <div className="box">
            <div className="subtitle">Select Configurations</div>
            <div className="field">
              <label className="label">Parcel Priority</label>
              <div className="control">
                <div className="select">
                  <select id="parcelPriority" onChange={this.handlePPSelection}>
                    <option> volume </option>
                    <option> destination </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Parcel Order</label>
              <div className="control">
                <div className="select">
                  <select id="parcelOrder" onChange={this.handlePOSelection}>
                    <option> non-increasing </option>
                    <option> non-decreasing </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Truck Order</label>
              <div className="control">
                <div className="select">
                  <select id="truckOrder" onChange={this.handleTOSelection}>
                    <option> non-increasing </option>
                    <option> non-decreasing </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="button is-primary" onClick={() => close()}>
          save changes
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.main === "loading",
    isFullSize: !state.menu.active,
    selected: state.loading
  };
};

const dispatchToProps = dispatch => {
  return {
    setAL: value => dispatch(setLoading("AL", value)),
    setPP: value => dispatch(setLoading("PP", value)),
    setPO: value => dispatch(setLoading("PO", value)),
    setTO: value => dispatch(setLoading("TO", value)),
    close: () => dispatch(setMain("CHART"))
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Loading);
