import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { Mapstyle } from "./../map/Mapstyle";
/**
 * Resultboxdatalist
 * @param title : title | type : string
 * @param value : value | type : integer/string
 * @param unit : unit | type : string
 */
const Resultboxdatalist = ({ title, value, unit }) => {
  return (
    <View style={styles.resultboxdatali}>
      <Text style={styles.resultboxdatatitle}>{title}</Text>
      <View style={styles.resultboxdatarow}>
        <Text style={styles.resultboxdatavalue}>{value}</Text>
        {unit ? <Text style={styles.resultboxdataunit}>{unit}</Text> : null}
      </View>
    </View>
  );
};
/**
 * Resault
 * figma page names : Finished Cycling
 */
export default class Resault extends React.Component {
  state = {
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
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground
        source={require("./../assets/bg2.png")}
        style={styles.bg}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            <ScrollView
              style={styles.scrollview}
              contentContainerStyle={styles.scrollviewcontainer}
            >
              {/*map start*/}
              <View style={styles.map}>
                <LinearGradient
                  start={{ x: 0.44, y: -0.81 }}
                  end={{ x: 1.31, y: -0.34 }}
                  colors={[
                    "rgba(60,63,105,1)",
                    "rgba(38,40,67,0)",
                    "rgba(17,18,30,0)",
                    "rgba(80, 94, 220, 0.32)",
                  ]}
                  style={styles.mapbox}
                >
                  {/*map view start*/}
                  <View style={styles.mapviewbox}>
                    <MapView
                      initialRegion={this.get_region_from_latlon(
                        40.6971117,
                        -73.7468122,
                        650
                      )}
                      customMapStyle={Mapstyle}
                      provider={PROVIDER_GOOGLE}
                      style={styles.mapview}
                    >
                      {/*maker path taken dotted*/}
                      <Polyline
                        key={"coordinates"}
                        coordinates={this.state.route_coordinates}
                        strokeWidth={3}
                        miterlimit={1.30541}
                        lineDashPattern={
                          Platform.OS == "ios" ? [8, 8] : [0.1, 8]
                        }
                        strokeColor={"#FB558B"}
                        linecap="round"
                      />
                      {/*maker path taken highlight*/}
                      <Polyline
                        key={"coordinateshighlight"}
                        coordinates={this.state.route_coordinates}
                        strokeWidth={8}
                        miterlimit={1.30541}
                        strokeColor={"rgba(251,85,139,0.1)"}
                        linecap="round"
                      />
                      {/*maker path taken startpoint*/}
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
                          Math.PI // found deg rotation based ot current and prev coordinates
                        }
                      >
                        <View style={styles.mapmarkerstartpoint}></View>
                      </Marker>
                      {/*maker path taken endpoint*/}
                      <Marker
                        key={"endpoint"}
                        coordinate={
                          this.state.route_coordinates[
                            this.state.route_coordinates.length - 1
                          ]
                        }
                        anchor={{ x: 0.5, y: 0.5 }}
                        rotation={
                          (Math.atan2(
                            this.state.route_coordinates[
                              this.state.route_coordinates.length - 2
                            ].longitude -
                              this.state.route_coordinates[
                                this.state.route_coordinates.length - 1
                              ].longitude,
                            this.state.route_coordinates[
                              this.state.route_coordinates.length - 2
                            ].latitude -
                              this.state.route_coordinates[
                                this.state.route_coordinates.length - 1
                              ].latitude
                          ) *
                            180) /
                            Math.PI -
                          45 // found deg rotation based ot current and prev coordinates - 45 because its square shape
                        }
                      >
                        <View style={styles.mapmarkerendpoint}></View>
                      </Marker>
                    </MapView>
                  </View>
                  {/*map view end*/}
                </LinearGradient>
              </View>
              {/*map end*/}

