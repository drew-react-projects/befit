import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleSwitch from "toggle-switch-react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Mapstyle } from "../map/Mapstyle";
import { StatusBar } from "expo-status-bar";
const window = Dimensions.get("window");
/**
 * Resultboxdatalist
 * @param title : title | type : string
 * @param value : value | type : integer/string
 * @param unit : unit | type : string
 */
const Resultboxdatalist = ({ title, value, unit }) => {
  return (
    <View style={styles.recordboxdatali}>
      <Text style={styles.recordboxdatatitle}>{title}</Text>
      <View style={styles.recordboxdatarow}>
        <Text style={styles.recordboxdatavalue}>{value}</Text>
        {unit ? <Text style={styles.recordboxdataunit}>{unit}</Text> : null}
      </View>
    </View>
  );
};
/**
 * Cycling
 * figma page names : Start Cycling,While Cycling,Stop Cycling (2 pages)
 */
export default class Cycling extends React.Component {
  state = {
    timer_running: false, //is timer running
    autorecord: false, //is auto record
    showrecord: false, //show record
    activity_box_opacity_Anim: new Animated.Value(0), //activity box opacity Animate
    record_box_opacity_Anim: new Animated.Value(0), //record box opacity Anim Animate
    user_current_location: {
      //user_current_location
      latitude: 40.69495029244803,
      longitude: -73.746404504226,
    },
    route_coordinates: [
      //marker user route | type: array of object | example : [{latitude: 40.69718,longitude: -73.74559,}]
      {
        latitude: 40.69495029244803,
        longitude: -73.746404504226,
      },
      {
        latitude: 40.69511298255784,
        longitude: -73.74576077405654,
      },
      {
        latitude: 40.69610538362475,
        longitude: -73.74623284284748,
      },
      {
        latitude: 40.69638195177995,
        longitude: -73.74524578992099,
      },
      {
        latitude: 40.697764775333916,
        longitude: -73.74584660474581,
      },
      {
        latitude: 40.698008800040334,
        longitude: -73.7449882978532,
      },
      {
        latitude: 40.69944039364643,
        longitude: -73.74561057035034,
      },
    ],
  };
  _render_record_box() {
    /**
     * _render_record_box
     * render record box
     */
    const { navigation } = this.props; // navigation
    return (
      <Animated.View
        style={[
          styles.recordbox,
          {
            transform: [
              {
                translateY: this.state.record_box_opacity_Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [343, 0],
                }),
              },
            ],
            opacity: this.state.record_box_opacity_Anim,
          },
        ]}
      >
        <Image
          source={require("./../assets/resultboxoverlay.png")}
          style={styles.recordboxoverlay}
        />
        <Image
          source={require("./../assets/bigactivityborder.png")}
          style={styles.recordboxborder}
        />
        {/*record box data start*/}
        <View style={styles.recordboxdata}>
          <Resultboxdatalist title="Distance" value="12.03" unit="km" />
          <Resultboxdatalist title="Duration" value="26:57:07" unit="" />
          <Resultboxdatalist title="Max Speed" value="31.7" unit="km/h" />
          <Resultboxdatalist title="Avg Speed" value="18.9" unit="km/h" />
          <Resultboxdatalist title="Max Elevation" value="58" unit="m" />
          <Resultboxdatalist title="Calories Burn" value="782" unit="Kcal" />
        </View>
        {/*record box data end*/}
        {/*record box bottom actions start*/}
        <View style={styles.activityboxbottom}>
          {/*record box finish record btn*/}
          <TouchableOpacity
            onPress={() => {
              console.log("finish");
              navigation.navigate("Clubnav", { screen: "Congratulation" }); // navigate to Congratulation page
            }}
            style={styles.activityboxbottombtn}
          >
            <Text style={styles.activityboxbottombtntxt}>Finish Record</Text>
          </TouchableOpacity>
          {/*record box auto record switch*/}
          <View style={styles.recordboxautorecord}>
            <ToggleSwitch
              isOn={this.state.autorecord}
              onColor="#505EDC"
              offColor="#8A8CB2"
              label="Auto Record"
              labelStyle={styles.recordboxautorecordlabel}
              size="medium"
              onToggle={() => {
                this.toggle_auto_record_switch();
              }}
              thumbOnStyle={styles.recordboxautorecordthumbon}
              thumbOffStyle={styles.recordboxautorecordthumboff}
              trackOnStyle={styles.recordboxautorecordtrackon}
              trackOffStyle={styles.recordboxautorecordtrackoff}
            />
          </View>
        </View>
        {/*record box bottom actions end*/}
      </Animated.View>
    );
  }
  get_region_from_latlon(lat, lon, distance) {
    /* convert lat and lon to region */
    distance = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = distance / circumference;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(lat),
        Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
      )
    );
    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    };
  }
  toggle_activity_timer() {
    if (!this.state.timer_running) {
      /* if timer is not running show timer */
      Animated.parallel([
        Animated.timing(this.state.activity_box_opacity_Anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.record_box_opacity_Anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      this.setState({ timer_running: true, showrecord: false });
    } else {
      /* if timer is running show show record */
      Animated.parallel([
        Animated.timing(this.state.activity_box_opacity_Anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.record_box_opacity_Anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      this.setState({ timer_running: false, showrecord: true });
    }
  }
  toggle_auto_record_switch() {
    /* toggle auto record switch */
    if (!this.state.autorecord) {
      this.setState({ autorecord: true });
    } else {
      this.setState({ autorecord: false });
    }
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <SafeAreaView style={styles.container}>
        {/*map start*/}
        <MapView
          initialRegion={this.get_region_from_latlon(
            40.6945517,
            -73.7468122,
            650
          )}
          customMapStyle={Mapstyle}
          provider={PROVIDER_GOOGLE}
          style={styles.mapview}
        >
          {/*maker path taken start*/}
          {/*maker path taken dotted*/}
          {/* if timer is running or record are showing show the route coordinates */}
          {this.state.timer_running || this.state.showrecord ? (
            <Polyline
              key={"coordinates"}
              coordinates={this.state.route_coordinates}
              strokeWidth={3}
              miterlimit={1.30541}
              lineDashPattern={Platform.OS == "ios" ? [8, 8] : [0.1, 8]}
              strokeColor={"#FB558B"}
              linecap="round"
            />
          ) : null}
          {/*maker path taken highlight*/}
          {this.state.timer_running || this.state.showrecord ? (
            <Polyline
              key={"coordinateshighlight"}
              coordinates={this.state.route_coordinates}
              strokeWidth={8}
              miterlimit={1.30541}
              strokeColor={"rgba(251,85,139,0.1)"}
              linecap="round"
            />
          ) : null}
          {/*maker path taken startpoint*/}
          {(this.state.timer_running || this.state.showrecord) &&
          this.state.route_coordinates.length ? (
            <Marker
              key={"startpoint"}
              coordinate={this.state.route_coordinates[0]}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={
                (Math.atan2(
                  this.state.route_coordinates[1].longitude -
                    this.state.route_coordinates[0].longitude,
                  this.state.route_coordinates[1].latitude -
                    this.state.route_coordinates[0].latitude
                ) *
                  180) /
                Math.PI
              }
            >
              <View style={styles.mapmarkerstartpoint}></View>
            </Marker>
          ) : null}
          {/*map user current location maker start*/}
          <Marker
            key={"user_current_location"}
            coordinate={
              this.state.timer_running || this.state.showrecord
                ? this.state.route_coordinates[
                    this.state.route_coordinates.length - 1
                  ]
                : this.state.user_current_location
            }
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View>
              <Image
                source={require("../assets/icons/mylocation.png")}
                style={styles.mapuser_current_locationimg}
              />
            </View>
          </Marker>
          {/*map user current location maker end*/}
        </MapView>
        {/*map end*/}
        <View>
          {/*activity box start*/}
          <Animated.View
            style={[
              styles.activitybox,
              {
                transform: [
                  {
                    translateY: this.state.record_box_opacity_Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -310],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* activity box title */}
            <MaskedView
              style={[
                styles.maskview,
                this.state.timer_running || this.state.showrecord
                  ? { opacity: 0 }
                  : {},
              ]}
              maskElement={
                <View style={styles.masklabel}>
                  <Text style={styles.masklabeltext}>Start Cycling</Text>
                </View>
              }
            >
              <Image
                source={require("./../assets/startcyclingmask.png")}
                style={styles.masklabelimg}
              />
            </MaskedView>
            {/* start activity timer box */}
            <Animated.View
              style={[
                styles.activitytimerbox,
                { opacity: this.state.activity_box_opacity_Anim },
              ]}
            >
              <Image
                style={styles.activitytimerboxoverlay}
                source={require("./../assets/activitytimerboxoverlay.png")}
              />
              <Image
                style={styles.activitytimerboxoverlay}
                source={require("./../assets/activitytimerboxoverlay2.png")}
              />
              <View style={[styles.activitytimerlabel, { borderLeftWidth: 0 }]}>
                <Text style={styles.activitytimerlabeltxt}>12.03</Text>
                <Text style={styles.activitytimerunit}>km</Text>
              </View>
              <View style={styles.activitytimerlabel}>
                <Text style={styles.activitytimerlabeltxt}>26:57</Text>
              </View>
            </Animated.View>
            {/* end activity timer box */}
            {/* start activity button */}
            <TouchableOpacity
              onPress={() => {
                this.toggle_activity_timer();
              }}
              style={styles.activitybutton}
            >
              <Image
                source={require("./../assets/startbtnbg.png")}
                style={styles.activitybuttonbg}
              />
              <Image
                source={require("./../assets/startbtnshadow.png")}
                style={styles.activitybuttonshadow}
              />
              <Image
                source={
                  this.state.timer_running
                    ? require("./../assets/icons/pauseicon.png")
                    : require("./../assets/icons/starticon.png")
                }
                style={styles.activitybuttonicon}
              />
            </TouchableOpacity>
            {/* end activity button */}
          </Animated.View>
          {/*activity box end*/}
          {/*record box start*/}
          {this._render_record_box()}
          {/*record box end*/}
        </View>
        {/*return button start*/}
        <TouchableOpacity
          onPress={() => {
            console.log("click");
            navigation.goBack();
          }}
          style={styles.returnbutton}
        >
          <Image
            source={require("./../assets/icons/arrow-left.png")}
            style={styles.returnbuttonimg}
          />
        </TouchableOpacity>
        {/*return button end*/}
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1735",
  },
  mapview: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60, 63, 105, 0.47)",
  },
  mapmarkerstartpoint: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#505EDC",
  },
  returnbutton: {
    position: "absolute",
    left: 16,
    top: Platform.OS == "ios" ? 60 : 40, //ios fix
    width: 44,
    height: 44,
    borderRadius: Platform.OS == "ios" ? 22 : 44, //ios fix
    backgroundColor: "rgba(60,63,105,0.49)",
    justifyContent: "center",
    alignItems: "center",
  },
  returnbuttonimg: {
    width: 9,
    height: 16,
    resizeMode: "contain",
  },
  mapuser_current_locationimg: {
    width: 188,
    height: 188,
  },
  activitybox: {
    position: "absolute",
    bottom: 0,
    left: "3%",
    height: 133,
    width: "94%",
    bottom: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  maskview: {
    height: 70,
  },
  masklabel: {
    backgroundColor: "transparent",
    width: 185,
    height: 37,
    alignSelf: "center",
  },
  masklabeltext: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  masklabelimg: {
    width: 210,
    height: "100%",
    marginTop: -10,
    marginLeft: -5,
    resizeMode: "cover",
    alignSelf: "center",
  },
  activitybutton: {
    width: 70,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
    zIndex: 2,
    transform: [{ translateY: 0 }], //-310
  },
  activitybuttonbg: {
    width: 70,
    height: 70,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "contain",
    borderRadius: Platform.OS == "ios" ? 35 : 70, //ios fix
    zIndex: 2,
  },
  activitybuttonshadow: {
    width: 110,
    height: 105,
    position: "absolute",
    top: -10,
    left: -20,
    resizeMode: "contain",
    zIndex: 1,
  },
  activitybuttonicon: {
    position: "relative",
    width: 15,
    height: 15,
    zIndex: 3,
    resizeMode: "contain",
    marginTop: -10,
  },
  activitytimerbox: {
    width: 208,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(20,18,39,0.85)",
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0,
  },
  activitytimerboxoverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  activitytimerlabel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(138,140,178,0.15)",
  },
  activitytimerlabeltxt: {
    fontSize: 24,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  activitytimerunit: {
    fontSize: 14,
    color: "#8A8CB2",
    fontFamily: "Gilroy-ExtraBold",
    marginLeft: 3,
    marginTop: 7,
  },
  recordbox: {
    position: "absolute",
    bottom: 17,
    left: "3%",
    height: 343,
    width: "94%",
    borderRadius: 12,
    backgroundColor: "rgba(20,18,39,0.85)",
    zIndex: 1,
    opacity: 0,
    transform: [{ translateY: 343 }],
  },
  recordboxoverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  recordboxborder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  recordboxdata: {
    zIndex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 50,
  },
  recordboxdatali: {
    flexBasis: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(138,140,178,0.15)",
    marginBottom: 24,
  },
  recordboxdatatitle: {
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
    color: "#8A8CB2",
    marginBottom: 5,
  },
  recordboxdatarow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  recordboxdatavalue: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 24,
    color: "#ffffff",
  },
  recordboxdataunit: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 14,
    color: "#8A8CB2",
    marginLeft: 5,
    marginBottom: 3,
  },
  recordboxautorecordlabel: {
    color: "black",
    fontFamily: "Gilroy-Bold",
    fontSize: window.width <= 320 ? 12 : 16, //responsive fix
    color: "#fff",
  },
  activityboxbottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    zIndex: 4,
  },
  activityboxbottombtn: {
    flex: 1,
    alignItems: "center",
    height: 30,
    justifyContent: "center",
  },
  activityboxbottombtntxt: {
    color: "#FB558B",
    fontSize: window.width <= 320 ? 14 : 16, //responsive fix
    fontFamily: "Gilroy-Bold",
  },
  recordboxautorecord: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  recordboxautorecordthumbon: {
    width: 26,
    height: 26,
    borderRadius: Platform.OS == "ios" ? 13 : 26, //ios fix
  },
  recordboxautorecordthumboff: {
    width: 26,
    height: 26,
    borderRadius: Platform.OS == "ios" ? 13 : 26, //ios fix
  },
  recordboxautorecordtrackon: {
    width: 52,
    height: 30,
    padding: 2,
  },
  recordboxautorecordtrackoff: {
    width: 52,
    height: 30,
    padding: 2,
  },
});
