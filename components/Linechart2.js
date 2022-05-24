import React from "react";
import { Animated, Easing } from "react-native";
import {
  Svg,
  Line,
  Defs,
  LinearGradient as SlinearGradient,
  Stop,
  Path,
  G,
} from "react-native-svg";
const AnimatedPath = Animated.createAnimatedComponent(Path);
/**
 * Linechart2
 * @param chartWidth : chart width | type : integer
 * @param chartHeight : chart height | type : integer
 * @param chartdata : chart data | type : array of chart value
 * @param chartdatamaxvalue : chart data max value | type : integer
 * @param AnimateLine : enable animate line | type : bool
 * @param showGrid : show chart background grid | type : bool
 * @returns
 */
export default class Linechart2 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* update chart when data is changed */
    if (this.props.chartdata === nextProps.chartdata) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    const svgPath = (points, command) => {
      //Convert point data to svg path
      const d = points.reduce(
        (acc, point, i, a) =>
          i === 0
            ? `M2 ${point[1]}` // move to the first point
            : `${acc} ${command(point, i, a)}`, // use a command for the rest of the points ( bezierCommand )
        ""
      );
      return d; // return path (svg path d)
    };
    const line = (pointA, pointB) => {
      const lengthX = pointB[0] - pointA[0];
      const lengthY = pointB[1] - pointA[1];
      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
      };
    };
    const controlPoint = (current, previous, next, reverse) => {
      const p = previous || current;
      const n = next || current; // The smoothing ratio
      const smoothing = 0.2; // Properties of the opposed-line
      const o = line(p, n); // If is end-control-point, add PI to the angle to go backward
      const angle = o.angle + (reverse ? Math.PI : 0);
      const length = o.length * smoothing; // The control point position is relative to the current point
      const x = current[0] + Math.cos(angle) * length;
      const y = current[1] + Math.sin(angle) * length;
      return [x, y];
    };
    const bezierCommand = (point, i, a) => {
      // start control point
      const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point); // end control point
      const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
      return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    };
    /* chart data */
    let chartviewboxworkingwidth = 165,
      chartviewboxworkingheight = 164,
      max = this.props.chartdatamaxvalue ? this.props.chartdatamaxvalue : this.props.chartdata.reduce((a, b) => Math.max(a, b), -Infinity), //finding max number from chart data values
      parsedata = [], // chart data value parse
      spacingX = chartviewboxworkingwidth / (this.props.chartdata.length - 1), //spacing between each line
      xstartpoint = 0, //starting x position for chart to render
      PathAnim = new Animated.Value(500); // chart path anime
    /* chart animation */
    Animated.timing(PathAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    /* parse chart data */
    this.props.chartdata.map((data, i) => {
      //parsing chart values , turing values to x and Y positon
      let y =
        chartviewboxworkingheight - (data / max) * chartviewboxworkingheight;
      parsedata.push([xstartpoint, y]);
      xstartpoint += spacingX;
    });
    var chartpath = svgPath(parsedata, bezierCommand); //pas parse data to svg path function to return svg path d
    return (
      <Svg
        width={this.props.chartWidth}
        height={this.props.chartHeight}
        viewBox="0 0 165 164"
        fill="none"
        style={{ marginTop: -20 }}
      >
        {/* chart path */}
        <AnimatedPath
          d={chartpath}
          stroke="url(#paint0_linear)"
          strokeWidth="2"
          strokeDasharray={this.props.AnimateLine ? 500 : 0}
          strokeDashoffset={this.props.AnimateLine ? PathAnim : null}
        />
        {/* chart path background gradient */}
        <Path
          opacity="0.1"
          d={chartpath + ` V 162 H 0 V ${parsedata[0]}`}
          fill="url(#paint1_linear)"
        />
        {/* chart grid */}
        {this.props.showGrid ? (
          <G>
            <Line
              x1="40.5"
              x2="40.5"
              y2="164"
              stroke="url(#paint2_linear)"
              strokeDasharray="1 5"
            />
            <Line
              x1="82.5"
              x2="82.5"
              y2="164"
              stroke="url(#paint3_linear)"
              strokeDasharray="1 5"
            />
            <Line
              x1="124.5"
              x2="124.5"
              y2="164"
              stroke="url(#paint4_linear)"
              strokeDasharray="1 5"
            />
          </G>
        ) : null}

        {/* chart grid */}
        {/* gradients */}
        <Defs>
          <SlinearGradient
            id="paint0_linear"
            x1="164"
            y1="50"
            x2="4.5"
            y2="107.5"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FB558B" stopOpacity="0" />
            <Stop offset="0.261464" stopColor="#E95694" />
            <Stop offset="0.706385" stopColor="#655DD2" />
            <Stop offset="1" stopColor="#505EDC" stopOpacity="0" />
          </SlinearGradient>
          <SlinearGradient
            id="paint1_linear"
            x1="82.75"
            y1="71"
            x2="82.75"
            y2="162"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#505EDC" />
            <Stop offset="1" stopColor="#505EDC" stopOpacity="0" />
          </SlinearGradient>
          <SlinearGradient
            id="paint2_linear"
            x1="40"
            y1="164"
            x2="40"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3C3F69" />
            <Stop offset="0.0001" stopColor="#3C3F69" stopOpacity="0" />
            <Stop offset="0.514034" stopColor="#8A8CB3" />
            <Stop offset="1" stopColor="#3C3F69" stopOpacity="0" />
          </SlinearGradient>
          <SlinearGradient
            id="paint3_linear"
            x1="82"
            y1="164"
            x2="82"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3C3F69" />
            <Stop offset="0.0001" stopColor="#3C3F69" stopOpacity="0" />
            <Stop offset="0.514034" stopColor="#8A8CB3" />
            <Stop offset="1" stopColor="#3C3F69" stopOpacity="0" />
          </SlinearGradient>
          <SlinearGradient
            id="paint4_linear"
            x1="124"
            y1="164"
            x2="124"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3C3F69" />
            <Stop offset="0.0001" stopColor="#3C3F69" stopOpacity="0" />
            <Stop offset="0.514034" stopColor="#8A8CB3" />
            <Stop offset="1" stopColor="#3C3F69" stopOpacity="0" />
          </SlinearGradient>
        </Defs>
        {/* gradients */}
      </Svg>
    );
  }
}
