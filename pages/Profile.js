import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  Svg,
  Rect,
  Defs,
  Stop,
  LinearGradient as SlinearGradient,
} from "react-native-svg";
import Linechart2 from "../components/Linechart2";
import Piechart from "../components/Piechart";
/**
 * Statisticblock
 * @param children : Statistic block childeren | type : react element
 */
const Statisticblock = ({ children }) => {
  return (
    <View style={styles.statisticblock}>
      <LinearGradient
        start={{ x: 0.4, y: -0.1 }}
        end={{ x: 0.74, y: 1.42 }}
        colors={[
          "rgba(138,140,178,1)",
          "rgba(138,140,178,0)",
          "rgba(138,140,178,0)",
          "rgba(125,1169,244,1)",
        ]}
        locations={[0, 0.348069, 0.596479, 1]}
        style={styles.statisticblockoutline}
      >
        <LinearGradient
          start={{ x: 0.41, y: -1.16 }}
          end={{ x: 1.57, y: 0.32 }}
          colors={["#8A8CB3", "#3C3F69"]}
          style={styles.statisticblockbg}
        />
      </LinearGradient>
      {children}
    </View>
  );
};
/**
 * Profile
 * figma page names : My Profile,Profile - Others,Profile - Others - Stories
 */
export default class Profile extends React.Component {
  state = {
    piechartdata: [30, 80, 60], // pie chart array of chart value length of 3 | key 0 for yellow circle , key 1 for red circle , key 2 for blue circle
    linechartdata: [50, 35, 65, 50, 85], // line chart array of chart value
    stories: [
      //stories items
      {
        id: 1, //story id | type : integer
        image: require("./../assets/profile/story.png"), //story image | type : image
        likes: "3.2K", //story likes | type : integer/string
        playable: false, //story is video | type : bool | this will only show a play icon on top left of the story image nothing more
      },
      {
        id: 2,
        image: require("./../assets/profile/story2.png"),
        likes: "5.7K",
        playable: false,
      },
      {
        id: 3,
        image: require("./../assets/profile/story3.png"),
        likes: "1.9K",
        playable: true,
      },
    ],
    storiesvisible: false, // is stories are visible
    storiesvisibleAnim: new Animated.Value(0), // when stories become visible border radius of the top of the profile will be animated
    savedscrollpositionY: 0, // save scroll Y position to check for scroll direction
  };
  _render_stories_items(item) {
    /**
     * _render_stories_items
     * @param item story item
     * template :
     * - id : story id | type : integer
     * - image : story image | type : image
     * - likes: story likes | type : integer/string
     * - playable: story is video | type : bool | this will only show a play icon on top left of the story image nothing more
     */
    return (
      <View key={item.id} style={styles.story}>
        <Image source={item.image} style={styles.storyimg} />
        <View style={styles.storylikes}>
          <Image
            source={require("./../assets/profile/heart.png")}
            style={styles.storylikesicon}
          />
          <Text style={styles.storylikesnum}>{item.likes}</Text>
        </View>
        {item.playable ? (
          <Image
            source={require("./../assets/profile/video.png")}
            style={styles.storyplayableicon}
          />
        ) : null}
      </View>
    );
  }
  _render_avatar_bg() {
    /**
     * _render_avatar_bg
     * render avatar svg background
     */
    return (
      <Svg
        style={styles.Profileheaderavatarbg}
        width="116"
        height="116"
        viewBox="0 0 116 116"
        fill="none"
      >
        <Rect
          x="1"
          y="1"
          width="114"
          height="114"
          rx="57"
          stroke="url(#paint0_linear)"
          strokeWidth="2"
        />
        <Defs>
          <SlinearGradient
            id="paint0_linear"
            x1="28.9818"
            y1="0.999999"
            x2="70.4364"
            y2="118.109"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.0310714" stopColor="#5652E5" />
            <Stop offset="0.284608" stopColor="#B5BFFF" stopOpacity="0.47" />
            <Stop offset="0.533119" stopColor="#9557AD" />
            <Stop offset="1" stopColor="#F85365" />
          </SlinearGradient>
        </Defs>
      </Svg>
    );
  }
  _onContentSizeChange() {
    /**
     * _onContentSizeChange
     * set profile scroll view default y position to 311 to hide the stories when first-time layout is loaded
     * */
    this.scrollView.scrollTo({ x: 0, y: 320, animated: false });
  }
  render() {
    const { navigation } = this.props; // navigation
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          {/* story box end*/}
          <ScrollView
            ref={(scrollView) => (this.scrollView = scrollView)}
            style={styles.container2}
            onContentSizeChange={() => {
              this._onContentSizeChange();
            }}
            snapToOffsets={[0, 320]} // set offset of the stories and profile for scrollview to snap to
            snapToAlignment="center"
            decelerationRate={0}
          >
            {/* stories */}
            <FlatList
              style={styles.stories}
              contentContainerStyle={styles.storiescontentcontainer}
              data={this.state.stories}
              renderItem={({ item }) => this._render_stories_items(item)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
            />
            {/* profile start */}
            <Animated.View
              style={[
                styles.container3,
                {
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                },
              ]}
            >
              {/* profile back button */}
              <TouchableOpacity
                style={styles.backbutton}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require("./../assets/profile/arrowleft.png")}
                  style={styles.backbuttonicon}
                />
              </TouchableOpacity>
              {/* profile header start */}
              <View style={styles.Profileheader}>
                {/* profile header cover */}
                <Image
                  source={require("./../assets/profile/cover.png")}
                  style={styles.Profileheaderbg}
                />
                {/* profile header cover overlay*/}
                <LinearGradient
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  colors={["rgba(20,18,39,0)", "rgba(20,18,39,1)"]}
                  style={styles.Profileheaderbgmask}
                />
                {/* profile header user avatar*/}
                <View style={styles.Profileheaderavatar}>
                  {/* profile header user avatar svg bg*/}
                  {this._render_avatar_bg()}
                  {/* profile header user avatar image*/}
                  <Image
                    source={require("./../assets/profile/avatar.png")}
                    style={styles.Profileheaderavatarimg}
                  />
                  {/* profile header user avatar change button*/}
                  <TouchableOpacity style={styles.Profileheaderavatarchange}>
                    <Image
                      source={require("./../assets/profile/camera.png")}
                      style={styles.Profileheaderavatarchangeimg}
                    />
                  </TouchableOpacity>
                </View>
                {/* profile header user fullname*/}
                <MaskedView
                  style={styles.Profileusername}
                  maskElement={
                    <View style={styles.masklabelview}>
                      <Text style={styles.masklabeltext}>Eliza Nichols</Text>
                    </View>
                  }
                >
                  <Image
                    source={require("./../assets/profile/namemask.png")}
                    style={styles.masklabelimg}
                  />
                </MaskedView>
                {/* profile header user data start*/}
                <View style={styles.Profiledata}>
                  {/* profile header user data col*/}
                  <View style={[styles.Profiledatacol, { borderLeftWidth: 0 }]}>
                    <Text style={styles.Profiledatatitle}>Followers</Text>
                    <View style={styles.Profiledatarow}>
                      <Text style={styles.Profiledatalabel}>2.7</Text>
                      <Text style={styles.Profiledataunit}>K</Text>
                    </View>
                  </View>
                  {/* profile header user data col*/}
                  <View style={styles.Profiledatacol}>
                    <Text style={styles.Profiledatatitle}>Activitty</Text>
                    <View style={styles.Profiledatarow}>
                      <Text style={styles.Profiledatalabel}>45</Text>
                      <Text style={styles.Profiledataunit}>KM</Text>
                    </View>
                  </View>
                </View>
                {/* profile header user data end*/}
                {/* profile header actions start*/}
                <View style={styles.Profileactions}>
                  {/* profile header actions col*/}
                  <View style={styles.Profileactioncol}>
                    {/* profile header actions follow button (blue)*/}
                    <TouchableOpacity
                      style={styles.Profileactionbtn}
                      onPress={() => {
                        console.log("follow");
                      }}
                    >
                      <LinearGradient
                        start={{ x: 0.11, y: -0.21 }}
                        end={{ x: 0.16, y: 0.62 }}
                        colors={[
                          "rgba(255,255,255,0.13)",
                          "rgba(255,255,255,0.13)",
                        ]}
                        style={styles.Profileactionbtnoutline}
                      >
                        <LinearGradient
                          start={{ x: 0.24, y: -0.09 }}
                          end={{ x: 0.28, y: 1.05 }}
                          colors={["#7773FA", "#5652E5"]}
                          style={styles.Profileactionbtnbg}
                        >
                          {/* profile header actions button text*/}
                          <Text style={styles.Profileactionbtntext}>
                            Follow
                          </Text>
                        </LinearGradient>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  {/* profile header actions col*/}
                  <View style={styles.Profileactioncol}>
                    {/* profile header actions message button (gray)*/}
                    <TouchableOpacity style={styles.Profileactionbtn}>
                      <LinearGradient
                        start={{ x: 0.11, y: -0.21 }}
                        end={{ x: 0.16, y: 0.62 }}
                        colors={[
                          "rgba(255,255,255,0.13)",
                          "rgba(255,255,255,0.13)",
                        ]}
                        style={styles.Profileactionbtnoutline}
                      >
                        <LinearGradient
                          start={{ x: -0.28, y: -3.53 }}
                          end={{ x: -0.29, y: 0.98 }}
                          colors={["#FBFBFB", "#8A8CB3"]}
                          style={styles.Profileactionbtnbg}
                        >
                          {/* profile header actions button text*/}
                          <Text style={styles.Profileactionbtntext}>
                            Message
                          </Text>
                        </LinearGradient>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* profile header actions end*/}
              </View>
              {/* profile header end */}
              {/* profile statistics start */}
              <View style={styles.statistics}>
                {/* profile statistics left col */}
                <View style={styles.statisticscol1}>
                  {/* profile statistics block */}
                  <Statisticblock>
                    {/* profile statistics Piechart */}
                    <Piechart
                      chartWidth="164"
                      chartHeight="164"
                      chartdata={this.state.piechartdata}
                      Animate={true}
                    />
                  </Statisticblock>
                  {/* profile statistics block */}
                  <Statisticblock>
                    {/* profile statistics block title*/}
                    <View style={styles.statisticblocktitle}>
                      <Text style={styles.statisticblocktitletxt}>Running</Text>
                      <View style={styles.statisticblocktitlerw}>
                        <Text style={styles.statisticblocktitletxt2}>45</Text>
                        <Text style={styles.statisticblocktitleunit}>km</Text>
                      </View>
                    </View>
                    {/* profile statistics Linechart2 */}
                    <Linechart2
                      chartWidth="165"
                      chartHeight="164"
                      chartdata={this.state.linechartdata}
                      chartdatamaxvalue={100}
                      AnimateLine={true}
                      showGrid={true}
                    />
                  </Statisticblock>
                  {/* profile statistics block */}
                  <Statisticblock>
                    <Image
                      source={require("./../assets/profile/medal.png")}
                      style={styles.statisticblock3img}
                    />
                    <View style={styles.statisticblock3titlerw}>
                      <Image
                        source={require("./../assets/profile/x.png")}
                        style={styles.statisticblock3x}
                      />
                      <Text style={styles.statisticblock3title}>3</Text>
                    </View>
                    <Text style={styles.statisticblock3label}>
                      Achievements
                    </Text>
                  </Statisticblock>
                </View>
                {/* profile statistics left col end*/}
                {/* profile statistics right col */}
                <View style={styles.statisticscol2}>
                  {/* profile statistics block */}
                  <Statisticblock>
                    <Text style={styles.statisticblock2title}>Walking</Text>
                    <View style={styles.statisticblock2rw}>
                      <Text style={styles.statisticblock2label}>45</Text>
                      <Text style={styles.statisticblock2unit}>KM</Text>
                    </View>
                  </Statisticblock>
                  {/* profile statistics block */}
                  <Statisticblock>
                    <Image
                      source={require("./../assets/profile/trophy.png")}
                      style={styles.statisticblock3img2}
                    />
                    <View style={styles.statisticblock3titlerw}>
                      <Image
                        source={require("./../assets/profile/x.png")}
                        style={styles.statisticblock3x}
                      />
                      <Text style={styles.statisticblock3title}>3</Text>
                    </View>
                    <Text style={styles.statisticblock3label}>
                      Achievements
                    </Text>
                  </Statisticblock>
                  {/* profile statistics block */}
                  <Statisticblock>
                    <Text style={styles.statisticblock2title}>Running</Text>
                    <View style={styles.statisticblock2rw}>
                      <Text style={styles.statisticblock2label}>17</Text>
                      <Text style={styles.statisticblock2unit}>KM</Text>
                    </View>
                  </Statisticblock>
                </View>
                {/* profile statistics right col end*/}
              </View>
              {/* profile statistics start */}
            </Animated.View>
            {/* profile end */}
          </ScrollView>
          <StatusBar style="light" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141227",
  },
  container2: {
    flex: 1,
  },
  container3: {
    backgroundColor: "#141227",
    overflow: "hidden",
  },
  backbutton: {
    position: "absolute",
    top: 39,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: Platform.OS == "ios" ? 21 : 42, //ios fix
    backgroundColor: "rgba(60,63,105,0.49)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  backbuttonicon: {
    width: 7,
    height: 14,
    resizeMode: "contain",
  },
  Profileheader: {
    paddingTop: 83,
    alignItems: "center",
    zIndex: 3,
  },
  Profileheaderbg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 312,
    resizeMode: "cover",
    opacity: 0.2,
    zIndex: 1,
  },
  Profileheaderbgmask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 312,
    resizeMode: "cover",
    zIndex: 1,
  },
  Profileheaderavatar: {
    width: 114,
    height: 134,
    zIndex: 2,
  },
  Profileheaderavatarimg: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: Platform.OS == "ios" ? 50 : 100, //ios fix
    top: 7,
    left: 7,
  },
  Profileheaderavatarchange: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: Platform.OS == "ios" ? 16 : 32, //ios fix
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A8CB2",
  },
  Profileheaderavatarchangeimg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  Profileusername: {
    height: 39,
    width: "100%",
    zIndex: 2,
    marginTop: 22,
  },
  masklabelview: {
    backgroundColor: "transparent",
    height: 39,
    alignItems: "center",
  },
  masklabeltext: {
    fontSize: 32,
    color: "white",
    fontFamily: "Gilroy-Bold",
  },
  masklabelimg: {
    resizeMode: "cover",
    width: "100%",
    height: 215,
    marginTop: -90,
  },
  Profiledata: {
    marginTop: 30,
    flexDirection: "row",
    zIndex: 2,
  },
  Profiledatacol: {
    flex: 1,
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(138,140,178,0.15)",
  },
  Profiledatatitle: {
    fontSize: 14,
    color: "#8A8CB2",
    fontFamily: "Gilroy-Medium",
  },
  Profiledatarow: {
    flexDirection: "row",
  },
  Profiledatalabel: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  Profiledataunit: {
    fontSize: 12,
    color: "#8A8CB2",
    fontFamily: "Gilroy-ExtraBold",
    alignSelf: "flex-end",
    marginBottom: 5,
    marginLeft: 2,
  },
  Profileactions: {
    flexDirection: "row",
    marginVertical: 30,
  },
  Profileactioncol: {
    flex: 1,
    alignItems: "center",
  },
  Profileactionbtnoutline: {
    width: 140,
    height: 50,
    padding: 1,
    borderRadius: 12,
  },
  Profileactionbtnbg: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  Profileactionbtntext: {
    fontSize: 18,
    color: "white",
    fontFamily: "Gilroy-Bold",
  },
  statistics: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  statisticscol1: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 7,
  },
  statisticscol2: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 7,
  },
  statisticblock: {
    marginBottom: 13,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  statisticblock2title: {
    fontSize: 14,
    color: "#8A8CB2",
    fontFamily: "Gilroy-Medium",
    marginTop: 20,
  },
  statisticblock2rw: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statisticblock2label: {
    fontSize: 30,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  statisticblock2unit: {
    fontSize: 12,
    color: "#8A8CB2",
    fontFamily: "Gilroy-ExtraBold",
    alignSelf: "flex-end",
    marginBottom: 5,
    marginLeft: 2,
  },
  statisticblockoutline: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
    borderRadius: 16,
    padding: 1,
  },
  statisticblockbg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "#141227",
  },
  statisticblocktitle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 11,
    alignItems: "center",
  },
  statisticblocktitletxt: {
    fontSize: 16,
    color: "white",
    fontFamily: "Gilroy-Bold",
    flex: 1,
  },
  statisticblocktitlerw: {
    flexDirection: "row",
  },
  statisticblocktitletxt2: {
    fontSize: 18,
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
  },
  statisticblocktitleunit: {
    fontSize: 14,
    color: "#8A8CB3",
    fontFamily: "Gilroy-ExtraBold",
    alignSelf: "flex-end",
    marginLeft: 2,
  },
  statisticblock3titlerw: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  statisticblock3title: {
    fontSize: 32,
    color: "#ffffff",
    fontFamily: "Gilroy-Bold",
  },
  statisticblock3x: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  statisticblock3label: {
    fontSize: 16,
    color: "#8A8CB2",
    fontFamily: "Gilroy-SemiBold",
    marginBottom: 19,
  },
  statisticblock3img: {
    position: "absolute",
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  statisticblock3img2: {
    position: "absolute",
    width: 240,
    height: 200,
    resizeMode: "cover",
    top: -35,
  },
  storybox: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  storyboxholder: {
    height: 311,
  },
  stories: {
    flexDirection: "row",
    paddingTop: 52,
    paddingBottom: 31,
  },
  storiescontentcontainer: {
    paddingHorizontal: 16,
  },
  story: {
    marginRight: 10,
  },
  storyimg: {
    width: 127,
    height: 227,
    borderRadius: 8,
  },
  storylikes: {
    flexDirection: "row",
    opacity: 0.7,
    alignItems: "center",
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
  },
  storylikesicon: {
    width: 28,
    height: 28,
  },
  storylikesnum: {
    fontSize: 14,
    color: "#FBFBFB",
    fontFamily: "Gilroy-Bold",
    marginLeft: 8,
  },
  storyplayableicon: {
    position: "absolute",
    top: 16,
    left: 12,
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
});
