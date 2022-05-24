import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Linechart from "../components/Linechart";
import Barchart from "../components/Barchart";
import CircularProgress from "../components/CircularProgress";
import WaterProgress from "../components/WaterProgress";
//import Navigation from "../components/Navigation";
const window = Dimensions.get("window");
/**
 * Chartbox
 * @param title : chart box title | type : string
 * @param number : chart box number | type : integer
 * @param unit : chart box unit | type : string
 * @param chartStyle : chart box chart Style | type : style
 * @param children : chart box children | type : react element
 */
const Chartbox = ({ title, number, unit, chartStyle, children }) => {
  return (
    <LinearGradient
      start={{ x: 0.04, y: -0.1 }}
      end={{ x: 0.09, y: 1.72 }}
      colors={[
        "rgba(86,82,229,1)",
        "rgba(138,140,178,0)",
        "rgba(138,140,178,0)",
        "rgba(125,169,244,0.5)",
      ]}
      locations={[0, 0.348069, 0.596479, 1]}
      style={styles.chartboxborder}
    >
      <View style={styles.chartboxinside}>
        {/*chart title start*/}
        <View style={styles.chartboxtitle}>
          <Text style={styles.chartboxtitleh}>{title}</Text>
          <View style={styles.chartboxtitledata}>
            <Text style={styles.chartboxtitledatanumber}>{number}</Text>
            <Text style={styles.chartboxtitledataunit}>{unit}</Text>
          </View>
        </View>
        {/*chart title end*/}
        {/*chart graph start*/}
        <View style={chartStyle}>{children}</View>
        {/*chart graph end*/}
      </View>
    </LinearGradient>
  );
};
/**
 * Chartrowbox
 * @param title : chart box row title | type : string
 * @param number : chart box row number | type : integer
 * @param totalnumber : chart box row totalnumber | type : integer
 * @param unit : chart box unit | type : string
 * @param children : chart box children | type : react element
 * @param buttonText : chart box button Text | type : string
 * @param onPress : chart box button onPress | type : function
 * @param borderStyle : chart box border style | type : style
 */
const Chartrowbox = ({
  title,
  number,
  totalnumber,
  unit,
  children,
  buttonText,
  onPress,
  borderStyle,
}) => {
  return (
    <LinearGradient
      start={{ x: 0.04, y: -0.1 }}
      end={{ x: 0.09, y: 1.72 }}
      colors={[
        "rgba(86,82,229,1)",
        "rgba(138,140,178,0)",
        "rgba(138,140,178,0)",
        "rgba(125,169,244,0.5)",
      ]}
      locations={[0, 0.348069, 0.596479, 1]}
      style={[styles.chartrowboxborder, borderStyle]}
    >
      <ImageBackground
        source={require("./../assets/chartrowbg.png")}
        style={styles.chartrowboxinside}
      >
        {/*chart title start*/}
        <View style={[styles.chartboxtitle, styles.chartrowboxtitle]}>
          {/*chart title*/}
          <Text style={styles.chartboxtitleh}>{title}</Text>
          <View style={styles.chartboxtitledata}>
            {/*chart number*/}
            <Text style={styles.chartboxtitledatanumber}>{number}</Text>
            <Text style={styles.chartboxtitledatadash}>/</Text>
            <View style={styles.chartboxtitledatatotal}>
              {/*chart totalnumber*/}
              <Text style={styles.chartboxtitledatatotalnumber}>
                {totalnumber}
              </Text>
              {/*chart unit*/}
              <Text style={styles.chartboxtitledatatotalunit}>{unit}</Text>
            </View>
          </View>
        </View>
        {/*chart title end*/}
        {/*chart graph start*/}
        <View style={styles.chartboxgraph3}>{children}</View>
        {/*chart graph end*/}
        {/*chart action start*/}
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          {/*chart action btn*/}
          <LinearGradient
            start={{ x: 0.88, y: 1.21 }}
            end={{ x: 0.56, y: 0.5 }}
            colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0)"]}
            style={styles.btnborder}
          >
            <LinearGradient
              start={{ x: 0.24, y: -0.09 }}
              end={{ x: 0.5, y: 1 }}
              colors={["#7773FA", "#5652E5"]}
              style={styles.btnbg}
            >
              <Text style={styles.btntext}>{buttonText}</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
        {/*chart action end*/}
      </ImageBackground>
    </LinearGradient>
  );
};
/**
 * Today
 * figma page names : Today
 */
