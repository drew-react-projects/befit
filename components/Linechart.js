import React from "react";
import { Animated, Easing, Platform } from "react-native";
import {
  Svg,
  Line,
  Defs,
  LinearGradient as SlinearGradient,
  Stop,
  Text as SText,
  G,
  Path,
} from "react-native-svg";
const AnimatedPath = Animated.createAnimatedComponent(Path);
/**
 * Linechart
 * @param chartWidth : chart width | type : integer
 * @param chartHeight : chart height | type : integer
 * @param chartdata : chart data | type : array of object with label(string) and value(integer) | example : [{ label: "S", value: 0 },]
 * @param chartdatamaxvalue : chart data max value | type : integer
 * @param showAvg : show avg line | type : bool
 * @param showLabels : show labels | type : bool
 * @param AnimateLine : enable animate line | type : bool
 * @param showGrid : show chart background grid | type : bool
 * @returns
 */
export default class Linechart extends React.Component {
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
    let chartviewboxworkingwidth = 264, //chart working area width (because of spacing, it's different from view box width)
      chartviewboxworkingheight = 70, //chart working area height (because of spacing, it's different from view box height)
      max = this.props.chartdatamaxvalue
        ? this.props.chartdatamaxvalue
        : this.props.chartdata
            .map((el) => el.value)
            .reduce((a, b) => Math.max(a, b), -Infinity), //finding max number from chart data values
      sum = this.props.chartdata
        .map((el) => el.value)
        .reduce((a, b) => a + b, 0), // sum chart data values
      avg = sum / this.props.chartdata.length || 0, // find chart data values avg
      avgprecentage = (avg * 100) / max, // chart data value avg in precentage
      avglinestartY = (avgprecentage * chartviewboxworkingheight) / 100, //finding avg line starting Y position
      parsedata = [], // chart data value parse
      cropfixh = 5, // fixing line croping height
      startX = 30, // start x position for chart to render from viewbox
      spacingX =
        (chartviewboxworkingwidth + startX) / this.props.chartdata.length, //spacing between each line
      xstartpoint = startX, //starting x position for chart to render
      Ystartpoint = 50, //starting Y position for chart to render
      PathAnim = new Animated.Value(1000); // chart path anime
    /* chart animation */
    Animated.timing(PathAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    /* parse chart data */
    this.props.chartdata.map((data) => {
      //parsing chart values , turing values to x and Y positon
      let y =
        chartviewboxworkingheight -
        cropfixh -
        (data.value / max) * (chartviewboxworkingheight - cropfixh) +
        Ystartpoint;
      parsedata.push([xstartpoint, y]);
      xstartpoint += spacingX;
    });
    return (
      <Svg
        width={this.props.chartWidth}
        height={this.props.chartHeight}
        viewBox="0 0 302 171"
        fill="none"
      >
        {/*vertical lines*/}
        {parsedata.map((data, i) => {
          return (
            <G key={i}>
              {/* grid */}
              {this.props.showGrid ? (
                <Line
                  x1={data[0]}
                  y1="-2.18557e-08"
                  x2={data[0]}
                  y2="171"
                  stroke="url(#paint0_linear)"
                  strokeDasharray="1 5"
                />
              ) : null}
              {/* label */}
              {this.props.showLabels ? (
                <SText
                  fill="#ffffff"
                  fontSize="14"
                  fontFamily={Platform.OS != "ios" ? "Gilroy-Bold" : ""} //ios fix | ios can't load fonts inside svg for some reason yet
                  fontWeight="bold"
                  x={data[0]}
                  y="151"
                  textAnchor="middle"
                >
                  {this.props.chartdata[i].label}
                </SText>
              ) : null}
            </G>
          );
        })}

        {/*vertical lines*/}
        {/*avg line*/}
        {this.props.showAvg ? (
          <G>
            {/* line */}
            <Line
              x1="26.5"
              y1={avglinestartY + Ystartpoint}
              x2="301.5"
              y2={avglinestartY + Ystartpoint}
              stroke="#8A8CB3"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeDasharray="1 5"
            />
            {/* text */}
            <SText
              fill="#8A8CB2"
              fontSize="10"
              fontFamily={Platform.OS != "ios" ? "Gilroy-Bold" : ""} //ios fix | ios can't load fonts inside svg for some reason yet
              fontWeight="bold"
              x="10"
              y={avglinestartY + Ystartpoint}
              textAnchor="middle"
            >
              Avg.
            </SText>
          </G>
        ) : null}
        {/*avg line*/}
        {/*graph line*/}
        <AnimatedPath
          d={svgPath(parsedata, bezierCommand)} //pas parse data to svg path function to return svg path d
          stroke="url(#paint7_linear)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={this.props.AnimateLine ? 1000 : 0}
          strokeDashoffset={this.props.AnimateLine ? PathAnim : null}
        />
        {/*graph dot lines*/}
        <AnimatedPath
          d={svgPath(parsedata, bezierCommand)} //pas parse data to svg path function to return svg path d
          stroke="#3C3F69"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={"1 4"}
        />
        {/*gradients*/}
        <Defs>
          <SlinearGradient
            id="paint0_linear"
            x1="26"
            y1="171"
            x2="26"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3C3F69" />
            <Stop offset="0.0001" stopColor="#3C3F69" stopOpacity="0" />
            <Stop offset="0.514034" stopColor="#8A8CB3" />
            <Stop offset="1" stopColor="#3C3F69" stopOpacity="0" />
          </SlinearGradient>
          <SlinearGradient
            id="paint7_linear"
            x1="291"
            y1="42"
            x2="29.5"
            y2="123"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#3C3F69" stopOpacity="0" />
            <Stop offset="0.179336" stopColor="#94CF76" />
            <Stop offset="0.803064" stopColor="#5652E5" />
            <Stop offset="1" stopColor="#3C3F69" stopOpacity="0" />
          </SlinearGradient>
        </Defs>
      </Svg>
    );
  }
}
