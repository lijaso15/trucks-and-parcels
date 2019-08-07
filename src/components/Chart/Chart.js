import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import $ from "jquery";
import { setData, setStats } from "../../actions";
import d3Tip from "d3-tip";
import { run } from "../../utils";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.drawPoints = this.drawPoints.bind(this);
    this.drawPointsPath = this.drawPointsPath.bind(this);
  }

  componentDidMount() {
    this.drawPoints();
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.drawPoints();
      if (this.props.drawPath) {
        this.drawPointsPath();
        while (document.querySelector("#chart").childElementCount > 2) {
          document.querySelector("#chart").firstChild.remove();
        }
      } else {
        while (document.querySelector("#chart").childElementCount > 1) {
          document.querySelector("#chart").firstChild.remove();
        }
      }
    }
  }

  drawPoints() {
    var height = $(window).height() - 48,
      width = this.props.isFullSize
        ? $(window).width() - 13
        : $(window).width() - $(window).width() * 0.25,
      svgContainer = d3
        .select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var xCoords = this.props.points.map(p => p.x);
    var yCoords = this.props.points.map(p => p.y);

    const limit =
      d3.max(xCoords) > d3.max(yCoords) ? d3.max(xCoords) : d3.max(yCoords);

    var linearScaleX = d3.scaleLinear([0, limit * 1.1], [0, width]);
    var linearScaleY = d3.scaleLinear([0, limit * 1.1], [height, 0]);

    var y_axis = d3.axisLeft().scale(linearScaleY);

    svgContainer
      .append("g")
      .attr("transform", "translate(30, -20)")
      .call(y_axis);

    // Add scales to axis
    var x_axis = d3.axisBottom().scale(linearScaleX);

    //Append group and insert axis
    svgContainer
      .append("g")
      .attr("transform", "translate(30," + (height - 20) + ")")
      .call(x_axis);

    var data = this.props.points
      .filter(
        p =>
          typeof p.x === "number" &&
          typeof p.y === "number" &&
          typeof p.value === "number"
      )
      .map(p => {
        return {
          ...p,
          scaledX: linearScaleX(p.x),
          scaledY: linearScaleY(p.y)
        };
      });

    if (!this.props.called) {
      this.props.setData(data);
    }

    /* Initialize tooltip */
    var tip = d3Tip()
      .attr("class", "d3-tip")
      .html(function(d) {
        return d.name + ": (" + String(d.x) + ", " + String(d.y) + " )";
      });

    // /* Invoke the tip in the context of your visualization */
    svgContainer.call(tip);

    var circles = svgContainer
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("transform", "translate(30, -20)")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    circles
      .attr("cx", function(d) {
        return d.scaledX;
      })
      .attr("cy", function(d) {
        return d.scaledY;
      })
      .attr("r", function(d) {
        return 7;
      })
      .style("fill", function(d) {
        return d.isTruck ? "hsl(48, 100%, 67%)" : "hsl(217, 71%, 53%)";
      });
  }

  drawPointsPath() {
    //Make an SVG Container
    var height = $(window).height() - 32,
      width = this.props.isFullSize
        ? $(window).width() - 13
        : $(window).width() - $(window).width() * 0.25,
      svgContainer = d3
        .select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    run(this.props.data, this.props.config).trucks.map(t => {
      let arr = [t.tid];
      t.route.map(p => {
        arr.push(p.pid);
      });
      arr = arr.map(id => {
        return this.props.data.filter(p => p.id === id)[0];
      });
      arr.push(this.props.data.filter(p => p.id === t.tid)[0]);
      for (let i = 0; i < arr.length - 1; i++) {
        //Draw the line
        svgContainer
          .append("line")
          .attr("x1", arr[i].scaledX)
          .attr("y1", arr[i].scaledY)
          .attr("x2", arr[i + 1].scaledX)
          .attr("y2", arr[i + 1].scaledY)
          .attr("stroke-width", 2)
          .attr("stroke", "black")
          .attr("transform", "translate(30, -20)");
      }
    });
  }

  render() {
    const { isFullSize, drawPath, active, calledDraw } = this.props;
    if (drawPath === true && calledDraw === false) {
      let res = run(this.props.data, this.props.config);
      this.props.setStats(res);
    }
    return (
      active && (
        <svg
          id="chart"
          style={{
            position: "absolute",
            top: 0,
            left: isFullSize ? "10pt" : "25%",
            width: "100%",
            height: "100%"
          }}
        />
      )
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setData: data => dispatch(setData(data)),
    setStats: data => dispatch(setStats(data))
  };
};
const mapStateToProps = state => {
  return {
    called: state.called.setData,
    points: state.points,
    isFullSize: !state.menu.active,
    drawPath: state.draw,
    data: state.data,
    active: state.main === "chart",
    config: state.loading,
    calledDraw: state.called.setStats
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
