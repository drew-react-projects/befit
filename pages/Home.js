import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Platform,
  Dimensions,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import ToggleSwitch from "toggle-switch-react-native";
import Navigation from "../components/Navigation";
/* create ImageBackground AnimatedComponent for side menu animation */
const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
);
const window = Dimensions.get("window");
/**
 * Activitybox
 * @param cover : box cover | type : image
 * @param bg : box bg | type : image
 * @param icon : box icon | type : image
 * @param title : box title | type : string
 * @param coverstyle : box cover image style | type : style
 * @param iconwidth : box icon width | type : integer
 * @param datatype : box data type | type : integer / 1,2
 * @param datacurrent : box data current | type : integer
 * @param datatotal : box data total | type : integer
 * @param datalabel : box data label | type : string
 * @param datacurrentdec : box data current decimal | type : integer | for datatype:2
 * @param dataunit : box data current unit | type : integer | for datatype:2
 * @param onPress : box press event | type : function
 */
const Activitybox = ({
  cover,
  bg,
  icon,
  title,
  coverstyle,
  iconwidth,
  datatype,
  datacurrent,
  datatotal,
  datalabel,
  datacurrentdec,
  dataunit,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.activityboxborder} onPress={onPress}>
      <LinearGradient
        start={{ x: 0.11, y: -0.21 }}
        end={{ x: 0.71, y: 0.38 }}
        colors={["rgba(255,255,255,0.4)", "rgba(255,255,255,0)"]}
        style={styles.activityboxborder}
      >
        <LinearGradient
          start={{ x: 0.24, y: -0.09 }}
          end={{ x: 0.78, y: 0.93 }}
          colors={["#5A5D87", "#3C3F69"]}
          style={styles.activitybox}
        >
          <Image source={cover} style={[styles.activityboxcover, coverstyle]} />
          <Image source={bg} style={styles.activityboxbg} />
          <LinearGradient
            start={{ x: 0.24, y: -0.09 }}
            end={{ x: 0.78, y: 0.93 }}
            colors={["rgba(90,93,135,0)", "#3C3F69"]}
            style={styles.activityboxoverlay}
          ></LinearGradient>
          <View style={styles.activityboxtint} />
          <View style={styles.activityiconbox}>
            <Image
              source={icon}
              style={[styles.activityicon, { width: iconwidth }]}
            />
          </View>
          <View style={styles.activitydata}>
            {datatype == 1 ? (
              <View style={styles.activitydata}>
                <Text style={styles.activitydatalabel}>{datacurrent}</Text>
                <Text style={styles.activitydatalabel}>/</Text>
                <View style={styles.activitydatalabels}>
                  <Text style={styles.activitydatalabels1}>{datatotal}</Text>
                  <Text style={styles.activitydatalabels2}>{datalabel}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.activitydata}>
                <Text style={styles.activitydatalabel}>{datacurrent}</Text>
                <Text style={styles.activitydatalabel2}>.{datacurrentdec}</Text>
                <View style={styles.activitydatalabels}>
                  <Text style={styles.activitydatalabels1}></Text>
                  <Text style={styles.activitydatalabels3}>{dataunit}</Text>
                </View>
              </View>
            )}
          </View>
          <LinearGradient
            start={{ x: 0.24, y: -0.09 }}
            end={{ x: 0.31, y: 1.04 }}
            colors={["#D0D2E8", "#ffffff"]}
            style={styles.activityboxtitle}
          >
            <Text style={styles.activityboxtitlel}>{title}</Text>
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};
/**
 * Home
 * figma page names : Home,Side Menu
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this); // bind handleBackButtonClick function for exiting side menu
  }
  state = {
    slider_tabs_active: 0, // slider tab active index
    slider_tab_underline_AnimX: new Animated.Value(0), // slider tab underline animation
    side_menu_Anim: new Animated.Value(0), // side menu animation
    side_menu_open: false, // is side menu open
    slider_tab_items: [
      //slider tabs
      {
        key: 0, // key
        value: "Strengths", // name
        sliderkey: 0, // slider key | must be same as the slider_items key
      },
      { key: 1, value: "Cardio", sliderkey: 1 },
      { key: 2, value: "Yoga", sliderkey: 2 },
      { key: 3, value: "Meditation", sliderkey: 3 },
    ],
    slider_items: [
      //slider items
      {
        key: 0,
        image: require("./../assets/card1.png"),
        mask: require("./../assets/card1mask.png"),
        lableline1: "Make\nYour Back",
        lableline2: "Massive",
        coverleft: false,
      },
      {
        key: 1,
        image: require("./../assets/card2.png"),
        mask: require("./../assets/card2mask.png"),
        lableline1: "Make\nYour Back",
        lableline2: "Massive",
        coverleft: true,
      },
      {
        key: 2,
        image: require("./../assets/card2.png"),
        mask: require("./../assets/card2mask.png"),
        lableline1: "Make\nYour Back",
        lableline2: "Massive",
        coverleft: true,
      },
      {
        key: 3,
        image: require("./../assets/card2.png"),
        mask: require("./../assets/card2mask.png"),
        lableline1: "Make\nYour Back",
        lableline2: "Massive",
        coverleft: true,
      },
    ],
    sidemenu: [
      {
        id: 1, // menu id
        title: "My Profile", // menu title
        icon: require("./../assets/sidemenu/profile.png"), // menu icon
        switch: false, // show switch ? true/false
        switchstate: false, // switch is active ? true/false
      },
      {
        id: 2,
        title: "My Favorite",
        icon: require("./../assets/sidemenu/myfav.png"),
        switch: false,
        switchstate: false,
      },
      {
        id: 3,
        title: "General Setting",
        icon: require("./../assets/sidemenu/setting.png"),
        switch: false,
        switchstate: false,
      },
      {
        id: 4,
        title: "Apple Health",
        icon: require("./../assets/sidemenu/applehealth.png"),
        switch: true,
        switchstate: true,
      },
      {
        id: 5,
        title: "Smart Watch",
        icon: require("./../assets/sidemenu/smartwatch.png"),
        switch: true,
        switchstate: false,
      },
    ],
  };
  componentDidMount() {
    this._imageslider = React.createRef();
    /* add listener to back press for exiting sidemenu */
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    /* remove listener from back press for exiting sidemenu */
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    /* close side menu if it's open after back press*/
    if (this.state.side_menu_open) {
      this.setState({ side_menu_open: false });
      Animated.timing(this.state.side_menu_Anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      return true;
    }
  }
  slider_tab_item_press(item) {
    this._imageslider.current.scrollToIndex({ index: item.sliderkey }); // scroll slider to ne item index*/
  }
  slider_viewable_items_changed = ({ viewableItems }) => {
    var item = viewableItems[0].item;
    let spacing = item.key * styles.tab.marginRight, // find spacing of the items before active menu item
      width = 0;
    this.state.slider_tab_items.slice(0, item.key).map((item, index) => {
      width += item.width; // find total width of the items before active menu item
    });
    // basicly find x location of the active menu base of the width of the tab items before + their spacing(margin) and animate indicator to location
    Animated.timing(this.state.slider_tab_underline_AnimX, {
      toValue: width + spacing, // width of the tab items before + their spacing(margin)
      duration: 500,
      useNativeDriver: true,
    }).start();
    this.setState({ slider_tabs_active: item.key }); // set active slider tab
  };
  set_slider_tabs_width = (event, item) => {
    //find slider tab item width and save it for later animation
    var { width } = event.nativeEvent.layout;
    let items = this.state.slider_tab_items;
    items[item.key].width = width;
    this.setState({ slider_tab_items: items });
  };
  toggle_sidemenu() {
    /**
     * toggle_sidemenu
     * toggle open side menu
     */
    if (this.state.side_menu_open) {
      this.setState({ side_menu_open: false });
      Animated.timing(this.state.side_menu_Anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      this.setState({ side_menu_open: true });
      Animated.timing(this.state.side_menu_Anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }
  toggle_sidemenu_switchstate(item) {
    /**
     * toggle_sidemenu_switchstate
     * toggle sidemenu switchstate on_toggle
     */
    var sidemenu = this.state.sidemenu;
    sidemenu[item.id - 1].switchstate = !sidemenu[item.id - 1].switchstate;
    this.setState({ sidemenu: sidemenu });
  }
  _render_slider_items = (item) => {
    /**
     * _render_side_menu_item
     * @param item slider item
     * template :
     * - key :  item key | type : integer
     * - image : item image | type : image
     * - mask: item mask | type : image | "/assets/card1mask.png" or "/assets/card2mask.png"
     * - lableline1: item text line 1 | type : string
     * - lableline2:  item text line 2 | type : string
     * - coverleft:  item cover location | type : bool | set true if you want the cover to be in the left side of the slider item
     */
    return (
      <LinearGradient
        start={{ x: 0.35, y: -0.09 }}
        end={{ x: 0.65, y: 1.05 }}
        colors={["#FFA296", "#FD715F"]}
        style={styles.slidercard}
      >
        {/* slider image */}
        <Image source={item.image} style={styles.slidercardimage} />
        {/* slider overlay mask */}
        <Image source={item.mask} style={styles.slidercardmask} />
        {/* slider card cover ( those patterns on the image ) */}
        <Image
          source={require("./../assets/cardcover.png")}
          style={[
            styles.slidercardcover,
            item.coverleft ? styles.slidercardcoverleft : {}, // card cover position (left or right)  flip the image
          ]}
        />
        {/* slider text */}
        <View style={styles.slidercardlabel}>
          <Text style={styles.slidercardlabel1}>{item.lableline1}</Text>
          <Text style={styles.slidercardlabel2}>{item.lableline2}</Text>
        </View>
      </LinearGradient>
    );
  };
  _render_side_menu_item(item) {
    /**
     * _render_side_menu_item
     * @param item menu item
     * template :
     * - id : menu id | type : integer
     * - title : menu title | type : string
     * - icon : menu icon | type : image
     * - switch : show switch | type :bool
     * - switchstate : switch is active | type :bool
     */
    const { navigation } = this.props; // navigation
    return (
      <TouchableOpacity
        style={styles.sidemenulistitem}
        key={item.id}
        onPress={() => {
          if (item.id == 1) navigation.navigate("Profile"); //if profile item navigate to profile page
        }}
      >
        {/* menu icon */}
        <Image source={item.icon} style={styles.sidemenulisticon} />
        {/* menu text */}
        <Text style={styles.sidemenulisttext}>{item.title}</Text>
        {/* menu switch */}
        {item.switch ? (
          <ToggleSwitch
            isOn={item.switchstate}
            onColor="#505EDC"
            offColor="#8A8CB2"
            size="medium"
            onToggle={() => {
              this.toggle_sidemenu_switchstate(item);
            }}
            thumbOnStyle={styles.sidemenuthumbon}
            thumbOffStyle={styles.sidemenuthumboff}
            trackOnStyle={styles.sidemenutrackon}
            trackOffStyle={styles.sidemenutrackoff}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
  _render_side_menu() {
    /**
     * side menu
     */
    return (
      <View style={styles.sidemenu}>
        <View style={styles.sidemenuhead}>
          {/* user avatar */}
          <Image
            source={require("./../assets/sidemenu/profileimg.png")}
            style={styles.sidemenuavatar}
          />
          {/* hello icon and text */}
          <View style={styles.sidemenuhello}>
            <MaskedView
              style={styles.sidemenuhelloview}
              maskElement={
                <View style={styles.sidemenuhellomaskview}>
                  <Text style={styles.sidemenuhellomasktext}>Hello</Text>
                </View>
              }
            >
              <LinearGradient
                start={{ x: 0.5, y: -0.3 }}
                end={{ x: 0.5, y: 1.27 }}
                colors={["#ffffff", "#8A8CB3"]}
                style={styles.sidemenuhellomaskbg}
              ></LinearGradient>
            </MaskedView>
            <Image
              source={require("./../assets/sidemenu/hi.png")}
              style={styles.sidemenuhelloicon}
            />
          </View>
          {/* user name */}
          <MaskedView
            style={styles.sidemenuusernameview}
            maskElement={
              <View style={styles.sidemenuusernamemaskview}>
                <Text style={styles.sidemenuusernamemasktext}>Thomas</Text>
              </View>
            }
          >
            <LinearGradient
              start={{ x: 0.5, y: -0.3 }}
              end={{ x: 0.5, y: 1.27 }}
              colors={["#ffffff", "#8A8CB3"]}
              style={styles.sidemenuusernamemaskbg}
            ></LinearGradient>
          </MaskedView>
          {/**
           * menu
           * for render item refer to "_render_side_menu_item" function
           */}
          <FlatList
            style={[
              styles.sidemenulist,
              { height: window.height * 0.75 - 300 }, // set menu height base on remaining space after side menu is open
            ]}
            data={this.state.sidemenu}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this._render_side_menu_item(item)}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
  _render_slider_tab_item(item) {
    /**
     * _render_slider_tab_item
     * @param item slider tab item
     * template :
     * - key :  item key | type : integer
     * - value : item title | type : string
     * - sliderkey: item slider key | type : integer | must be same as the slider_items key
     */
    return (
      <TouchableOpacity
        onLayout={(event) => {
          this.set_slider_tabs_width(event, item); // set item width for animation
        }}
        onPress={() => {
          this.slider_tab_item_press(item);
        }}
        style={styles.tab}
      >
        <Text
          style={[
            styles.tabtxt,
            this.state.slider_tabs_active == item.key
              ? styles.tabtxtactive
              : {}, //if it is the active tab change it color to white
          ]}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <ImageBackground source={require("./../assets/bg.png")} style={styles.bg}>
        {/* home page background shadow */}
        <Animated.View
          style={[
            styles.sidebarbgshadow,
            {
              transform: [
                {
                  scale: this.state.side_menu_Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.85], //scale down home page background shadow
                  }),
                },
                {
                  translateY: this.state.side_menu_Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, window.height * 0.75 - 10], //move down home page background shadow to 7.5 - 10px of the window height
                  }),
                },
              ],
            },
          ]}
        />
        {this._render_side_menu()}
        <TouchableOpacity
          disabled={!this.state.side_menu_open}
          activeOpacity={1}
          onPress={() => {
            this.toggle_sidemenu();
          }}
          style={{
            transform: [
              {
                scale: this.state.side_menu_Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9], // scale down home page
                }),
              },
              {
                translateY: this.state.side_menu_Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, window.height * 0.75], //move down home page to 7.5 of the window height
                }),
              },
            ],
          }}
        >
          <AnimatedImageBackground
            source={require("./../assets/bg.png")}
            style={[
              styles.bg,
              {
                borderRadius: this.state.side_menu_Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 23], // animate border radius
                }),
                overflow: "hidden",
              },
            ]}
          >
            <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
              <View style={styles.container2}>
                {/*toolbar start*/}
                <View style={styles.topbar}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toggle_sidemenu();
                    }}
                    style={styles.menu}
                  >
                    <Image
                      source={require("./../assets/menu.png")}
                      style={styles.menuicon}
                    />
                  </TouchableOpacity>
                  <View style={styles.logo}>
                    <Image
                      source={require("./../assets/logo.png")}
                      style={styles.logoicon}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("profile");
                      navigation.navigate("Profile"); //navigate to profile page
                    }}
                  >
                    <Image
                      source={require("./../assets/profile.png")}
                      style={styles.profileicon}
                    />
                  </TouchableOpacity>
                </View>
                {/*toolbar end*/}
                {/*scrollview start*/}
                <ScrollView
                  style={styles.containerscroll}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.containerscrollbox}>
                    {/*title start*/}
                    <View style={styles.title}>
                      <Text style={styles.label}>Let's Have</Text>
                      <MaskedView
                        maskElement={
                          <View style={styles.masklabel}>
                            <Text style={styles.masklabeltext}>
                              Some Activity!
                            </Text>
                          </View>
                        }
                      >
                        <Image
                          source={require("./../assets/hometitlemask.png")}
                          style={styles.masklabelimg}
                        />
                      </MaskedView>
                    </View>
                    {/*title end*/}
                    {/*activities start*/}
                    <View style={styles.activities}>
                      {/*activities walking start*/}
                      <Activitybox
                        cover={require("./../assets/icons/walk_cover.png")}
                        bg={require("./../assets/walking_bg.png")}
                        icon={require("./../assets/icons/walk.png")}
                        title="Walking"
                        iconwidth={64}
                        datatype={1}
                        datacurrent={0}
                        datatotal={8000}
                        datalabel="STEPS"
                        onPress={() => {
                          console.log("steps");
                        }}
                      />
                      {/*activities walking end*/}
                      {/*activities running start*/}
                      <Activitybox
                        cover={require("./../assets/icons/running_cover.png")}
                        bg={require("./../assets/running_bg.png")}
                        icon={require("./../assets/icons/running.png")}
                        title="Running"
                        coverstyle={{ bottom: 24, left: 12, opacity: 0.05 }}
                        iconwidth={48}
                        datatype={2}
                        datacurrent={0}
                        datacurrentdec={0}
                        dataunit="KM"
                        onPress={() => {
                          console.log("Running");
                        }}
                      />
                      {/*activities running end*/}
                      {/*activities cycling start*/}
                      <Activitybox
                        cover={require("./../assets/icons/bike-bicycle_cover.png")}
                        bg={require("./../assets/cycling_bg.png")}
                        icon={require("./../assets/icons/bike-bicycle.png")}
                        title="Cycling"
                        coverstyle={{ opacity: 0.05 }}
                        iconwidth={64}
                        datatype={2}
                        datacurrent={0}
                        datacurrentdec={0}
                        dataunit="KM"
                        onPress={() => {
                          navigation.navigate("Clubnav", {
                            screen: "Cycling",
                          }); /*navigate to cycling page*/
                        }}
                      />
                      {/*activities cycling end*/}
                    </View>
                    {/*activities end*/}
                    {/*slider start*/}
                    <View style={styles.slider}>
                      {/*slider tabs start*/}
                      <FlatList
                        style={styles.tabs}
                        data={this.state.slider_tab_items}
                        horizontal={true}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) =>
                          this._render_slider_tab_item(item)
                        }
                      />
                      {/*slider tabs end*/}
                      {/*slider tabsunderline animation start*/}
                      <View>
                        <Animated.View
                          style={[
                            styles.tabunderline,
                            {
                              transform: [
                                {
                                  translateX: this.state
                                    .slider_tab_underline_AnimX,
                                },
                              ],
                            },
                          ]}
                        ></Animated.View>
                      </View>
                      {/*slider tabsunderline animation end*/}
                      {/*slider images start*/}
                      <FlatList
                        ref={this._imageslider}
                        style={styles.sliderbox}
                        data={this.state.slider_items}
                        snapToAlignment={"center"}
                        snapToInterval={
                          styles.slidercard.width +
                          styles.slidercard.marginLeft +
                          styles.slidercard.marginRight
                        } // Adjust to your content width
                        decelerationRate={"fast"}
                        pagingEnabled
                        horizontal={true}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) =>
                          this._render_slider_items(item)
                        }
                        onViewableItemsChanged={
                          this.slider_viewable_items_changed
                        }
                        viewabilityConfig={{
                          itemVisiblePercentThreshold: 50,
                        }}
                      />
                      {/*slider images end*/}
                    </View>
                  </View>
                </ScrollView>
                {/*scrollview end*/}
              </View>
              {/*navigation start (remove comment when you don't want to use react native navigation bottom tab)*/}
              <Navigation activepageindex={0} />
              {/* fix navigation safe area background fix */}
              <View style={styles.navigationbgfix} />
              {/*navigation end*/}
            </SafeAreaView>
            <StatusBar style="light" />
          </AnimatedImageBackground>
        </TouchableOpacity>
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
    paddingTop: 44,
  },
  containerscroll: {
    flex: 1,
    marginTop: 10,
  },
  containerscrollbox: {
    paddingHorizontal: 16,
  },
  navigationbgfix: {
    backgroundColor: "#1A1735",
    position: "absolute",
    width: "100%",
    height: 100,
    bottom: 0,
    zIndex: -1,
  },
  bg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#1A1735",
  },
  topbar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  menu: {
    height: 38,
    justifyContent: "center",
  },
  menuicon: {
    width: 24,
    height: 11,
    resizeMode: "contain",
  },
  logo: {
    flex: 1,
    alignItems: "center",
  },
  logoicon: {
    width: 68,
    height: 21,
  },
  profileicon: {
    width: 38,
    height: 38,
  },
  title: {
    marginTop: 40,
    height: 85,
    marginBottom: 32,
  },
  label: {
    fontFamily: "Gilroy-Light",
    fontSize: 30,
    color: "#fff",
  },
  masklabel: {
    backgroundColor: "transparent",
    height: 49,
    alignItems: "flex-start",
  },
  masklabeltext: {
    fontSize: 40,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  masklabelimg: {
    width: "100%",
    height: 257,
    marginTop: -70,
    marginLeft: -20,
  },
  activities: {
    flexDirection: "row",
    height: 168,
  },
  activityboxborder: {
    height: 168,
    borderRadius: 16,
    padding: 1,
    flex: 1,
    marginHorizontal: 4,
  },
  activitybox: {
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  activityboxcover: {
    position: "absolute",
    bottom: -5,
    left: -15,
    opacity: 0.1,
  },
  activityboxbg: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    opacity: 0.15,
  },
  activityboxoverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  activityiconbox: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 9,
  },
  activityicon: {
    maxWidth: 64,
    resizeMode: "contain",
  },
  activitydata: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginBottom: 8,
  },
  activitydatalabel: {
    fontSize: 24,
    fontFamily: "Gilroy-Bold",
    color: "#fbfbfb",
  },
  activitydatalabel2: {
    fontSize: 16,
    fontFamily: "Gilroy-Bold",
    color: "#fbfbfb",
    alignSelf: "flex-end",
    marginBottom: 2,
  },
  activitydatalabels: {
    marginLeft: 3,
    alignItems: "center",
  },
  activitydatalabels1: {
    fontFamily: "Gilroy-Bold",
    fontSize: 12,
    color: "#fbfbfb",
  },
  activitydatalabels2: {
    fontFamily: "Gilroy-Bold",
    fontSize: 10,
    color: "rgba(251,251,251,0.5)",
    marginTop: -3,
  },
  activitydatalabels3: {
    fontFamily: "Gilroy-Bold",
    fontSize: 10,
    color: "rgba(251,251,251,0.5)",
    marginTop: -5,
    marginLeft: 3,
  },
  activityboxtitle: {
    width: window.width <= 320 ? 80 : 90, // responsive
    height: 45,
    alignSelf: "center",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  activityboxtitlel: {
    fontFamily: "Gilroy-Bold",
    color: "#3C3F69",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 20,
  },
  tab: {
    marginRight: 20,
    paddingVertical: 10,
  },
  tabtxt: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 14,
    color: "#8A8CB2",
  },
  tabtxtactive: {
    color: "#FBFBFB",
  },
  tabunderline: {
    width: 10,
    height: 2,
    backgroundColor: "#FBFBFB",
    position: "absolute",
    left: 0,
    bottom: 3,
  },
  slidercard: {
    width: 313,
    height: 233,
    borderRadius: 16,
    marginRight: 4,
    marginLeft: 16,
    overflow: "hidden",
  },
  sliderbox: {
    marginTop: 20,
    paddingBottom: 10,
    marginHorizontal: -16,
  },
  slidercardcover: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 3,
  },
  slidercardcoverleft: {
    transform: [{ rotateY: "180deg" }],
  },
  slidercardmask: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 2,
  },
  slidercardoverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.5,
  },
  slidercardimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  slidercardlabel: {
    position: "absolute",
    left: 32,
    bottom: 35,
    zIndex: 4,
  },
  slidercardlabel1: {
    fontSize: 24,
    color: "white",
    fontFamily: "Gilroy-Regular",
  },
  slidercardlabel2: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gilroy-Black",
  },
  sidebarbgshadow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 32,
    backgroundColor: "rgba(60,63,105,0.3)",
  },
  sidemenu: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
  },
  sidemenuhead: {
    paddingTop: 64,
    flexDirection: "column",
    alignItems: "center",
  },
  sidemenuavatar: {
    width: 100,
    height: 100,
    borderRadius: Platform.OS == "ios" ? 50 : 100, // ios fix
    marginBottom: 23,
  },
  sidemenuhello: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sidemenuhelloview: {
    width: 55,
  },
  sidemenuhelloicon: {
    width: 16,
    height: 16,
  },
  sidemenuhellomaskbg: {
    width: "100%",
    height: 20,
  },
  sidemenuhellomaskview: {
    backgroundColor: "transparent",
    height: 20,
    alignItems: "center",
  },
  sidemenuhellomasktext: {
    fontSize: 20,
    color: "white",
    fontFamily: "Gilroy-Medium",
  },
  sidemenuusernameview: {
    width: "100%",
    marginTop: 10,
  },
  sidemenuusernamemaskbg: {
    width: "100%",
    height: 24,
  },
  sidemenuusernamemaskview: {
    backgroundColor: "transparent",
    height: 24,
    alignItems: "center",
  },
  sidemenuusernamemasktext: {
    fontSize: 24,
    color: "white",
    fontFamily: "Gilroy-Bold",
  },
  sidemenulist: {
    width: "100%",
    paddingHorizontal: 34,
    marginTop: 22,
  },
  sidemenulistitem: {
    flexDirection: "row",
    marginVertical: 14,
    alignItems: "center",
  },
  sidemenulisticon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 22,
  },
  sidemenulisttext: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontFamily: "Gilroy-Bold",
  },
  sidemenuthumbon: {
    width: 26,
    height: 26,
    borderRadius: Platform.OS == "ios" ? 13 : 26, // ios fix
  },
  sidemenuthumboff: {
    width: 26,
    height: 26,
    borderRadius: Platform.OS == "ios" ? 13 : 26, // ios fix
  },
  sidemenutrackon: {
    width: 52,
    height: 30,
    padding: 2,
  },
  sidemenutrackoff: {
    width: 52,
    height: 30,
    padding: 2,
  },
});
