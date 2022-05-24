import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Home from "./pages/Home";
import Club from "./pages/Club";
import Stories from "./pages/Stories";
import Clubmap from "./pages/Clubmap";
import Cycling from "./pages/Cycling";
import Congratulation from "./pages/Congratulation";
import Resault from "./pages/Resault";
import Unboarding from "./pages/Unboarding";
import Weight from "./pages/Weight";
import Height from "./pages/Height";
import Name from "./pages/Name";
import Challenges from "./pages/Challenges";
import Today from "./pages/Today";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import NavigationTab from "./components/NavigationTab";
/**
 * app.js
 * ? how can I find a page from Figma ? in the page list below I indicated the page names related to each screen
 * page lists :
 * - <Home/> : home page / figma page names : Home,Side Menu
 * - <Club/> : club page / figma page names : Club
 * - <Stories/> : stories page / figma page names : Stories
 * - <Clubmap/> : clubmap page / figma page names : Club Map (3 pages),
 * - <Cycling/> : cycling page / figma page names : Start Cycling,While Cycling,Stop Cycling (2 pages)
 * - <Congratulation/> : congratulation page / figma page names : congratulations
 * - <Resault/> : Resault page / figma page names : Finished Cycling
 * - <Unboarding/> : Unboarding page / figma page names : Onboarding 01,Onboarding 02,Onboarding 03,Onboarding 04,Onboarding 05
 * - <Weight/> : Weight page / figma page names : Weight
 * - <Height/> : Height page / figma page names : Height
 * - <Name/> : Name page / figma page names : Name,Name - Active,Birthday,Birthday - Active
 * - <Challenges/> : Challenges page / figma page names : Challenges
 * - <Today/> : Today page / figma page names : Today
 * - <Workout/> : Workout page / figma page names : Workout(2 pages)
 * - <Profile/> : Profile page / figma page names : My Profile,Profile - Others,Profile - Others - Stories
 */
/* active screens for better performance in production */
enableScreens();
const UnboardingStack = createStackNavigator();
/**
 * Unboardingnavigator
 * Unboarding stack Navigator
 * include :
 * - <Unboarding/> : Unboarding page / figma page names : Onboarding 01,Onboarding 02,Onboarding 03,Onboarding 04,Onboarding 05
 * - <Name/> : Name page / figma page names : Name,Name - Active,Birthday,Birthday - Active
 * - <Weight/> : Weight page / figma page names : Weight
 * - <Height/> : Height page / figma page names : Height
 */
function Unboardingnavigator() {
  return (
    <UnboardingStack.Navigator headerMode="none" initialRouteName="Unboarding">
      <UnboardingStack.Screen name="Unboarding" component={Unboarding} />
      <UnboardingStack.Screen name="Name" component={Name} />
      <UnboardingStack.Screen name="Weight" component={Weight} />
      <UnboardingStack.Screen name="Height" component={Height} />
    </UnboardingStack.Navigator>
  );
}
const ClubStack = createStackNavigator();
/**
 * Clubnavigator
 * Club stack Navigator
 * include :
 * - <Club/> : club page / figma page names : Club,Stories
 * - <Stories/> : stories page / figma page names : Stories
 * - <Clubmap/> : clubmap page / figma page names : Club Map (3 pages),
 * - <Cycling/> : cycling page / figma page names : Start Cycling,While Cycling,Stop Cycling (2 pages)
 * - <Congratulation/> : congratulation page / figma page names : congratulations
 * - <Resault/> : Resault page / figma page names : Finished Cycling
 */
function Clubnavigator() {
  return (
    <ClubStack.Navigator headerMode="none" initialRouteName="Clubmap">
      <ClubStack.Screen name="Stories" component={Stories} />
      <ClubStack.Screen name="Clubmap" component={Clubmap} />
      <ClubStack.Screen name="Cycling" component={Cycling} />
      <ClubStack.Screen name="Congratulation" component={Congratulation} />
      <ClubStack.Screen name="Resault" component={Resault} />
    </ClubStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
/**
 * Homenavigator
 * Home Tab Navigator
 * include :
 * - <Home/> : home page / figma page names : Home,Side Menu
 * - <Club/> : club page / figma page names : Club,Stories
 * - <Challenges/> : Challenges page / figma page names : Challenges
 * - <Today/> : Today page / figma page names : Today
 */
function Homenavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBar={(props) => <NavigationTab {...props} />}
      backBehavior="order"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          icon: require("./assets/icons/nav1.png"),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Club"
        component={Club}
        options={{ icon: require("./assets/icons/nav2.png") }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{ icon: require("./assets/icons/nav3.png") }}
      />

      <Tab.Screen
        name="Today"
        component={Today}
        options={{ icon: require("./assets/icons/nav4.png") }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
export default class App extends React.Component {
  state = {
    fontsLoaded: false, // is fonts loaded
  };
  /**
   * Font list
   * - "Gilroy-Light"
   * - "Gilroy-Lightitalic"
   * - "Gilroy-ExtraBold"
   * - "Gilroy-Bold"
   * - "Gilroy-SemiBold"
   * - "Gilroy-Regular"
   * - "Gilroy-Black"
   * - "Gilroy-Medium"
   */
  /* async load fonts after they are loaded set "fontsLoaded" state true */
  async loadFonts() {
    await Font.loadAsync({
      "Gilroy-Light": {
        uri: require("./assets/font/Gilroy-Light.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-Lightitalic": {
        uri: require("./assets/font/Gilroy-LightItalic.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-ExtraBold": {
        uri: require("./assets/font/Gilroy-ExtraBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-Bold": {
        uri: require("./assets/font/Gilroy-Bold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-SemiBold": {
        uri: require("./assets/font/Gilroy-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-Regular": {
        uri: require("./assets/font/Gilroy-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-Black": {
        uri: require("./assets/font/Gilroy-Black.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Gilroy-Medium": {
        uri: require("./assets/font/Gilroy-Medium.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    /**
     * if fonts are loaded show the page
     * if not show react-native app loading until they are all loaded
     */
    if (this.state.fontsLoaded) {
      /**
       * Main Navigator
       * include :
       * - Unboardingnavigator() : Club stack Navigator
       * - Homenavigator() : Home Tab Navigator
       * - Clubnavigator() : Club stack Navigator
       * - <Workout/> : Workout page / figma page names : Workout(2 pages)
       * - <Profile/> : Profile page / figma page names : My Profile,Profile - Others,Profile - Others - Stories
       */
      return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer theme={{ colors: { background: "#1A1735" } }}>
            <Stack.Navigator initialRouteName="Unboardingnav" headerMode="none">
              <Stack.Screen
                name="Unboardingnav"
                component={Unboardingnavigator}
              />
              <Stack.Screen name="Home" component={Homenavigator} />
              <Stack.Screen name="Clubnav" component={Clubnavigator} />
              <Stack.Screen name="Workout" component={Workout} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      );
    } else {
      return <AppLoading />;
    }
  }
}
