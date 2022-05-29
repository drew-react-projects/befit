import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import React from "react";
import { Text } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import Loading from "./Loading";
import Loadable from "react-loadable";

// const AppLoading = React.lazy(() => import("expo-app-loading"));
// const Challenges = React.lazy(() => import("./pages/Challenges"));
// const Club = React.lazy(() => import("./pages/Club"));
// const Clubmap = React.lazy(() => import("./pages/Clubmap"));
// const Congratulation = React.lazy(() => import("./pages/Congratulation"));
// const Cycling = React.lazy(() => import("./pages/Cycling"));
// const Height = React.lazy(() => import("./pages/Height"));
// const Home = React.lazy(() => import("./pages/Home"));
// const Name = React.lazy(() => import("./pages/Name"));
// const Profile = React.lazy(() => import("./pages/Profile"));
// const Resault = React.lazy(() => import("./pages/Resault"));
// const Stories = React.lazy(() => import("./pages/Stories"));
// const Today = React.lazy(() => import("./pages/Today"));
// const Unboarding = React.lazy(() => import("./pages/Unboarding"));
// const Weight = React.lazy(() => import("./pages/Weight"));
// const Workout = React.lazy(() => import("./pages/Workout"));

const AppLoading = Loadable({
  loader: () => import("expo-app-loading"),
  loading: Loading,
});

const Challenges = Loadable({
  loader: () => import("./pages/Challenges"),
  loading: Loading,
});

const Club = Loadable({
  loader: () => import("./pages/Club"),
  loading: Loading,
});
const Clubmap = Loadable({
  loader: () => import("./pages/Clubmap"),
  loading: Loading,
});
const Congratulation = Loadable({
  loader: () => import("./pages/Congratulation"),
  loading: Loading,
});
const Cycling = Loadable({
  loader: () => import("./pages/Cycling"),
  loading: Loading,
});
const Height = Loadable({
  loader: () => import("./pages/Height"),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import("./pages/Home"),
  loading: Loading,
});
const Name = Loadable({
  loader: () => import("./pages/Name"),
  loading: Loading,
});
const Profile = Loadable({
  loader: () => import("./pages/Profile"),
  loading: Loading,
});
const Resault = Loadable({
  loader: () => import("./pages/Resault"),
  loading: Loading,
});
const Stories = Loadable({
  loader: () => import("./pages/Stories"),
  loading: Loading,
});
const Today = Loadable({
  loader: () => import("./pages/Today"),
  loading: Loading,
});
const Unboarding = Loadable({
  loader: () => import("./pages/Unboarding"),
  loading: Loading,
});
const Weight = Loadable({
  loader: () => import("./pages/Weight"),
  loading: Loading,
});
const Workout = Loadable({
  loader: () => import("./pages/Workout"),
  loading: Loading,
});

enableScreens();

const UnboardingStack = createStackNavigator();
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
    if (this.state.fontsLoaded) {
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
      return (
        <React.Suspense fallback={<Text>Loading AppLoading ...</Text>}>
          <AppLoading />
        </React.Suspense>
      );
    }
  }
}
