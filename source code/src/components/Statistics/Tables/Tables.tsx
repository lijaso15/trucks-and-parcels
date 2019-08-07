import React from "react";
import { connect } from "react-redux";
import Table from "./Table";
import { City, Parcel, Truck } from "hellojest";

interface TablesProps {
  stats: {
    cities: City[];
    parcels: Parcel[];
    trucks: Truck[];
    algorithm: string;
    extra: Parcel[];
    time: Date;
    loadingConfig: {
      algorithm: string;
      parcelPriority: string;
      parcelOrder: string;
      truckOrder: string;
    };
  }[];
}

class Tables extends React.Component<TablesProps> {
  render() {
    const { stats } = this.props;
    if (!stats.length) {
      return (
        <div className="container">
          <div className="title is-danger">
            You have no <strong>experiment</strong> statistics
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          {stats.map(e => {
            return <Table {...e} />;
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    stats: state.stats
  };
};

export default connect(mapStateToProps)(Tables);
