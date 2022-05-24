import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
/**
 * NavigationTab
 * reactnative navigation tabBar function
 * @returns
 */
export default function NavigationTab({ state, descriptors, navigation }) {
  /* top bar options */
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  /* hide if tabBarVisible is false */
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  /* show navigation btn ellipse */
  const [navigation_ellipse_show, set_navigation_ellipse_show] = useState(
    false
  );
  /* save navigation nav x location */
  const [navlocations, set_navlocations] = useState([0, 0, 0, 0]);
  /* set navigation avtive page */
  const [activepage, set_activepage] = useState(state.index);
  let navigationbtnactiveX = new Animated.Value(0);

  const set_nav_positions = (event, index) => {
    /* save navigation tab x positions */
    var { x } = event.nativeEvent.layout;
    let locations = navlocations;
    locations[index] = x;
    set_navlocations(locations);
    /* if is the active page move navigation btn ellipse to it location and show it */
    if (index == activepage) {
      navigationbtnactiveX.setValue(x + ((styles.navigationbtn.width/2)-4.5));
      set_navigation_ellipse_show(true);
    }
  };
  const navigation_press = (index, onPress) => {
    /* if navigationbtnactiveX return 0 set it location to the active page index xlocation */
    if (navigationbtnactiveX.__getValue() == 0)
      navigationbtnactiveX.setValue(navlocations[state.index] + ((styles.navigationbtn.width/2)-4.5));
    /* animate navigation btn ellipse */
    Animated.timing(navigationbtnactiveX, {
      toValue: navlocations[index] + ((styles.navigationbtn.width/2)-4.5),
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      /* navigate to bottom tab screen */
      onPress();
    });
  };
  return (
    <View style={styles.navigation}>
      {/*navigation bg start*/}
      <LinearGradient
        colors={["rgba(20, 18, 39, 0)", "rgba(20, 18, 39, 0.5)"]}
        style={styles.navigationdropshadow}
      ></LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          "rgba(26, 23,53, 0)",
          "rgba(90,93,135, 1)",
          "rgba(27, 23, 52, 0)",
        ]}
        locations={[0, 0.515625, 1]}
        style={styles.navigationglow}
      ></LinearGradient>
      <Animated.Image
        source={require("./../assets/icons/navigationellipse.png")}
        style={[
          styles.navigationbtnactive,
          {
            transform: [{ translateX: navigationbtnactiveX }],
          },
          navigation_ellipse_show ? { opacity: 1 } : { opacity: 0 },
        ]}
      />
      {/*navigation bg end*/}
      {/*navigation icons start*/}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        //if (options.tabBarVisible == false) return;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onLayout={(event) => set_nav_positions(event, index)}
            onPress={() => {
              navigation_press(index, onPress);
            }}
            onLongPress={onLongPress}
            style={styles.navigationbtn}
          >
            <Image source={options.icon} style={styles.navigationicon} />
          </TouchableOpacity>
        );
      })}
      {/*navigation icons end*/}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    width: "100%",
    height: 65,
    backgroundColor: "#1A1735",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navigationdropshadow: {
    position: "absolute",
    top: -40,
    right: 0,
    width: "100%",
    height: 40,
  },
  navigationglow: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: 1,
  },
  navigationbtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationicon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  navigationbtnactive: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 9,
    height: 5,
    resizeMode: "contain",
  },
});
