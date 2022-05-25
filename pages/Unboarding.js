import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-masked-view/masked-view";
import Carousel, { Pagination } from "react-native-snap-carousel";

// to track start up time
import { StartupTime } from "react-native-startup-time";

/**
 * Unboarding
 * figma page names : figma page names : Onboarding 01,Onboarding 02,Onboarding 03,Onboarding 04,Onboarding 05
 */
export default class Unboarding extends React.Component {
  state = {
    //slider items
    slider: [
      {
        img: require("./../assets/slider/healthy.png"), //slide image | type : image
        titlel: "Be", //slide small title | type : string
        title: "Healthy", //slide title | type : string
        info: "Health meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health.", //slide info | type : string
      },
      {
        img: require("./../assets/slider/ontime.png"),
        titlel: "Be",
        title: "Ontime",
        info: "Health meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health.",
      },
      {
        img: require("./../assets/slider/strong.png"),
        titlel: "Be",
        title: "Strong",
        info: "Health meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health.",
      },
      {
        img: require("./../assets/slider/competitive.png"),
        titlel: "Be",
        title: "Competitive",
        info: "Health meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health.",
      },
      {
        img: require("./../assets/slider/befit.png"),
        titlel: "Be",
        title: "Fit!",
        info: "Health meaning of health has evolved over time. In keeping with the biomedical perspective, early definitions of health.",
      },
    ],
    activeSlide: 0, //active slider slide
  };
  _render_slider_Item = ({ item, index }) => {
    /**
     * _render_slider_Item
     * render slider Item
     * @param item
     * img : slide image | type : image
     * titlel: slide small title | type : string
     * title: slide title | type : string
     * info: slide info | type : string
     * @param index
     * index : slide index
     */
    return (
      <View key={index} style={styles.slideritem}>
        {/*slider item img start*/}
        <View style={styles.sliderimgbox}>
          <Image source={item.img} style={styles.sliderimg} />
        </View>
        {/*slider item img end*/}
        {/*slider item data start*/}
        <View style={styles.slideritemdata}>
          {/*slider item data title start*/}
          <MaskedView
            style={styles.masklabel}
            maskElement={
              <View style={styles.masklabelview}>
                <Text style={styles.masklabeltextl}>{item.titlel}</Text>
                <Text style={styles.masklabeltext}>{item.title}</Text>
              </View>
            }
          >
            <Image
              source={require("./../assets/slidertitlemask.png")}
              style={styles.masklabelimg}
            />
          </MaskedView>
          {/*slider item data title end*/}
          {/*slider item data info start*/}
          <Text style={styles.slideriteminfo}>{item.info}</Text>
          {/*slider item data info end*/}
        </View>
        {/*slider item data end*/}
      </View>
    );
  };
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground
        source={require("./../assets/bg3.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <StartupTime
          style={{ marginTop: 100, zIndex: 500, position: "absolute" }}
        />
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.container2}
            contentContainerStyle={styles.scrollviewcontentcontainerstyle}
          >
            {/*slider start*/}
            <Carousel
              ref={(c) => {
                this._slider = c;
              }}
              data={this.state.slider}
              renderItem={this._render_slider_Item}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              windowSize={1}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
            {/*slider end*/}
            {/*slider actions start*/}
            <View style={styles.actions}>
              {/*slider actions nav start*/}
              {/*slider actions nav prev btn*/}
              {this.state.activeSlide > 0 &&
              this.state.activeSlide < this.state.slider.length - 1 ? (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this._slider.snapToPrev();
                  }}
                >
                  <LinearGradient
                    start={{ x: 0.88, y: 1.21 }}
                    end={{ x: 0.56, y: 0.5 }}
                    colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0)"]}
                    style={styles.btnborder}
                  >
                    <LinearGradient
                      start={{ x: 0.75, y: 1.09 }}
                      end={{ x: 0.5, y: -0.04 }}
                      colors={["#7773FA", "#5652E5"]}
                      style={styles.btnbg}
                    >
                      <Image
                        source={require("./../assets/slider/arrowleft.png")}
                        style={styles.btnimg}
                      />
                    </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
              ) : null}
              {/*slider actions nav next btn*/}
              {this.state.activeSlide < this.state.slider.length - 1 ? (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this._slider.snapToNext();
                  }}
                >
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
                      <Image
                        source={require("./../assets/slider/arrowright.png")}
                        style={styles.btnimg}
                      />
                    </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                //show register btn if it's the last slide
                <TouchableOpacity
                  style={[styles.btn, styles.btnregister]}
                  onPress={() => {
                    console.log("move navigation to name");
                    navigation.navigate("Unboardingnav", { screen: "Name" }); // move navigation to name
                  }}
                >
                  <LinearGradient
                    start={{ x: 0.88, y: 1.21 }}
                    end={{ x: 0.56, y: 0.5 }}
                    colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0)"]}
                    style={[styles.btnborder, styles.btnregister]}
                  >
                    <LinearGradient
                      start={{ x: 0.24, y: -0.09 }}
                      end={{ x: 0.5, y: 1 }}
                      colors={["#7773FA", "#5652E5"]}
                      style={[styles.btnbg, styles.btnregister]}
                    >
                      <Text style={styles.btnregistertext}>Register</Text>
                    </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              {/*slider actions nav end*/}
            </View>
            {/*slider actions end*/}
            {/*skip button start*/}
            {this.state.activeSlide < this.state.slider.length - 1 ? (
              <TouchableOpacity
                style={styles.skipbtn}
                onPress={() => {
                  this._slider.snapToNext();
                }}
              >
                <Text style={styles.skipbtntext}>Skip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.skipbtn}
                onPress={() => {
                  console.log("log in");
                }}
              >
                <Text style={styles.skipbtntext}>Have an account? Log in</Text>
              </TouchableOpacity>
            )}
            {/*skip button end*/}
            {/*pagination start*/}
            <Pagination
              dotsLength={this.state.slider.length}
              activeDotIndex={this.state.activeSlide}
              dotStyle={styles.sliderdotstyle}
              inactiveDotStyle={styles.sliderinactivedotstyle}
              inactiveDotOpacity={1}
              inactiveDotScale={0.5}
            />
            {/*pagination end*/}
          </ScrollView>
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
    paddingTop: 24,
  },
  scrollviewcontentcontainerstyle: {
    paddingBottom: 20,
  },
  bg: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1735",
  },
  masklabel: {
    height: 39,
    marginBottom: 10,
  },
  masklabelview: {
    backgroundColor: "transparent",
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  masklabeltext: {
    fontSize: 32,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  masklabeltextl: {
    fontSize: 32,
    color: "white",
    fontFamily: "Gilroy-Light",
    marginRight: 11,
  },
  masklabelimg: {
    resizeMode: "cover",
    width: "100%",
    height: 205,
    marginTop: -83,
  },
  slideritemdata: {
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 33,
    marginTop: -90,
  },
  sliderimgbox: {
    height: 440,
  },
  sliderimg: {
    position: "absolute",
    width: "100%",
    height: 440,
    resizeMode: "cover",
    top: 40,
  },
  slideriteminfo: {
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    color: "#8A8CB2",
    lineHeight: 24,
    textAlign: "center",
  },
  btn: {
    width: 64,
    height: 64,
    borderRadius: 18,
    marginHorizontal: 11,
  },
  btnborder: {
    padding: 1,
    width: 64,
    height: 64,
    borderRadius: 18,
  },
  btnbg: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  btnimg: {
    width: 40,
    height: 40,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },
  skipbtn: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  skipbtntext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 16,
    color: "#8A8CB2",
  },
  btnregister: {
    width: 182,
  },
  btnregistertext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  sliderdotstyle: {
    width: 16,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#505EDC",
    marginHorizontal: -4,
  },
  sliderinactivedotstyle: {
    width: 16,
    height: 16,
    borderRadius: Platform.OS == "ios" ? 8 : 16, //ios fix
    backgroundColor: "#ffffff",
    marginHorizontal: -16,
  },
});
