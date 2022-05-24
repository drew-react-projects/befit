import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-masked-view/masked-view";
/* create LinearGradient AnimatedComponent for input label animation */
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
/**
 * Name
 * figma page names : Name,Name - Active,Birthday,Birthday - Active
 */
export default class Name extends React.Component {
  state = {
    step: 0, // input step | 0 for username 1 for birthday inputs
    input_animation: {
      /**
       * input animation for label
       * each input label need 2 animation and 1 bool state
       * object key must be same as the name of the input
       * tY for translateY
       * fs for scale
       * tr for when animation ends
       * */
      username: {
        tY: new Animated.Value(30),
        fs: new Animated.Value(1.4),
        tr: false,
      },
      year: {
        tY: new Animated.Value(30),
        fs: new Animated.Value(1.4),
        tr: false,
      },
      month: {
        tY: new Animated.Value(30),
        fs: new Animated.Value(1.4),
        tr: false,
      },
      day: {
        tY: new Animated.Value(30),
        fs: new Animated.Value(1.4),
        tr: false,
      },
    },
  };
  animate_input_labels(name) {
    /**
     * animate input labels
     * @param name : input name | type string | "username","year","month","day"
     * each input label need 2 animation and 1 bool state
     * tY for translateY
     * fs for scale
     * tr for when animation ends
     */
    Animated.parallel([
      Animated.timing(this.state.input_animation[name].tY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.input_animation[name].fs, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start((finished) => {
      if (finished) {
        var input_animation = this.state.input_animation;
        input_animation[name].tr = true;
        this.setState({ input_animation: input_animation });
      }
    });
  }
  _render_input(name, label, nextInput, maxLength, isRow, keyboardType) {
    /**
     * _render_input
     * render input
     * @param name : input name | type:string
     * @param label : input label/placeholder | type:string
     * @param nextInput : next input to focus after finishing the current one | type:string | input name | maxLength must be set
     * @param isRow : is input in a row | type:bool
     * @param keyboardType : input keyboardType | type:keyboardType
     */
    return (
      <View
        key={name + "_input"}
        style={isRow ? styles.inputlabelrowitem : null}
      >
        {/*TextInput start*/}
        <LinearGradient
          start={{ x: 0.26, y: -1.53 }}
          end={{ x: 0.63, y: 2.9 }}
          colors={[
            "rgba(138,140,178,1)",
            "rgba(138,140,178,0)",
            "rgba(138,140,178,0.6)",
          ]}
          style={styles.inputborder}
        >
          <TextInput
            key={name}
            ref={(c) => {
              this[`_${name}input`] = c;
            }}
            onChange={(e) => {
              if (nextInput != "" && e.nativeEvent.text.length == maxLength) {
                this[`_${nextInput}input`].focus();
              }
            }}
            style={[styles.textinput, isRow ? styles.textinputrow : null]}
            maxLength={maxLength > 0 ? maxLength : null}
            keyboardType={keyboardType ? keyboardType : null}
            onFocus={() => {
              this.animate_input_labels(name);
            }}
          />
        </LinearGradient>
        {/*TextInput end*/}
        {/*input label start*/}
        <AnimatedLinearGradient
          start={{ x: 0.26, y: -1.53 }}
          end={{ x: 0.63, y: 2.9 }}
          colors={[
            "rgba(138,140,178,1)",
            "rgba(138,140,178,0)",
            "rgba(138,140,178,0.6)",
          ]}
          style={[
            styles.inputlabelbg,
            isRow ? styles.inputlabelrowbg : null,
            {
              padding: this.state.input_animation[name].tr ? 1 : 0,
              transform: [{ translateY: this.state.input_animation[name].tY }],
            },
          ]}
          pointerEvents="none"
        >
          <Animated.Text
            style={[
              styles.inputlabel,
              { transform: [{ scale: this.state.input_animation[name].fs }] },
            ]}
          >
            {label}
          </Animated.Text>
        </AnimatedLinearGradient>
        {/*input label end*/}
      </View>
    );
  }
  _render_birthday_input() {
    /**
     * _render_birthday_input
     * render birthday input
     */
    return (
      <View style={styles.inputlabelrow}>
        {/*input start*/}
        {this._render_input("year", "year", "month", 4, true, "number-pad")}
        {/*input end*/}
        {/*input start*/}
        {this._render_input("month", "month", "day", 2, true, "number-pad")}
        {/*input end*/}
        {/*input start*/}
        {this._render_input("day", "day", "", 2, true, "number-pad")}
        {/*input end*/}
      </View>
    );
  }
  _render_username_input() {
    /**
     * _render_username_input
     * render username input
     */
    return (
      <View>
        {/*input start*/}
        {this._render_input("username", "Your Name", "", -1, false, false)}
        {/*input label end*/}
      </View>
    );
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground
        source={require("./../assets/bg3.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            {/*page title start*/}
            <MaskedView
              style={styles.masklabel}
              maskElement={
                this.state.step == 0 ? (
                  <View style={styles.masklabelview}>
                    <Text style={styles.masklabeltext}>Welcome</Text>
                  </View>
                ) : (
                  <View style={styles.masklabelview}>
                    <Text style={styles.masklabeltextl}>Your</Text>
                    <Text style={styles.masklabeltext}>Birthday</Text>
                  </View>
                )
              }
            >
              <Image
                source={require("./../assets/pagetitlemask2.png")}
                style={styles.masklabelimg}
              />
            </MaskedView>
            {/*page title end*/}
            <ScrollView contentContainerStyle={styles.containerscroll}>
              {/*title start*/}
              <View style={styles.title}>
                <Text style={styles.titler}>
                  {this.state.step == 0 ? "Thanks for choosing us..." : ""}
                </Text>
                <Text style={styles.titleb}>
                  {this.state.step == 0
                    ? "Let’s Register you in Befit!"
                    : "When is your birthday?"}
                </Text>
              </View>
              {/*title end*/}
              {/*textinputs start*/}
              <View style={styles.textinputbox}>
                {this.state.step == 0
                  ? this._render_username_input()
                  : this._render_birthday_input()}
              </View>
              {/*textinputs end*/}
              {/*actions start*/}
              <View style={styles.actions}>
                {/*action next start*/}
                <TouchableOpacity
                  style={[styles.btn, styles.btnsave]}
                  onPress={() => {
                    if (this.state.step == 1)
                      //if last step move to weight page
                      navigation.navigate("Unboardingnav", {
                        screen: "Weight",
                      });
                    else this.setState({ step: 1 }); //if not set step to 1 ( birthday inputs )
                  }}
                >
                  <LinearGradient
                    start={{ x: 0.88, y: 1.21 }}
                    end={{ x: 0.56, y: 0.5 }}
                    colors={["rgba(255,255,255,0.13)", "rgba(255,255,255,0)"]}
                    style={[styles.btnborder, styles.btnsave]}
                  >
                    <LinearGradient
                      start={{ x: 0.24, y: -0.09 }}
                      end={{ x: 0.5, y: 1 }}
                      colors={["#7773FA", "#5652E5"]}
                      style={[styles.btnbg, styles.btnsave]}
                    >
                      <Text style={styles.btnsavetext}>Next</Text>
                    </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
                {/*action next end*/}
                {/*action skip start*/}
                {this.state.step != 0 ? (
                  <TouchableOpacity
                    style={styles.skipbtn}
                    onPress={() => {
                      console.log("skip");
                    }}
                  >
                    <Text style={styles.skipbtntext}>Skip</Text>
                  </TouchableOpacity>
                ) : null}
                {/*action skip end*/}
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
    paddingTop: 108,
    flexDirection: "column",
  },
  containerscroll: {
    flex: 1,
    minHeight: 450,
  },
  bg: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1735",
  },
  masklabel: {
    height: 49,
    marginBottom: 10,
  },
  masklabelview: {
    backgroundColor: "transparent",
    height: 49,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  masklabeltext: {
    fontSize: 40,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  masklabeltextl: {
    fontSize: 40,
    color: "white",
    fontFamily: "Gilroy-Light",
    marginRight: 11,
  },
  masklabelimg: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    marginTop: -55,
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  skipbtn: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  skipbtntext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 16,
    color: "#8A8CB2",
  },
  btnsave: {
    width: 300,
  },
  btnsavetext: {
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  title: {
    marginTop: 54,
    paddingHorizontal: 38,
  },
  titler: {
    fontFamily: "Gilroy-Regular",
    fontSize: 18,
    color: "#ffffff",
  },
  titleb: {
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    color: "#ffffff",
    marginTop: 10,
  },
  textinputbox: {
    flex: 1,
    marginTop: 42,
    paddingHorizontal: 38,
  },
  inputborder: {
    height: 61,
    borderRadius: 16,
    padding: 1,
  },
  textinput: {
    width: "100%",
    height: "100%",
    backgroundColor: "#141227",
    borderRadius: 16,
    fontFamily: "Gilroy-Bold",
    fontSize: 18,
    paddingHorizontal: 12,
    color: "#ffffff",
  },
  inputlabelbg: {
    width: Platform.OS == "ios" ? 110 : 88, //ios fix
    height: 28,
    borderRadius: 16,
    padding: 1,
    position: "absolute",
    top: -14,
    left: 19,
  },
  inputlabel: {
    width: "100%",
    height: "100%",
    backgroundColor: "#141227",
    borderRadius: 16,
    fontFamily: "Gilroy-Bold",
    fontSize: 14,
    color: "#8A8CB2",
    lineHeight: 26,
    textAlign: "center",
  },
  inputlabelrow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputlabelrowitem: {
    flexBasis: "30.5%",
    marginHorizontal: "1.25%",
  },
  inputlabelrowbg: {
    width: 60,
    left: 10,
  },
  textinputrow: {
    textAlign: "center",
  },
});
