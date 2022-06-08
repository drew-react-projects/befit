import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy, Suspense } from "react";
import { Text } from "react-native";
import { enableScreens } from "react-native-screens";
import ClubNavigator from "./ClubNavigator";
import HomeNavigator from "./HomeNavigator";

enableScreens();

const AppStack = createStackNavigator();

const Profile = lazy(() =>
  import(/* webpackChunkName: "andrew-page-14" */ "./pages/Profile")
);
const Workout = lazy(() =>
  import(/* webpackChunkName: "andrew-page-15" */ "./pages/Workout")
);

const UnboardingNavigator = lazy(() =>
  import(/* webpackChunkName: "andrew-page-16" */ "./UnboardingNavigator")
);

// const HomeNavigator = lazy(() =>
//   import(/* webpackChunkName: "andrew-page-17" */ "./HomeNavigator")
// );

// const ClubNavigator = lazy(() =>
//   import(/* webpackChunkName: "andrew-page-18" */ "./ClubNavigator")
// );

export default function AppNavigator() {
  return (
    <Suspense fallback={<Text>Loading App navigator...</Text>}>
      <NavigationContainer theme={{ colors: { background: "#1A1735" } }}>
        <AppStack.Navigator initialRouteName="Unboardingnav" headerMode="none">
          <AppStack.Screen
            name="Unboardingnav"
            component={UnboardingNavigator}
          />
          <AppStack.Screen name="Home" component={HomeNavigator} />
          <AppStack.Screen name="Clubnav" component={ClubNavigator} />
          <AppStack.Screen name="Workout" component={Workout} />
          <AppStack.Screen name="Profile" component={Profile} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}