              {/*title start*/}
              <View style={styles.resaulttitle}>
                {/*resault activity icon*/}
                <Image
                  style={styles.resaulttitleicon}
                  source={require("./../assets/icons/small/cycling.png")}
                />
                {/*resault activity date*/}
                <Text style={styles.resaulttitletext}>
                  Sunday - 2021 07 March
                </Text>
              </View>
              {/*result box data start*/}
              <View style={styles.resultboxdata}>
                <Resultboxdatalist title="Distance" value="12.03" unit="km" />
                <Resultboxdatalist title="Duration" value="26:57:07" unit="" />
                <Resultboxdatalist title="Max Speed" value="31.7" unit="km/h" />
                <Resultboxdatalist title="Avg Speed" value="18.9" unit="km/h" />
                <Resultboxdatalist title="Max Elevation" value="58" unit="m" />
                <Resultboxdatalist
                  title="Calories Burn"
                  value="782"
                  unit="Kcal"
                />
              </View>
              {/*result box data end*/}
              {/*title end*/}
              {/* actions start */}
              <View style={styles.actions}>
                {/* action share button */}
                <TouchableOpacity
                  onPress={() => {
                    console.log("click");
                  }}
                  style={styles.share}
                >
                  <LinearGradient
                    start={{ x: 0.24, y: -0.09 }}
                    end={{ x: 0.26, y: 1.05 }}
                    colors={["#7773FA", "#5652E5"]}
                    style={styles.sharebutton}
                  >
                    <Text style={styles.sharebuttontext}>Share</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* action go home button */}
                <TouchableOpacity
                  onPress={() => {
                    console.log("click");
                    navigation.navigate("Home"); // navigate to Home page
                  }}
                  style={styles.homebutton}
                >
                  <Text style={styles.homebuttontext}>Go to Home</Text>
                </TouchableOpacity>
              </View>
              {/* actions end */}
            </ScrollView>
          </View>
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
  container2: {
    flex: 1,
    paddingTop: 64,
  },
  bg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#1A1735",
  },
  map: {
    paddingHorizontal: 16,
  },
  mapbox: {
    width: "100%",
    height: 289,
    borderRadius: 16,
    padding: 1,
  },
  mapboxbg: {
    position: "absolute",
    width: "96%",
    height: "100%",
    backgroundColor: "rgba(208,210,232,0.04)",
    borderRadius: 16,
    top: -11,
    right: "3%",
  },
  mapboxinside: {
    width: "100%",
    height: 289,
    backgroundColor: "#141227",
    borderRadius: 16,
  },
  mapboxinsideshadow: {
    position: "absolute",
    top: 0,
    left: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginLeft: -1,
    zIndex: 2,
    borderRadius: 16,
  },
  mapviewbox: {
    borderRadius: 16,
    overflow: "hidden",
  },
  mapview: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60, 63, 105, 0.47)",
    opacity: 0.9,
  },
  actions: {
    alignItems: "center",
    marginTop: 24,
  },
  sharebutton: {
    width: 218,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  sharebuttontext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  homebutton: {
    height: 40,
    justifyContent: "center",
    marginTop: 15,
  },
  homebuttontext: {
    color: "#8A8CB2",
    fontFamily: "Gilroy-Bold",
    fontSize: 16,
  },
  mapmarkerstartpoint: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4.5,
    borderRightWidth: 4.5,
    borderBottomWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#505EDC",
  },
  mapmarkerendpoint: {
    width: 10,
    height: 10,
    backgroundColor: "#FB558B",
  },
  resaulttitle: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  resaulttitleicon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 12,
  },
  resaulttitletext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 14,
    color: "#ffffff",
  },
  resultboxdata: {
    zIndex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
  },
  resultboxdatali: {
    flexBasis: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  resultboxdatatitle: {
    fontFamily: "Gilroy-Medium",
    fontSize: 14,
    color: "#8A8CB2",
    marginBottom: 5,
  },
  resultboxdatarow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  resultboxdatavalue: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 24,
    color: "#ffffff",
  },
  resultboxdataunit: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 14,
    color: "#8A8CB2",
    marginLeft: 5,
    marginBottom: 3,
  },
  scrollviewcontainer: {
    paddingBottom: 30,
  },
});
