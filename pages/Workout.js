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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-masked-view/masked-view";
import WorkoutProgress from "./../components/WorkoutProgress";
/**
 * WorkOut
 * figma page names : Workout(2 pages)
 */
export default class WorkOut extends React.Component {
  state = {
    progress: 82, // workout progress
    start: true, // if workout is started
  };
  _render_next_workout(title, image, onNextbuttonPress) {
    /**
     * _render_next_workout
     * render next workout
     * @param title : next workout title | type : string
     * @param image : next workout image | type : image
     * @param onNextbuttonPress : next workout nextbutton press | type : function
     */
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
        style={styles.nextworkoutborder}
      >
        <View style={styles.nextworkoutinside}>
          {/* next workout image */}
          <Image source={image} style={styles.nextworkoutimg} />
          <View style={styles.nextworkoutdata}>
            <Text style={styles.nextworkoutlabel}>Next:</Text>
            {/* next workout title */}
            <Text style={styles.nextworkouttitle}>{title}</Text>
          </View>
          {/* next workout nextbutton start*/}
          <TouchableOpacity
            style={styles.nextbutton}
            onPress={onNextbuttonPress}
          >
            <Image
              source={require("./../assets/workout/nextbutton.png")}
              style={styles.nextbuttonimg}
            />
          </TouchableOpacity>
          {/* next workout nextbutton end*/}
        </View>
      </LinearGradient>
    );
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground
        source={require("./../assets/bg2.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            {/* top bar start */}
            <View style={styles.topbar}>
              {/* back button */}
              <TouchableOpacity
                style={styles.backbutton}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require("./../assets/workout/backbottom.png")}
                  style={styles.backbuttonimg}
                />
              </TouchableOpacity>
              {/* timer */}
              <ImageBackground
                source={require("./../assets/workout/timerbg.png")}
                style={styles.timerbg}
              >
                <Image
                  source={require("./../assets/workout/stopwatch.png")}
                  style={styles.timericon}
                />
                <Text style={styles.timer}>01:45</Text>
              </ImageBackground>
            </View>
            {/* top bar start */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* workout image start */}
              <View style={styles.workout}>
                <Image
                  source={require("./../assets/workout/Workoutimg.png")}
                  style={styles.workoutimg}
                />
              </View>
              {/* workout image end*/}
              {/* progress start*/}
              <View style={styles.progress}>
                {/* progress title*/}
                <Text style={styles.progresstext}>Plank</Text>
                <View style={styles.progressbox}>
                  {/* workout progress*/}
                  <WorkoutProgress
                    width="245"
                    height="250"
                    percent={this.state.progress}
                    animateCircle={true}
                  />
                  {/* workout progress button*/}
                  <TouchableOpacity
                    style={styles.progressbtn}
                    onPress={() => {
                      this.setState({
                        progress: Math.floor(Math.random() * 100) + 1,
                      });
                    }}
                  >
                    <ImageBackground
                      source={require("./../assets/workout/btnbg.png")}
                      style={styles.progressbtnbg}
                    >
                      <Image
                        source={
                          this.state.start
                            ? require("./../assets/workout/start.png")
                            : require("./../assets/workout/pause.png")
                        }
                        style={
                          this.state.start
                            ? styles.progressbtniconstart
                            : styles.progressbtniconpause
                        }
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                  {/* workout progress label*/}
                  <MaskedView
                    style={styles.progresslabel}
                    maskElement={
                      <View style={styles.progresslabelmaskview}>
                        <Text style={styles.progresslabelmasktext}>00:30</Text>
                      </View>
                    }
                  >
                    <LinearGradient
                      start={{ x: 0.52, y: -0.15 }}
                      end={{ x: 0.66, y: 1.54 }}
                      colors={["#ffffff", "#8A8CB3"]}
                      style={styles.progresslabelmaskbg}
                    ></LinearGradient>
                  </MaskedView>
                </View>
              </View>
              {/* progress end*/}
              {/* next workout start*/}
              {this._render_next_workout(
                "Cross Crunches",
                require("./../assets/workout/Workoutimg2.png"),
                () => {
                  console.log("next");
                }
              )}
              {/* next workout end*/}
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
    paddingTop: 39,
    paddingHorizontal: 16,
  },
  bg: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1735",
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backbuttonimg: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
  timerbg: {
    width: 92,
    height: 44,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  timericon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  timer: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 7,
  },
  workout: {
    marginTop: 15,
  },
  workoutimg: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
    borderRadius: 16,
  },
  progress: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },
  progresstext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  progressbtn: {
    width: 80,
    height: 80,
    borderRadius: Platform.OS == "ios" ? 40 : 80, //ios fix
    position: "absolute",
    bottom: 0,
    left: 83,
  },
  progressbtnbg: {
    width: 80,
    height: 80,
    borderRadius: Platform.OS == "ios" ? 40 : 80, //ios fix
    alignItems: "center",
    justifyContent: "center",
  },
  progressbtniconstart: {
    width: 17,
    height: 19,
    resizeMode: "contain",
  },
  progressbtniconpause: {
    width: 17,
    height: 18,
    resizeMode: "contain",
  },
  progresslabelmaskbg: {
    minWidth: 200,
    height: 60,
  },
  progresslabelmaskview: {
    backgroundColor: "transparent",
    height: 60,
    alignItems: "center",
  },
  progresslabelmasktext: {
    fontSize: 48,
    color: "white",
    fontFamily: "Gilroy-Black",
  },
  progresslabel: {
    position: "absolute",
    top: 87,
    left: 25,
  },
  nextworkoutborder: {
    borderRadius: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    width: 272,
    height: 65,
    marginTop: 46,
    marginBottom: 15,
    alignSelf: "center",
  },
  nextworkoutinside: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#3C3F69",
    paddingHorizontal: 4,
    paddingVertical: 4,
    flexDirection: "row",
  },
  nextworkoutimg: {
    width: 57,
    height: 55,
    resizeMode: "cover",
    borderRadius: 12,
    marginRight: 10,
  },
  nextworkoutdata: {
    flex: 1,
    paddingTop: 6,
  },
  nextworkoutlabel: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 14,
    color: "#8A8CB2",
  },
  nextworkouttitle: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 18,
    color: "#ffffff",
  },
  nextbutton: {
    alignSelf: "center",
  },
  nextbuttonimg: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
});
