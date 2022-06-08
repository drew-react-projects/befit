import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

const Challenges = React.lazy(() =>
  import(/* webpackChunkName: "page-02" */ "./pages/Challenges")
);
const Club = React.lazy(() =>
  import(/* webpackChunkName: "page-03" */ "./pages/Club")
);
const Clubmap = React.lazy(() =>
  import(/* webpackChunkName: "page-04" */ "./pages/Clubmap")
);
const Congratulation = React.lazy(() =>
  import(/* webpackChunkName: "page-05" */ "./pages/Congratulation")
);
const Cycling = React.lazy(() =>
  import(/* webpackChunkName: "page-06" */ "./pages/Cycling")
);
const Height = React.lazy(() =>
  import(/* webpackChunkName: "page-07" */ "./pages/Height")
);
const Home = React.lazy(() =>
  import(/* webpackChunkName: "page-08" */ "./pages/Home")
);
const Name = React.lazy(() =>
  import(/* webpackChunkName: "page-09" */ "./pages/Name")
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "page-10" */ "./pages/Profile")
);
const Result = React.lazy(() =>
  import(/* webpackChunkName: "page-11" */ "./pages/Result")
);
const Stories = React.lazy(() =>
  import(/* webpackChunkName: "page-12" */ "./pages/Stories")
);
const Today = React.lazy(() =>
  import(/* webpackChunkName: "page-13" */ "./pages/Today")
);
const Unboarding = React.lazy(() =>
  import(/* webpackChunkName: "page-14" */ "./pages/Unboarding")
);
const Weight = React.lazy(() =>
  import(/* webpackChunkName: "page-15" */ "./pages/Weight")
);
const Workout = React.lazy(() =>
  import(/* webpackChunkName: "page-16" */ "./pages/Workout")
);

enableScreens();

const UnboardingStack = createStackNavigator();
function Unboardingnavigator() {
  return (
    <React.Suspense fallback={<Text>Loading Unboardingnavigator ...</Text>}>
      <UnboardingStack.Navigator
        headerMode="none"
        initialRouteName="Unboarding"
      >
        <UnboardingStack.Screen name="Unboarding" component={Unboarding} />
        <UnboardingStack.Screen name="Name" component={Name} />
        <UnboardingStack.Screen name="Weight" component={Weight} />
        <UnboardingStack.Screen name="Height" component={Height} />
      </UnboardingStack.Navigator>
    </React.Suspense>
  );
}

const ClubStack = createStackNavigator();
function Clubnavigator() {
  return (
    <React.Suspense fallback={<Text>Loading Clubnavigator ...</Text>}>
      <ClubStack.Navigator headerMode="none" initialRouteName="Clubmap">
        <ClubStack.Screen name="Stories" component={Stories} />
        <ClubStack.Screen name="Clubmap" component={Clubmap} />
        <ClubStack.Screen name="Cycling" component={Cycling} />
        <ClubStack.Screen name="Congratulation" component={Congratulation} />
        <ClubStack.Screen name="Result" component={Result} />
      </ClubStack.Navigator>
    </React.Suspense>
  );
}
const Tab = createBottomTabNavigator();
function Homenavigator() {
  return (
    <React.Suspense fallback={<Text>Loading Clubnavigator ...</Text>}>
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
    </React.Suspense>
  );
}

const Stack = createStackNavigator();
export default class App extends React.Component {
  // state = {
  //   fontsLoaded: false, // is fonts loaded
  // };

  // async loadFonts() {
  //   await Font.loadAsync({
  //     "Gilroy-Light": {
  //       uri: require("./assets/font/Gilroy-Light.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-Lightitalic": {
  //       uri: require("./assets/font/Gilroy-LightItalic.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-ExtraBold": {
  //       uri: require("./assets/font/Gilroy-ExtraBold.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-Bold": {
  //       uri: require("./assets/font/Gilroy-Bold.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-SemiBold": {
  //       uri: require("./assets/font/Gilroy-SemiBold.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-Regular": {
  //       uri: require("./assets/font/Gilroy-Regular.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-Black": {
  //       uri: require("./assets/font/Gilroy-Black.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Gilroy-Medium": {
  //       uri: require("./assets/font/Gilroy-Medium.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //   });
  //   this.setState({ fontsLoaded: true });
  // }

  // componentDidMount() {
  //   this.loadFonts();
  // }

  render() {
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <React.Suspense fallback={<Text>Loading App ...</Text>}>
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
        </React.Suspense>
      </SafeAreaProvider>
    );
  }
}
