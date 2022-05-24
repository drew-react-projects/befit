import React from "react";
import { Animated, Platform } from "react-native";
import {
  Svg,
  Line,
  Defs,
  LinearGradient as SlinearGradient,
  Stop,
  Text as SText,
  G,
} from "react-native-svg";
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedSText = Animated.createAnimatedComponent(SText);
/**
 * Barchart
 * @param chartWidth : chart width | type : integer
 * @param chartHeight : chart height | type : integer
 * @param chartBarstrokeWidth : chart Bar stroke width | type : integer
 * @param chartdata : chart data | type : array of object with label(string) and value(integer) | example : [{ label: "S", value: 0 },]
 * @param showAvg : show avg line | type : bool
 * @param showLabels : show labels | type : bool
 * @param AnimateBar : enable animate bar | type : bool
 * @returns
 */
export default class Barchart extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* update chart when data is changed */
    if (this.props.chartdata === nextProps.chartdata) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    /* chart data */
    let chartviewboxworkingwidth = 284, //chart working area width (because of spacing, it's different from view box width)
      chartviewboxworkingheight = 64, //chart working area height (because of spacing, it's different from view box height)
      max = this.props.chartdata
        .map((el) => el.value)
        .reduce((a, b) => Math.max(a, b), -Infinity), //finding max number from chart data values
      sum = this.props.chartdata
        .map((el) => el.value)
        .reduce((a, b) => a + b, 0), // sum chart data values
      avg = sum / this.props.chartdata.length || 0, // find chart data values avg
      avgprecentage = (avg * 100) / max, // chart data value avg in precentage
      avgprecentaget = 100 - avgprecentage, // avgprecentage fliped
      avglinestartY = (avgprecentaget * chartviewboxworkingheight) / 100, //finding avg line starting Y position
      avglinestartAnimY = new Animated.Value(64), // chart avg line anime
      spacingX =
        (chartviewboxworkingwidth -
          this.props.chartBarstrokeWidth * this.props.chartdata.length) /
          this.props.chartdata.length +
        this.props.chartBarstrokeWidth, //spacing between each bar
      startpoint = 30, //starting x position for chart to render
      roundcropingfix = this.props.chartBarstrokeWidth / 2; // fixing bar croping
    /* chart animation */
    Animated.timing(avglinestartAnimY, {
      toValue: avglinestartY,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return (
      <Svg
        width={this.props.chartWidth}
        height={this.props.chartHeight}
        viewBox="0 0 302 109"
        fill="none"
      >
        {/*vertical line*/}
        {this.props.chartdata.map((data, i) => {
          let percentage = (data.value * 100) / max, // chart value in precentage
            percentaget = 100 - percentage, // chart value in precentage fliped
            Y =
              (percentaget * chartviewboxworkingheight) / 100 + roundcropingfix, // chart value Y position
            startpointX = i != 0 ? startpoint + spacingX * i : startpoint, // x position of chart value
            animeY = new Animated.Value(69); // chart bar anime
          Animated.timing(animeY, {
            toValue: Y,
            duration: 500,
            useNativeDriver: true,
          }).start();
          return (
            <G key={i}>
              {/* bar background */}
              <Line
                x1={startpointX}
                y1="5"
                x2={startpointX}
                y2="69"
                stroke="url(#paint0_linear)"
                strokeOpacity="0.15"
                strokeWidth={this.props.chartBarstrokeWidth}
                strokeLinecap="round"
              />
              {/* bar */}
              <AnimatedLine
                x1={startpointX}
                y1={this.props.AnimateBar ? animeY : Y}
                x2={startpointX}
                y2="69"
                stroke={`url(#paint${i + 1}_linear)`}
                strokeWidth={this.props.chartBarstrokeWidth}
                strokeLinecap="round"
              />
              {/* label */}
              {this.props.showLabels ? (
                <SText
                  fill="#ffffff"
                  fontSize="14"
                  fontFamily={Platform.OS != "ios" ? "Gilroy-Bold" : ""} //ios fix | ios can't load fonts inside svg for some reason yet
                  fontWeight="bold"
                  x={startpointX}
                  y="105"
                  textAnchor="middle"
                >
                  {data.label}
                </SText>
              ) : null}
            </G>
          );
        })}

        {/*avg line*/}
        {this.props.showAvg ? (
          <G>
            {/* line */}
            <AnimatedLine
              x1="26.5"
              y1={Platform.OS == "ios" ? avglinestartY : avglinestartAnimY}
              x2="301.5"
              y2={Platform.OS == "ios" ? avglinestartY : avglinestartAnimY}
              stroke="#8A8CB3"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeDasharray="1 5"
            />
            {/* label */}
            <AnimatedSText
              fill="#8A8CB2"
              fontSize="10"
              fontFamily={Platform.OS != "ios" ? "Gilroy-Bold" : ""} //ios fix | ios can't load fonts inside svg for some reason yet
              fontWeight="bold"
              x="10"
              y={avglinestartAnimY}
              textAnchor="middle"
            >
              Avg.
            </AnimatedSText>
          </G>
        ) : null}
        {/*avg line*/}
        {/*gradients*/}
        <Defs>
          <SlinearGradient
            id="paint0_linear"
            x1="20"
            y1="74"
            x2="20"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.00323008" stopColor="#8A8CB3" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#8A8CB3" />
          </SlinearGradient>
          {this.props.chartdata.map((data, i) => {
            /* bar gradient for each data value is unique */
            let percentage = (data.value * 100) / max, // chart value in precentage
              percentaget = 100 - percentage, // chart value in precentage fliped
              Y =
                (percentaget * chartviewboxworkingheight) / 100 +
                roundcropingfix; // chart value Y position
            return (
              <SlinearGradient
                key={i}
                id={`paint${i + 1}_linear`}
                x1="20"
                y1="74"
                x2="20"
                y2={Y}
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0.00323008" stopColor="#5652E5" />
                <Stop offset="1" stopColor="#7DA9F4" />
              </SlinearGradient>
            );
          })}
        </Defs>
        {/*gradients*/}
      </Svg>
    );
  }
}
