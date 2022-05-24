import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-snap-carousel";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
const window = Dimensions.get("window");
/**
 * Stories
 * figma page names : Stories
 */
export default class Stories extends React.Component {
  state = {
    story_slider_active_slide: 0, // story slider active slider
    storysliderpagedotAnim: new Animated.Value(0), // story slider pagination dot animation
    storyslider: [
      //story slider items
      {
        id: 1, //story slider item id | type : integer
        username: "Eliza Nichols", //story slider item username | type : string
        time: "10 min ago", //story slider item time | type : string
        avatar: require("./../assets/stories/avatar.png"), //story slider item user avatar | type : image
        location: "Liden, Sweden", //story slider item location | type : string
        likes: "459", //story slider item likes | type : integer
        image: require("./../assets/stories/story.png"), //story slider item image | type : image
      },
      {
        id: 2,
        username: "Eliza Nichols",
        time: "30 min ago",
        avatar: require("./../assets/stories/avatar.png"),
        location: "Liden, Sweden",
        likes: "10K",
        image: require("./../assets/stories/story2.jpg"),
      },
      {
        id: 3,
        username: "Eliza Nichols",
        time: "45 min ago",
        avatar: require("./../assets/stories/avatar.png"),
        location: "Liden, Sweden",
        likes: "20",
        image: require("./../assets/stories/story3.jpg"),
      },
      {
        id: 4,
        username: "Eliza Nichols",
        time: "1 hour ago",
        avatar: require("./../assets/stories/avatar.png"),
        location: "Liden, Sweden",
        likes: "1.5K",
        image: require("./../assets/stories/story4.jpg"),
      },
    ],
  };
  _render_stories_slider_item = ({ item }) => {
    /**
     * _render_stories_slider_item
     * @param item story slider item
     * template :
     * - id: story slider item id | type : integer
     * - username: story slider item username | type : string
     * - time: story slider item time | type : string
     * - avatar: story slider item user avatar | type : image
     * - location: story slider item location | type : string
     * - likes: story slider item likes | type : integer
     * - image: story slider item image | type : image
     */
    return (
      <View style={styles.slide}>
        {/* story slider image */}
        <Image style={styles.slideimage} source={item.image} />
        {/* story slider data */}
        <View style={styles.slidedata}>
          {/* story slider user */}
          <View style={styles.slideuser}>
            {/* story slider user avatar*/}
            <Image source={item.avatar} style={styles.slideuseravatar} />
            <View style={styles.slideuserdata}>
              {/* story slider username*/}
              <Text style={styles.slideuserdatausername}>{item.username}</Text>
              {/* story slider time*/}
              <Text style={styles.slideuserdatatime}>{item.time}</Text>
            </View>
          </View>
          {/* story slider location*/}
          <View style={styles.slidelocation}>
            <Image
              source={require("./../assets/stories/location.png")}
              style={styles.slidelocationicon}
            />
            <Text style={styles.slidelocationtext}>{item.location}</Text>
          </View>
        </View>
        {/* story slider like*/}
        <View style={styles.slidelike}>
          {/* story slider like btn*/}
          <TouchableOpacity style={styles.slidelikebtn}>
            <Image
              source={require("./../assets/stories/likebtn.png")}
              style={styles.slidelikebtnicon}
            />
          </TouchableOpacity>
          {/* story slider likes*/}
          <Text style={styles.slideliketext}>{item.likes} Likes</Text>
        </View>
        {/* story slider pagination*/}
        <View style={styles.slidepagination}>
          {this.state.storyslider.map((item, index) => {
            return (
              <View key={index} style={styles.slidepaginationdot}>
                {index == this.state.story_slider_active_slide ? (
                  <Animated.View
                    style={[
                      styles.slidepaginationdotactive,
                      {
                        left: this.state.storysliderpagedotAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["-100%", "0%"], // animate active slider pagination dot to fill left to right
                        }),
                      },
                    ]}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  _render_stories_slider(insets) {
    /**
     * _render_stories_slider
     * render stories Carousel
     */
    return (
      <Animated.View
        style={[
          styles.storiesslider,
          {
            height: window.height - insets.bottom, // height must be less than
          },
        ]}
      >
        <Carousel
          ref={(c) => {
            this._stories_carousel = c;
          }}
          layout={"stack"}
          data={this.state.storyslider}
          renderItem={this._render_stories_slider_item}
          sliderWidth={window.width}
          itemWidth={window.width}
          onContentSizeChange={() => {
            this.story_slider_onSnapToItem(
              this.state.story_slider_active_slide
            );
          }}
          onSnapToItem={(index) => this.story_slider_onSnapToItem(index)}
          autoplay={true}
          lockScrollWhileSnapping={true}
          autoplayInterval={3000}
        />
      </Animated.View>
    );
  }
  story_slider_onSnapToItem(index) {
    const { navigation } = this.props; // navigation
    /* reset pagination dot animation value */
    this.state.storysliderpagedotAnim.setValue(0);
    /* set active slider to new slide index */
    this.setState({ story_slider_active_slide: index });
    /* start pagination dot animation */
    Animated.timing(this.state.storysliderpagedotAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // if reach end
      if (index == this.state.storyslider.length - 1) {
        console.log("end");
        navigation.navigate("Home", {
          screen: "club",
        }); // navigate to club page
      }
    });
  }
  render() {
    return (
      <ImageBackground
        source={require("./../assets/bg2.png")}
        style={styles.bg}
      >
        {/*stories slider start*/}
        <SafeAreaInsetsContext.Consumer>
          {(insets) => this._render_stories_slider(insets)}
        </SafeAreaInsetsContext.Consumer>
        <StatusBar style="light" />
        {/*stories slider end*/}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    paddingTop: 44,
    backgroundColor: "#1A1735",
  },
  storiesslider: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: "#1A1735",
  },
  slideimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  slidedata: {
    position: "absolute",
    top: 63,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  slideuser: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  slideuseravatar: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: Platform.OS == "ios" ? 24 : 48, //iso fix
    marginRight: 10,
  },
  slideuserdatausername: {
    fontSize: window.width <= 320 ? 14 : 16, // reponsive fix
    color: "#ffffff",
    fontFamily: "Gilroy-Bold",
  },
  slideuserdatatime: {
    fontSize: window.width <= 320 ? 12 : 14, // reponsive fix
    color: "#ffffff",
    fontFamily: "Gilroy-Medium",
  },
  slidelocation: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 6,
  },
  slidelocationicon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  slidelocationtext: {
    fontSize: window.width <= 320 ? 14 : 16, // reponsive fix
    color: "#ffffff",
    fontFamily: "Gilroy-Bold",
  },
  slidelike: {
    position: "absolute",
    bottom: 36,
    alignSelf: "center",
    alignItems: "center",
  },
  slidelikebtn: {
    marginBottom: 10,
  },
  slidelikebtnicon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  slideliketext: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Gilroy-Bold",
  },
  slidepagination: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  slidepaginationdot: {
    flex: 1,
    height: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 6,
    position: "relative",
    overflow: "hidden",
  },
  slidepaginationdotactive: {
    position: "absolute",
    left: "-100%",
    top: 0,
    width: "100%",
    height: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
  },
});
