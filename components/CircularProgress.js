import React from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import {
  Svg,
  Defs,
  LinearGradient as SlinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
/**
 * CircularProgress
 * @param width : circular progress width | type : integer
 * @param height : circular progress height | type : integer
 * @param percent : circular progress percent | type : integer
 * @param icon : circular progress icon | type : image
 * @returns
 */
export default class CircularProgress extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* update progress when percent is changed */
    if (this.props.percent === nextProps.percent) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    /* chart data */
    var weightpercentageanime = new Animated.Value(100);
    /* chart animation */
    Animated.timing(weightpercentageanime, {
      toValue: 100 - this.props.percent,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return (
      <View>
        <Image
          source={require("./../assets/challenges/progressbg.png")}
          style={styles.chartdataprogressbg}
        />
        <Image source={this.props.icon} style={styles.chartdataprogressicon} />
        <Svg
          width={this.props.width}
          height={this.props.height}
          viewBox="0 0 35 35"
          fill="none"
          style={styles.chartdataprogresssvg}
        >
          <AnimatedCircle
            cx="17"
            cy="17"
            r="15.5"
            fill="transparent"
            stroke="url(#paint0_linear)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="98"
            strokeDashoffset={weightpercentageanime}
          />
          <Defs>
            <SlinearGradient
              id="paint0_linear"
              x1="17"
              y1="2.00012"
              x2="27"
              y2="27.5001"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#5652E5" />
              <Stop offset="1" stopColor="#F85365" />
            </SlinearGradient>
          </Defs>
        </Svg>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chartdataprogressbg: {
    position: "absolute",
    width: 56,
    height: 56,
    top: 0,
    right: 0,
    resizeMode: "contain",
  },
  chartdataprogresssvg: {
    marginTop: -2,
    transform: [{ rotate: "-90deg" }],
  },
  chartdataprogressicon: {
    position: "absolute",
    width: 24,
    height: 24,
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: -12,
    resizeMode: "contain",
  },
});