export default class Today extends React.Component {
  state = {
    activeaction: "Today", //active action title
    actions_Animx: new Animated.Value(0), //actions Animate
    chartdata: [
      /**
       * chart data item
       * label string
       * value integer
       */
      { label: "S", value: 0 },
      { label: "M", value: 0 },
      { label: "T", value: 80 },
      { label: "W", value: 40 },
      { label: "T", value: 75 },
      { label: "F", value: 0 },
      { label: "S", value: 80 },
    ],
    weightpercent: 65, //weight percent
    waterpercent: 75, //water percent
  };
  _render_toolbar_action(firsttext, secondtext) {
    /**
     * _render_toolbar_action
     * render toolbar action
     * @param firsttext : toolbar action
     */
    return (
      <View style={styles.actions}>
        {/* action animate bg*/}
        <Animated.View
          style={[
            styles.actionsbg,
            { transform: [{ translateX: this.state.actions_Animx }] },
          ]}
        />
        {/* action btn */}
        <TouchableOpacity
          onPress={() => {
            this.animate_toolbar_action(firsttext);
          }}
          style={styles.action}
        >
          <Text
            style={[
              styles.actiontext,
              this.state.activeaction == firsttext ? styles.actionactive : {},
            ]}
          >
            {firsttext}
          </Text>
        </TouchableOpacity>
        {/* action btn */}
        <TouchableOpacity
          onPress={() => {
            this.animate_toolbar_action(secondtext);
          }}
          style={styles.action}
        >
          <Text
            style={[
              styles.actiontext,
              this.state.activeaction == secondtext ? styles.actionactive : {},
            ]}
          >
            {secondtext}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  animate_toolbar_action = (name) => {
    /* animate toolbar action */
    this.setState({ activeaction: name });
    if (name == "Today")
      Animated.timing(this.state.actions_Animx, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    else
      Animated.timing(this.state.actions_Animx, {
        toValue: styles.actions.width / 2 - 4.5,
        duration: 500,
        useNativeDriver: true,
      }).start();
  };
  render() {
    return (
      <ImageBackground
        source={require("./../assets/bg2.png")}
        style={styles.bg}
      >
        <SafeAreaView style={styles.container}>
          {/*toolbar start*/}
          <View style={styles.topbar}>
            {/*toolbar title start*/}
            <View style={styles.title}>
              <MaskedView
                style={styles.masklabel}
                maskElement={
                  <View style={styles.masklabelview}>
                    <Text style={styles.masklabeltext}>Daily</Text>
                  </View>
                }
              >
                <Image
                  source={require("./../assets/pagetitlemask.png")}
                  style={styles.masklabelimg}
                />
              </MaskedView>
            </View>
            {/*toolbar title end*/}
            {/*toolbar actions start*/}
            {this._render_toolbar_action("Today", "All Days")}
            {/*toolbar actions end*/}
          </View>
          {/*toolbar end*/}
          <ScrollView
            style={styles.containerscroll}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/*chart start*/}
            <Chartbox
              title="Weekly Effrot"
              number="45"
              unit="min"
              chartStyle={styles.chartboxgraph}
            >
              <Linechart
                chartWidth="302"
                chartHeight="171"
                chartdata={this.state.chartdata}
                showAvg={true}
                showLabels={true}
                AnimateLine={true}
                showGrid={true}
                chartdatamaxvalue={100}
              />
            </Chartbox>
            {/*chart end*/}
            {/*chart start*/}
            <Chartbox
              title="Weekly Calories"
              number="590"
              unit="Kcal"
              chartStyle={styles.chartboxgraph2}
            >
              <Barchart
                chartWidth="302"
                chartHeight="109"
                chartBarstrokeWidth={10}
                chartdata={this.state.chartdata}
                showAvg={true}
                showLabels={true}
                AnimateBar={true}
              />
            </Chartbox>
            {/*chart end*/}
            {/*chart row start*/}
            <View style={styles.chartboxrow}>
              {/*chart start*/}
              <Chartrowbox
                title="Weight"
                number="590"
                totalnumber="7.6"
                unit="LEFT"
                buttonText="Change"
                onPress={() => {
                  this.setState({
                    weightpercent: Math.floor(Math.random() * 100) + 1, //randomize between 1-100
                  });
                }}
                borderStyle={{ marginRight: 16 }}
              >
                <CircularProgress
                  width="58"
                  height="58"
                  percent={this.state.weightpercent}
                  icon={require("./../assets/challenges/weighticon.png")}
                />
              </Chartrowbox>
              {/*chart end*/}
              {/*chart start*/}
              <Chartrowbox
                title="Water"
                number="3"
                totalnumber="5"
                unit="LEFT"
                buttonText="Drink"
                onPress={() => {
                  this.setState({
                    waterpercent: Math.floor(Math.random() * 100) + 1, //randomize between 1-100
                  });
                }}
              >
                <WaterProgress
                  width={58}
                  height={58}
                  percent={this.state.waterpercent}
                />
              </Chartrowbox>
              {/*chart end*/}
            </View>
          </ScrollView>
          {/*navigation start (remove comment when you don't want to use react native navigation bottom tab)*/}
          {/*<Navigation activepageindex={3} />*/}
          {/*navigation end*/}
          <StatusBar style="light" />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    paddingTop: 44,
    backgroundColor: "#1A1735",
  },
  topbar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  title: {
    flex: 1,
    height: 37,
  },
  masklabelview: {
    backgroundColor: "transparent",
    height: 37,
    alignItems: "flex-start",
  },
  masklabeltext: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  masklabelimg: {
    resizeMode: "contain",
    width: "100%",
    height: 199,
    marginLeft: -20,
    marginTop: -37,
  },
  actions: {
    width: 171,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#3C3F69",
    flexDirection: "row",
  },
  actionsbg: {
    position: "absolute",
    width: "50%",
    height: 31,
    borderRadius: 4,
    backgroundColor: "#141227",
    top: 2,
    left: 2,
  },
  action: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actiontext: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 14,
    color: "#8A8CB2",
    textAlign: "center",
  },
  actionactive: {
    color: "#ffffff",
  },
  containerscroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chartboxborder: {
    borderRadius: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    height: 174,
    marginBottom: 15,
  },
  chartboxinside: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#3C3F69",
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  chartboxtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartboxtitleh: {
    fontFamily: "Gilroy-Bold",
    fontSize: window.width <= 320 ? 14 : 16, //responsive fix
    color: "#ffffff",
    flex: 1,
  },
  chartboxtitledata: {
    flexDirection: "row",
  },
  chartboxtitledatanumber: {
    fontFamily: "Gilroy-Bold",
    fontSize: window.width <= 320 ? 18 : 20, //responsive fix
    color: "#ffffff",
  },
  chartboxtitledataunit: {
    fontFamily: "Gilroy-Bold",
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.5,
    marginLeft: 5,
    alignSelf: "flex-end",
    marginBottom: 2,
  },
  chartboxgraph: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -151,
  },
  chartboxgraph2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chartboxrow: {
    flexDirection: "row",
  },
  chartrowboxborder: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    height: 174,
    overflow: "hidden",
  },
  chartrowboxinside: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#1A1735",
    resizeMode: "contain",
  },
  chartrowboxtitle: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chartboxtitledatadash: {
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    color: "#ffffff",
  },
  chartboxtitledatatotal: {
    marginLeft: 3,
  },
  chartboxtitledatatotalnumber: {
    fontFamily: "Gilroy-Bold",
    fontSize: 12,
    color: "#ffffff",
  },
  chartboxtitledatatotalunit: {
    fontFamily: "Gilroy-Bold",
    fontSize: 10,
    color: "#ffffff",
    opacity: 0.5,
  },
  chartboxgraph3: {
    width: 56,
    height: 56,
    alignSelf: "center",
    marginTop: 5,
  },
  btn: {
    width: 90,
    height: 45,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 10,
  },
  btnborder: {
    padding: 1,
    width: 90,
    height: 45,
    borderRadius: 12,
  },
  btnbg: {
    width: 90,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 14,
    color: "#ffffff",
  },
});
