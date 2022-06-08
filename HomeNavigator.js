import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { lazy, Suspense } from "react";
import { Text } from "react-native";
import { enableScreens } from "react-native-screens";

enableScreens();

const HomeStack = createBottomTabNavigator();

const Challenges = lazy(() =>
  import(/* webpackChunkName: "andrew-page-10" */ "./pages/Challenges")
);
const Club = lazy(() =>
  import(/* webpackChunkName: "andrew-page-11" */ "./pages/Club")
);
const Home = lazy(() =>
  import(/* webpackChunkName: "andrew-page-12" */ "./pages/Home")
);
const Today = lazy(() =>
  import(/* webpackChunkName: "andrew-page-13" */ "./pages/Today")
);

export default function HomeNavigator() {
  return (
    <Suspense fallback={<Text>Loading Home navigator ...</Text>}>
      <HomeStack.Navigator
        initialRouteName="Home"
        headerMode="none"
        tabBar={(props) => <NavigationTab {...props} />}
        backBehavior="order"
      >
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            icon: require("./assets/icons/nav1.png"),
            tabBarVisible: false,
          }}
        />
        <HomeStack.Screen
          name="Club"
          component={Club}
          options={{ icon: require("./assets/icons/nav2.png") }}
        />
        <HomeStack.Screen
          name="Challenges"
          component={Challenges}
          options={{ icon: require("./assets/icons/nav3.png") }}
        />

        <HomeStack.Screen
          name="Today"
          component={Today}
          options={{ icon: require("./assets/icons/nav4.png") }}
        />
      </HomeStack.Navigator>
    </Suspense>
  );
}
