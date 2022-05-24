import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  BackHandler,
  Dimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import {
  Svg,
  Rect,
  Defs,
  LinearGradient as SLinearGradient,
  Stop,
  G,
  Path,
  Ellipse,
  ClipPath,
} from "react-native-svg";
import { BlurView } from "expo-blur";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Mapstyle } from "../map/Mapstyle";
import { StatusBar } from "expo-status-bar";
/* create TouchableOpacity AnimatedComponent for online member box animation */
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity
);
const window = Dimensions.get("window");
/**
 * Clubmap
 * figma page names : Club Map (3 pages)
 */
export default class Clubmap extends React.Component {
  constructor(props) {
    super(props);
    this.Map = React.createRef(); // create ref for map
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this); // bind handleBackButtonClick function
  }
  state = {
    open_memebers_box: false, // open memebers box list
    show_online_memeber_box: true, // show online memeber box or member maker box
    current_memeber_marker_index: 0, // current memeber marker index from map makers key
    open_memebers_boxheight_Anim: new Animated.Value(75), //open memebers box height animate
    user_current_location: {
      //user_current_location
      latitude: 40.69412,
      longitude: -73.74527,
    },
    map_markers: [
      {
        key: 0, //marker key | type : integer
        id: 1, //marker id | type : integer
        username: "Tatiana", //marker username | type : string
        name: "Tatiana Kenter", //marker user fullname | type : string
        activity: "cycling", //marker activity | type : string | "cycling","running","walking"
        distance: "10.8", //marker activity distance | type : string/integer
        unit: "km", //marker activity unit | type : string
        latitude: 40.69793, //marker last location latitude | type : integer
        longitude: -73.74501, //marker last location longitude | type : integer
        color: {
          //marker background color gradient | type : object of hex color | example : {start: "#D3FDBE",stop: "#94CF76"}
          start: "#D3FDBE",
          stop: "#94CF76",
        },
        avatar: require("./../assets/avatars/avatar18.png"), //marker user avatar | type : image
        coordinates: [
          // /marker user route | type: array of object | example : [{latitude: 40.69718,longitude: -73.74559,}]
          {
            latitude: 40.69718,
            longitude: -73.74559,
          },
          {
            latitude: 40.69637,
            longitude: -73.74527,
          },
          {
            latitude: 40.69617,
            longitude: -73.74623,
          },
          {
            latitude: 40.69754,
            longitude: -73.74681,
          },
          {
            latitude: 40.69793,
            longitude: -73.74501,
          },
        ],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)", //marker user route highlight color | type: rgba/hex | use 0.1 on alpha or don't :D
      },
      {
        key: 1,
        id: 1,
        username: "Chance",
        name: "Chance Holt",
        activity: "running",
        distance: "5.8",
        unit: "km",
        latitude: 40.69869,
        longitude: -73.74819,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar23.png"),
        coordinates: [
          {
            latitude: 40.69934278602453,
            longitude: -73.74357209186165,
          },
          {
            latitude: 40.70049780104269,
            longitude: -73.74415144897655,
          },
          {
            latitude: 40.699538001236796,
            longitude: -73.74775633769165,
          },
          {
            latitude: 40.698204019217606,
            longitude: -73.7471555229058,
          },
          {
            latitude: 40.69779731206886,
            longitude: -73.74867901754135,
          },
          {
            latitude: 40.69843177413634,
            longitude: -73.74900088260519,
          },
          {
            latitude: 40.69869,
            longitude: -73.74819,
          },
        ],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 2,
        id: 1,
        username: "Lawson",
        name: "Lawson Jarvis",
        activity: "walking",
        distance: "8.8",
        unit: "km",
        latitude: 40.695503437256285,
        longitude: -73.74829277946473,
        color: {
          start: "#FC8693",
          stop: "#F85365",
        },
        avatar: require("./../assets/avatars/avatar21.png"),
        coordinates: [
          {
            latitude: 40.69031345737122,
            longitude: -73.75056729258257,
          },
          {
            latitude: 40.69150116868967,
            longitude: -73.74734864194411,
          },
          {
            latitude: 40.69530821022101,
            longitude: -73.74915108630165,
          },
          {
            latitude: 40.69530821022101,
            longitude: -73.74915108630165,
          },
          {
            latitude: 40.695503437256285,
            longitude: -73.74829277946473,
          },
        ],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 3,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.69145,
        longitude: -73.74606,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar23.png"),
        coordinates: [
          {
            latitude: 40.68868642115827,
            longitude: -73.74393687226973,
          },
          {
            latitude: 40.69034599764589,
            longitude: -73.74307856543281,
          },
          {
            latitude: 40.691338469716946,
            longitude: -73.74625430072943,
          },
          {
            latitude: 40.69145,
            longitude: -73.74606,
          },
        ],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 4,
        id: 1,
        username: "Stacy",
        name: "Stacy Camacho",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 5,
        id: 1,
        username: "Misael",
        name: "Misael Simon",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.698293470400046,
        longitude: -73.75833500703541,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar19.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 6,
        id: 1,
        username: "Wayne",
        name: "Wayne Baker",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.69066324089907,
        longitude: -73.74966610794789,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar20.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 7,
        id: 1,
        username: "Lillie",
        name: "Lillie Mccoy",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.70026189526492,
        longitude: -73.74500979333901,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar21.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 8,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar22.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 9,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar23.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 10,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 11,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 12,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 13,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 14,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 15,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 16,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
      {
        key: 17,
        id: 1,
        username: "Kelton",
        name: "Kelton Carlson",
        activity: "cycling",
        distance: "10.8",
        unit: "km",
        latitude: 40.695430203127025,
        longitude: -73.73496760330691,
        color: {
          start: "#FFEAB6",
          stop: "#FFCB46",
        },
        avatar: require("./../assets/avatars/avatar24.png"),
        coordinates: [],
        coordinateshighlightcolor: "rgba(148,207,118,0.1)",
      },
    ],
  };
  componentDidMount() {
    /* add listener to back press*/
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    /* remove listener from back press*/
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  _render_map_marker(marker, index) {
    /**
     * _render_map_marker
     * render map markers
     * @param marker
     * key: marker key | type : integer
     * id: marker id | type : integer
     * username: marker username | type : string
     * name: marker user fullname | type : string
     * activity: marker activity | type : string | "cycling","running","walking"
     * distance: marker activity distance | type : string/integer
     * unit: marker activity unit | type : string
     * latitude: marker last location latitude | type : integer
     * longitude: marker last location longitude | type : integer
     * color: marker background color gradient | type : object of hex color | example : {start: "#D3FDBE",stop: "#94CF76"}
     * avatar: marker user avatar | type : image
     * coordinates: marker user route | type: array of object | example : [{latitude: 40.69718,longitude: -73.74559,}]
     * coordinateshighlightcolor: marker user route highlight color | type: rgba/hex | use 0.1 on alpha or don't :D
     * @param index
     * index : marker index
     */
    return (
      <View key={index}>
        <Marker
          key={index + "marker"}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          onPress={() => {
            //console.log(marker);
          }}
        >
          <View>
            <Svg width="60" height="63" viewBox="0 0 60 63" fill="none">
              <G clip-path="url(#clip0)">
                <Path
                  d="M43.7349 13.189C47.3778 16.8319 49.4244 21.7728 49.4244 26.9246C49.4244 32.0764 47.3778 37.0172 43.7349 40.6601L33.2362 51.1589C32.3777 52.0174 31.2134 52.4996 29.9994 52.4996C28.7854 52.4996 27.6211 52.0174 26.7626 51.1589L16.2638 40.6601C12.6209 37.0172 10.5744 32.0764 10.5744 26.9246C10.5744 21.7728 12.6209 16.8319 16.2638 13.189C19.9067 9.54615 24.8476 7.49959 29.9994 7.49959C35.1512 7.49959 40.092 9.54615 43.7349 13.189Z"
                  fill="url(#paint0_linear)"
                />
                <Path
                  d="M30 33.59C33.6809 33.59 36.665 30.606 36.665 26.925C36.665 23.244 33.6809 20.26 30 20.26C26.319 20.26 23.335 23.244 23.335 26.925C23.335 30.606 26.319 33.59 30 33.59Z"
                  stroke="#FBFBFB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </G>
              <Ellipse cx="30" cy="60.5" rx="6" ry="2.5" fill="#141227" />
              <Defs>
                <SLinearGradient
                  id="paint0_linear"
                  x1="16.5"
                  y1="7.5"
                  x2="36"
                  y2="54"
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop stopColor={marker.color.start} />
                  <Stop offset="0.919054" stopColor={marker.color.stop} />
                </SLinearGradient>
                <ClipPath id="clip0">
                  <Rect width="60" height="60" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
            <Image source={marker.avatar} style={styles.mapmarkeravatar} />
          </View>
        </Marker>
        {/*maker path taken start*/}
        {/*maker path taken dotted*/}
        <Polyline
          key={index + "coordinates"}
          coordinates={marker.coordinates}
          strokeWidth={3}
          miterlimit={1.30541}
          lineDashPattern={Platform.OS == "ios" ? [8, 8] : [0.1, 8]}
          strokeColor={marker.color.stop}
          linecap="round"
        />
        {/*maker path taken highlight*/}
        <Polyline
          key={index + "coordinateshighlight"}
          coordinates={marker.coordinates}
          strokeWidth={8}
          miterlimit={1.30541}
          strokeColor={marker.coordinateshighlightcolor}
          linecap="round"
        />
        {/*maker path taken startpoint*/}
        {marker.coordinates.length ? (
          <Marker
            key={index + "startpoint"}
            coordinate={marker.coordinates[0]}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={[
                styles.mapmarkerstartpoint,
                { backgroundColor: marker.color.stop },
              ]}
            ></View>
          </Marker>
        ) : null}
        {/*maker path taken end*/}
      </View>
    );
  }
  _render_online_memebers_box_item(item, index) {
    /**
     * _render_online_memebers_box_item
     * render online memebers box items
     * @param item
     * key: marker key | type : integer
     * id: marker id | type : integer
     * username: marker username | type : string
     * name: marker user fullname | type : string
     * activity: marker activity | type : string | "cycling","running","walking"
     * distance: marker activity distance | type : string/integer
     * unit: marker activity unit | type : string
     * latitude: marker last location latitude | type : integer
     * longitude: marker last location longitude | type : integer
     * color: marker background color gradient | type : object of hex color | example : {start: "#D3FDBE",stop: "#94CF76"}
     * avatar: marker user avatar | type : image
     * coordinates: marker user route | type: array of object | example : [{latitude: 40.69718,longitude: -73.74559,}]
     * coordinateshighlightcolor: marker user route highlight color | type: rgba/hex | use 0.1 on alpha or don't :D
     * @param index
     * index : marker index
     */
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.show_memeber_markerbox(index);
        }}
        disabled={!this.state.open_memebers_box}
      >
        <View
          style={[
            styles.members,
            this.state.open_memebers_box ? styles.members_open : {},
          ]}
        >
          <Image source={item.avatar} style={styles.memberavatar} />
          {this.state.open_memebers_box ? (
            <Text style={styles.memberusername}>{item.username}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
  _render_online_memebers_box() {
    /**
     * _render_online_memebers_box
     * render online members box
     */
    return (
      <View>
        <Animated.View
          style={[
            styles.mapmembergreendot,
            { bottom: this.state.open_memebers_boxheight_Anim }, // animate box toggle open
          ]}
        />
        <AnimatedTouchableOpacity
          onPress={() => {
            this.toggle_online_member_box();
          }}
          style={[
            styles.mapmembersbox,
            { height: this.state.open_memebers_boxheight_Anim }, // animate box toggle open
          ]}
          disabled={this.state.open_memebers_box} // disable when box is open
        >
          <BlurView intensity={Platform.OS == "ios" ? 69 : 100} tint={"dark"}>
            <View style={styles.mapmembersboxinside}>
              {/*map members bg start*/}
              {this.state.open_memebers_box ?? (
                <Image
                  source={require("./../assets/mapmemberoverlay.png")}
                  style={styles.mapmemberoverlay}
                />
              )}
              <Image
                source={
                  this.state.open_memebers_box
                    ? require("./../assets/mapmembergreenglow2.png")
                    : require("./../assets/mapmembergreenglow.png")
                }
                style={styles.mapmemberoverlay2}
              />

              {/*map members bg end*/}
              {this.state.open_memebers_box ? (
                <TouchableOpacity
                  onPress={() => {
                    this.toggle_online_member_box();
                  }}
                  style={styles.closememebers}
                >
                  <Image
                    source={require("./../assets/icons/arrow-down.png")}
                    style={styles.closememebersimg}
                  />
                </TouchableOpacity>
              ) : null}
              {this.state.open_memebers_box ? (
                <Text style={styles.onlinemapmemberstext}>
                  {this.state.map_markers.length} Online Friends
                </Text>
              ) : null}
              {/*map members list start*/}
              <FlatList
                key={
                  this.state.open_memebers_box
                    ? "open_memebers_box"
                    : "closememebers"
                } // change the key to force flatlist to update
                style={[
                  styles.mapmembers,
                  this.state.open_memebers_box ? styles.mapmembers_open : {},
                ]}
                contentContainerStyle={[
                  styles.mapmemberscontainerstyle,
                  this.state.open_memebers_box
                    ? styles.mapmemberscontainerstyle_open
                    : {},
                ]}
                numColumns={
                  this.state.open_memebers_box
                    ? window.width < 384
                      ? 4
                      : 5
                    : null // responsive fix
                }
                data={
                  this.state.open_memebers_box
                    ? this.state.map_markers
                    : this.state.map_markers.slice(0, 7) // only show 7 members when box is closed
                }
                horizontal={!this.state.open_memebers_box}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item, index }) =>
                  this._render_online_memebers_box_item(item, index)
                }
                ListFooterComponent={
                  this.state.map_markers.length > 7 ? ( // show + when markers are more than 7
                    <LinearGradient
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      colors={["rgba(60,63,105,1)", "rgba(60,63,105,0.72)"]}
                      style={[
                        styles.membersmore,
                        this.state.open_memebers_box ? { display: "none" } : {},
                      ]}
                    >
                      <Text style={styles.membersmoretext}>
                        +{this.state.map_markers.length - 7}
                      </Text>
                    </LinearGradient>
                  ) : null
                }
              />
              {/*map members list end*/}
            </View>
          </BlurView>
        </AnimatedTouchableOpacity>
      </View>
    );
  }
  _render_member_maker_box() {
    /**
     * _render_member_maker_box
     * render member maker box
     */
    return (
      <View>
        {/* start show on the map pin icon */}
        <TouchableOpacity
          onPress={() => {
            this.show_member_marker_on_the_map();
          }}
          style={styles.membermarkerpin}
        >
          <LinearGradient
            start={{ x: -0.12, y: -0.34 }}
            end={{ x: 0.67, y: 1 }}
            colors={["#505EDC", "#FB558B"]}
            style={styles.membermarkerpinicon}
          >
            <Image
              source={require("../assets/icons/pin.png")}
              style={styles.membermarkerpiniconimg}
            />
          </LinearGradient>
        </TouchableOpacity>
        {/* end show on the map pin icon */}
        {/* start member marker box */}
        <BlurView
          style={styles.membermarkerbox}
          intensity={Platform.OS == "ios" ? 69 : 100}
          tint={"dark"}
        >
          <View
            style={[
              styles.mapmembersboxinside,
              { flexDirection: "row", paddingHorizontal: 15 },
            ]}
          >
            <View
              style={[
                styles.membermarkeravatar,
                {
                  borderColor: this.state.map_markers[
                    this.state.current_memeber_marker_index
                  ].color.start,
                },
              ]}
            >
              {/* member marker box user avatar */}
              <Image
                source={
                  this.state.map_markers[
                    this.state.current_memeber_marker_index
                  ].avatar
                }
                style={styles.membermarkeravatarimg}
              />
            </View>
            <View style={styles.membermarkerinfo}>
              {/* member marker box user fullname */}
              <Text style={styles.membermarkerinfoname}>
                {
                  this.state.map_markers[
                    this.state.current_memeber_marker_index
                  ].name
                }
              </Text>
              <View style={styles.membermarkerinfostatus}>
                {/* member marker box activity icon */}
                <Image
                  source={this.get_current_memeber_marker_activity_icon(
                    this.state.map_markers[
                      this.state.current_memeber_marker_index
                    ].activity
                  )}
                  style={styles.membermarkerinfoactivityicon}
                />
                <Image
                  source={require("./../assets/icons/small/distance.png")}
                  style={styles.membermarkerinfodistanceicon}
                />
                {/* member marker box activity distance */}
                <Text style={styles.membermarkerinfodistance}>
                  {
                    this.state.map_markers[
                      this.state.current_memeber_marker_index
                    ].distance
                  }
                </Text>
                {/* member marker box activity distance unit */}
                <Text style={styles.membermarkerinfodistanceunit}>
                  {
                    this.state.map_markers[
                      this.state.current_memeber_marker_index
                    ].unit
                  }
                </Text>
              </View>
            </View>
          </View>
        </BlurView>
        {/* end member marker box */}
      </View>
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
  toggle_online_member_box() {
    /* open/close online member box list */
    if (this.state.open_memebers_box) {
      /* animate height */
      Animated.timing(this.state.open_memebers_boxheight_Anim, {
        toValue: 75,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      /* set box closed */
      this.setState({ open_memebers_box: false });
    } else {
      /* animate height */
      Animated.timing(this.state.open_memebers_boxheight_Anim, {
        toValue: 307,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      /* set box open */
      this.setState({ open_memebers_box: true });
    }
  }
  get_current_memeber_marker_activity_icon(activityname) {
    /**
     * get_current_memeber_marker_activity_icon
     * @param activityname type:string | "cycling","running","walking"
     * @return activity icon
     */
    let icon = null;
    switch (activityname) {
      case "cycling":
        icon = require("./../assets/icons/small/cycling.png");
        break;
      case "running":
        icon = require("./../assets/icons/small/running.png");
        break;
      case "walking":
        icon = require("./../assets/icons/small/walking.png");
        break;
      default:
        icon = require("./../assets/icons/small/cycling.png");
    }
    return icon;
  }
  async show_member_marker_on_the_map() {
    /* move the map camera to the location of the current memeber marker index */
    const camera = await this.Map.current.getCamera();
    /* get lat and lon form current memeber marker form markers */
    camera.center.latitude = this.state.map_markers[
      this.state.current_memeber_marker_index
    ].latitude;
    camera.center.longitude = this.state.map_markers[
      this.state.current_memeber_marker_index
    ].longitude;
    /* move the map camera to the new location */
    this.Map.current.animateCamera(camera, { duration: 2000 });
  }
  handleBackButtonClick() {
    /* if online memeber box is hidden ( means member maker box is visible) show it if not regular backpress function */
    if (!this.state.show_online_memeber_box) {
      this.setState({ show_online_memeber_box: true });
      return true;
    }
  }
  show_memeber_markerbox(index) {
    /* hide online memeber box and show memeber marker box */
    this.setState({
      show_online_memeber_box: false,
      current_memeber_marker_index: index,
    });
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <SafeAreaView style={styles.container}>
        {/*map start*/}
        <MapView
          ref={this.Map}
          initialRegion={this.get_region_from_latlon(
            40.6945517,
            -73.7468122,
            650
          )}
          customMapStyle={Mapstyle}
          provider={PROVIDER_GOOGLE}
          style={styles.mapview}
        >
          {/*map maker start*/}
          {this.state.map_markers.map((marker, index) =>
            this._render_map_marker(marker, index)
          )}
          {/*map maker end*/}
          {/*map my location maker start*/}
          <Marker
            key={"user_current_location"}
            coordinate={this.state.user_current_location}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View>
              <Image
                source={require("../assets/icons/mylocation.png")}
                style={styles.mapuser_current_locationimg}
              />
            </View>
          </Marker>
          {/*map my location maker end*/}
        </MapView>
        {/*map end*/}
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
        <View>
          {/*return user_current_location button start*/}
          {!this.state.open_memebers_box &&
          this.state.show_online_memeber_box ? (
            <TouchableOpacity
              onPress={() => {
                console.log("click");
              }}
              style={styles.location}
            >
              <LinearGradient
                start={{ x: -0.37, y: -1.15 }}
                end={{ x: 0.67, y: 1 }}
                colors={["#FBFBFB", "#8A8CB3"]}
                style={styles.locationbg}
              >
                <Image
                  source={require("./../assets/icons/location.png")}
                  style={styles.locationimg}
                />
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
          {/*return user_current_location button end*/}
          {/*map members start*/}
          {this.state.show_online_memeber_box
            ? this._render_online_memebers_box()
            : this._render_member_maker_box()}
          {/*map members end*/}
        </View>
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
  returnbutton: {
    position: "absolute",
    left: 16,
    top: Platform.OS == "ios" ? 60 : 40, // ios fix
    width: 44,
    height: 44,
    borderRadius: Platform.OS == "ios" ? 22 : 44, // ios fix
    backgroundColor: "rgba(60,63,105,0.49)",
    justifyContent: "center",
    alignItems: "center",
  },
  returnbuttonimg: {
    width: 9,
    height: 16,
    resizeMode: "contain",
  },
  members_open: {
    marginHorizontal: 15,
    marginBottom: 17,
  },
  mapmembers_open: {
    marginBottom: 10,
  },
  mapmembersbox: {
    position: "absolute",
    width: "94%",
    height: 75,
    left: "3%",
    bottom: 6,
    borderRadius: 16,
    zIndex: 1,
    overflow: "hidden",
  },
  membermarkerbox: {
    position: "absolute",
    width: "94%",
    height: 124,
    left: "3%",
    bottom: 6,
    borderRadius: 16,
    zIndex: 1,
    overflow: "hidden",
  },
  mapmembersboxblur: {
    borderRadius: 16,
    overflow: "hidden",
  },
  mapmembersboxinside: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(60,63,105,0.69)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapmemberoverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  mapmemberoverlay2: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  mapmembergreendot: {
    position: "absolute",
    width: 10,
    height: 10,
    left: "8%",
    bottom: 75,
    backgroundColor: "#94CF76",
    borderRadius: 10,
    zIndex: 2,
  },
  memberavatar: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    marginRight: -3,
  },
  memberusername: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 12,
    color: "#ffffff",
    marginTop: 5,
    textAlign: "center",
  },
  mapmemberscontainerstyle: {
    paddingRight: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  mapmemberscontainerstyle_open: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  onlinemapmemberstext: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 16,
    color: "#94CF76",
    marginBottom: 15,
    paddingLeft: 16,
    marginTop: 24,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  membersmore: {
    width: 45,
    height: 46,
    borderRadius: Platform.OS == "ios" ? 22 : 44, // ios fix
    marginLeft: -41,
    marginTop: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  membersmoretext: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 20,
    color: "#ffffff",
  },
  closememebers: {
    height: 32,
    width: 100,
    position: "absolute",
    top: 0,
    right: "50%",
    marginRight: -50,
    justifyContent: "center",
    alignItems: "center",
  },
  closememebersimg: {
    width: 30,
    height: 6,
    resizeMode: "contain",
  },
  location: {
    position: "absolute",
    width: 44,
    height: 44,
    bottom: 108,
    right: "3%",
  },
  locationbg: {
    width: 44,
    height: 44,
    borderRadius: Platform.OS == "ios" ? 22 : 44, // ios fix
    justifyContent: "center",
    alignItems: "center",
  },
  locationimg: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  mapmarkerstartpoint: {
    width: 8,
    height: 8,
    borderRadius: Platform.OS == "ios" ? 4 : 8, // ios fix
  },
  mapmarkeravatar: {
    position: "absolute",
    width: 30,
    height: 30,
    left: 15,
    top: 12,
    borderRadius: Platform.OS == "ios" ? 14 : 28, // ios fix
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  mapuser_current_locationimg: {
    width: 188,
    height: 188,
  },
  membermarkeravatar: {
    width: 58,
    height: 58,
    borderRadius: Platform.OS == "ios" ? 29 : 58, // ios fix
    borderWidth: 3,
  },
  membermarkeravatarimg: {
    width: 52,
    height: 52,
    resizeMode: "contain",
    borderRadius: Platform.OS == "ios" ? 29 : 58, // ios fix
  },
  membermarkerinfo: {
    flex: 1,
    marginLeft: 20,
  },
  membermarkerinfoname: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 18,
    color: "#ffffff",
  },
  membermarkerinfostatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  membermarkerinfoactivityicon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },
  membermarkerinfodistanceicon: {
    width: 41,
    height: 6,
    resizeMode: "contain",
    marginRight: 5,
  },
  membermarkerinfodistance: {
    fontFamily: "Gilroy-SemiBold",
    fontSize: 18,
    color: "#ffffff",
  },
  membermarkerinfodistanceunit: {
    fontFamily: "Gilroy-Bold",
    fontSize: 14,
    color: "#ffffff",
    marginLeft: 3,
    marginTop: 4,
  },
  membermarkerpin: {
    width: 44,
    height: 44,
    position: "absolute",
    bottom: 110,
    right: "5%",
    zIndex: 2,
  },
  membermarkerpinicon: {
    width: 44,
    height: 44,
    borderRadius: Platform.OS == "ios" ? 22 : 44, // ios fix
    justifyContent: "center",
    alignItems: "center",
  },
  membermarkerpiniconimg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
