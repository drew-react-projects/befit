import React from "react";
import { Animated, Easing } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
/**
 * WorkoutProgress
 * @param width : workout progress width | type : integer
 * @param height : workout progress height | type : integer
 * @param percent : workout progress percent | type : integer
 * @param animateCircle : animate workout progress circle | type : bool
 * @returns
 */
export default function WorkoutProgress({
  width,
  height,
  percent,
  animateCircle,
}) {
  const path = require("svg-path-properties");
  const properties = new path.svgPathProperties(
    "M183.268 205C208.105 185.122 224 154.633 224 120.45C224 60.5549 175.199 12 115 12C54.801 12 6 60.5549 6 120.45C6 154.633 21.8947 185.122 46.7316 205"
  ); //workout progress bg path
  const length = properties.getTotalLength(); //get circle total length
  var progress_dash_offset = -1 * (((100 - percent) * 550) / 100), // convert percentage to dash offset
    progress_length = ((100 - percent) * length) / 100, // convert percentage to circle length
    pt = properties.getPointAtLength(progress_length), // get percetage point from circle path
    ptx = Math.round(pt.x), // circle end x position
    pty = Math.round(pt.y), // circle end y position
    progress_Anim = new Animated.Value(-550); // circle progress animation
  Animated.timing(progress_Anim, {
    toValue: progress_dash_offset,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();
  return (
    <Svg width={width} height={height} viewBox="0 0 229 250" fill="none">
      {/* workout progress bg */}
      <Path
        d="M183.268 205C208.105 185.122 224 154.633 224 120.45C224 60.5549 175.199 12 115 12C54.801 12 6 60.5549 6 120.45C6 154.633 21.8947 185.122 46.7316 205"
        stroke="#8A8CB3"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* workout progress path */}
      <AnimatedPath
        d="M183.268 205C208.105 185.122 224 154.633 224 120.45C224 60.5549 175.199 12 115 12C54.801 12 6 60.5549 6 120.45C6 154.633 21.8947 185.122 46.7316 205"
        stroke="#505EDC"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={550}
        strokeDashoffset={progress_Anim}
      />
      {/* workout progress circle */}
      <AnimatedCircle
        cx={
          animateCircle
            ? progress_Anim.interpolate({
                inputRange: [
                  -550,
                  -522.5,
                  -495,
                  -467.5,
                  -440,
                  -412.5,
                  -385,
                  -357.5,
                  -330,
                  -302.5,
                  -275,
                  -247.5,
                  -220,
                  -192.5,
                  -165,
                  -137.5,
                  -110,
                  -82.5,
                  -55,
                  -27.5,
                  0,
                ],
                outputRange: [
                  47,
                  28,
                  15,
                  7,
                  6,
                  12,
                  24,
                  42,
                  64,
                  88,
                  115,
                  142,
                  166,
                  188,
                  206,
                  218,
                  224,
                  223,
                  215,
                  202,
                  183,
                ],
                extrapolate: "clamp",
              })
            : ptx
        }
        cy={
          animateCircle
            ? progress_Anim.interpolate({
                inputRange: [
                  -550,
                  -522.5,
                  -495,
                  -467.5,
                  -440,
                  -412.5,
                  -385,
                  -357.5,
                  -330,
                  -302.5,
                  -275,
                  -247.5,
                  -220,
                  -192.5,
                  -165,
                  -137.5,
                  -110,
                  -82.5,
                  -55,
                  -27.5,
                  0,
                ],
                outputRange: [
                  205,
                  186,
                  163,
                  137,
                  110,
                  84,
                  60,
                  40,
                  25,
                  15,
                  12,
                  15,
                  25,
                  40,
                  60,
                  84,
                  110,
                  137,
                  163,
                  186,
                  205,
                ],
                extrapolate: "clamp",
              })
            : pty
        }
        r="9"
        fill="white"
        stroke="#505EDC"
        strokeWidth="6"
      />
      {/* workout progress 7 circles inside */}
      <Circle
        cx="60.3762"
        cy="182.429"
        r="2.75878"
        fill={percent >= 0 ? "#505EDC" : "#C4C4C4"} // change the color of the circles if the percentage reach its the position
      />
      <Circle
        cx="29.4778"
        cy="117.322"
        r="2.75878"
        fill={percent >= 16 ? "#505EDC" : "#C4C4C4"}
      />
      <Circle
        cx="54.8585"
        cy="57.7324"
        r="2.75878"
        fill={percent >= 32 ? "#505EDC" : "#C4C4C4"}
      />
      <Circle
        cx="115.552"
        cy="34.5586"
        r="2.75878"
        fill={percent >= 48 ? "#505EDC" : "#C4C4C4"}
      />
      <Circle
        cx="175.141"
        cy="57.7324"
        r="2.75878"
        fill={percent >= 64 ? "#505EDC" : "#C4C4C4"}
      />
      <Circle
        cx="200.522"
        cy="117.322"
        r="2.75878"
        fill={percent >= 80 ? "#505EDC" : "#C4C4C4"}
      />
      <Circle
        cx="169.624"
        cy="182.429"
        r="2.75878"
        fill={percent == 100 ? "#505EDC" : "#C4C4C4"}
      />
      {/* workout progress 7 circles inside */}
    </Svg>
  );
}
