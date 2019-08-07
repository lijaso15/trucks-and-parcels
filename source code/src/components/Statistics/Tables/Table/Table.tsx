import React from "react";
import { City, Parcel, Truck } from "hellojest";
import { deleteExperiment } from "../../../../actions";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

interface TableProps {
  cities: City[];
  parcels: Parcel[];
  trucks: Truck[];
  extra: Parcel[];
  algorithm: string;
  time: Date;
  loadingConfig: {
    algorithm: string;
    parcelPriority: string;
    parcelOrder: string;
    truckOrder: string;
  };
  Delete(time: Date): any;
}

class Table extends React.Component<TableProps> {
  render() {
    const {
      cities,
      parcels,
      trucks,
      algorithm,
      loadingConfig,
      extra,
      time,
      Delete
    } = this.props;
    return (
      <div className="box">
        <div className="title">Experiment at {time.toLocaleString()}</div>
        <button
          className="delete"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem"
          }}
          data-tip="delete experiment"
          data-for="delete"
          onClick={() => Delete(time)}
        />
        <ReactTooltip id="delete" place="left" type="dark" effect="float" />

        <table
          className="table"
          style={{
            display: "inline-table",
            marginRight: "1rem"
          }}
        >
          <thead>
            <tr>
              <th> Algorithm </th>
            </tr>
          </thead>
          <tbody>
            {loadingConfig.algorithm === "greedy" && (
              <tr>
                <th />
                <th />
                <th> Parcel Priority </th>
                <th> Parcel Order </th>
                <th> Truck Order </th>
              </tr>
            )}

            <tr>
              <th title="loading"> loading </th>
              {loadingConfig.algorithm === "greedy" ? (
                [
                  <td> {loadingConfig.algorithm}</td>,
                  <td> {loadingConfig.parcelPriority} </td>,
                  <td>{loadingConfig.parcelOrder} </td>,
                  <td> {loadingConfig.truckOrder}</td>
                ]
              ) : (
                <td> {loadingConfig.algorithm} </td>
              )}
            </tr>

            <tr>
              <th title="routing"> routing </th>
              <td title="routing"> {algorithm ? algorithm : "unordered"} </td>
            </tr>
          </tbody>
        </table>
        <table
          className="table"
          style={{
            display: "inline-table",
            marginRight: "1rem"
          }}
        >
          <thead>
            <tr>
              <th> Cities </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th title="name">name</th>
              <th title="x">x</th>
              <th title="y">y</th>
            </tr>
            {cities.map(c => {
              return (
                <tr>
                  <th title="name"> {c.name} </th>
                  <td title="x"> {c.x} </td>
                  <td title="y"> {c.y} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table
          className="table"
          style={{
            display: "inline-table",
            marginRight: "1rem"
          }}
        >
          <thead>
            <tr>
              <th> Parcels </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th title="id"> id </th>
              <th title="destination"> destination </th>
              <th title="volume"> volume </th>
              <th> unloaded </th>
            </tr>
            {parcels.map(p => {
              return (
                <tr>
                  <th title="id"> P{p.pid} </th>
                  <td title="destination"> {p.destination} </td>
                  <td title="volume"> {p.volume} </td>
                  {extra.map(p => p.pid).includes(p.pid) && <th> * </th>}
                </tr>
              );
            })}
          </tbody>
        </table>
        <table
          className="table"
          style={{
            display: "inline-table",
            marginRight: "1rem"
          }}
        >
          <thead>
            <tr>
              <th> Trucks </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th title="id"> id </th>
              <th title="location"> depot location </th>

              <th title="volume"> volume </th>
              <th title="capacity"> capacity </th>
              <th title="fullness"> fullness </th>
              <th title="distance"> total distance </th>
              <th title="parcels"> parcels </th>
              <th title="route"> route </th>
            </tr>
            {trucks.map(t => {
              return (
                <tr>
                  <th title="id"> T{t.tid} </th>
                  <td title="location"> {t.depotLocation} </td>

                  <td title="volume"> {t.volume} </td>
                  <td title="capacity"> {t.capacity} </td>
                  <td title="fullness">
                    {" "}
                    {Math.round((100 * t.volume) / t.capacity)}
                    {"% "}
                  </td>
                  <td title="distance">
                    {t.parcels.length
                      ? Math.round(t.totalDistance(t.parcels))
                      : 0}
                  </td>
                  <th title="parcels">
                    {" "}
                    {t.parcels.map((p, i) => {
                      if (i === t.parcels.length - 1) {
                        return "P" + p.pid;
                      }
                      return "P" + p.pid + ", ";
                    })}{" "}
                  </th>
                  <td title="route">
                    {" "}
                    {t.route.map((p, i) => {
                      if (t.route.length - 1 === i) {
                        return p.destination;
                      }
                      return p.destination + " → ";
                    })}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Delete: time => dispatch(deleteExperiment(time))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Table);
