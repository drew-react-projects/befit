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
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
/**
 * Congratulation
 * figma page names : congratulations
 */
export default class Congratulation extends React.Component {
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground
        source={require("./../assets/bg2.png")}
        style={styles.bg}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            <ScrollView>
              {/*trophy box start*/}
              <View style={styles.trophybox}>
                <Image
                  source={require("./../assets/trophyshadow.png")}
                  style={styles.trophyshadow}
                />
                <Image
                  source={require("./../assets/trophy.png")}
                  style={styles.trophy}
                />
                <Image
                  source={require("./../assets/confetti.png")}
                  style={styles.trophyconfetti}
                />
                {/*trophy box title 1*/}
                <Text style={styles.trophyboxtl}>YoooHoooo!</Text>
                {/*trophy box title 2*/}
                <Text style={styles.trophyboxt2}>Congratulations</Text>
              </View>
              {/*trophy box end*/}
              {/*actions start*/}
              <View style={styles.actions}>
                {/*actions resault start*/}
                <TouchableOpacity
                  onPress={() => {
                    console.log("click");
                    navigation.navigate("Clubnav", { screen: "Resault" }); // navigate to Resault page
                  }}
                  style={styles.share}
                >
                  <LinearGradient
                    start={{ x: 0.24, y: -0.09 }}
                    end={{ x: 0.26, y: 1.05 }}
                    colors={["#7773FA", "#5652E5"]}
                    style={styles.sharebutton}
                  >
                    <Text style={styles.sharebuttontext}>Show me resault</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/*actions resault end*/}
                {/*actions go home start*/}
                <TouchableOpacity
                  onPress={() => {
                    console.log("click");
                    navigation.navigate("Home"); // navigate to Home page
                  }}
                  style={styles.homebutton}
                >
                  <Text style={styles.homebuttontext}>Go to Home</Text>
                </TouchableOpacity>
                {/*actions go home end*/}
              </View>
              {/*actions end*/}
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
    paddingTop: 38,
  },
  bg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#1A1735",
  },
  trophybox: {
    width: "100%",
    height: 548,
  },
  trophyshadow: {
    position: "absolute",
    width: "100%",
    height: 464,
    resizeMode: "contain",
    top: 82,
  },
  trophy: {
    position: "absolute",
    width: "100%",
    height: 464,
    resizeMode: "contain",
    top: 0,
  },
  trophyconfetti: {
    position: "absolute",
    width: "100%",
    height: 249,
    resizeMode: "contain",
    top: 46,
  },
  trophyboxtl: {
    position: "absolute",
    width: "100%",
    bottom: 105,
    fontFamily: "Gilroy-Lightitalic",
    fontSize: 26,
    color: "#ffffff",
    textAlign: "center",
  },
  trophyboxt2: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    fontFamily: "Gilroy-Bold",
    fontSize: 32,
    color: "#ffffff",
    textAlign: "center",
  },
  actions: {
    alignItems: "center",
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
    marginBottom: 20,
  },
  homebuttontext: {
    color: "#8A8CB2",
    fontFamily: "Gilroy-Bold",
    fontSize: 16,
  },
});
