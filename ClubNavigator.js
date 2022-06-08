import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy, Suspense } from "react";
import { Text } from "react-native";
import { enableScreens } from "react-native-screens";

enableScreens();

const ClubStack = createStackNavigator();

const Clubmap = lazy(() =>
  import(/* webpackChunkName: "andrew-page-05" */ "./pages/Clubmap")
);
const Congratulation = lazy(() =>
  import(/* webpackChunkName: "andrew-page-06" */ "./pages/Congratulation")
);
const Cycling = lazy(() =>
  import(/* webpackChunkName: "andrew-page-07" */ "./pages/Cycling")
);
const Resault = lazy(() =>
  import(/* webpackChunkName: "andrew-page-08" */ "./pages/Resault")
);
const Stories = lazy(() =>
  import(/* webpackChunkName: "andrew-page-09" */ "./pages/Stories")
);

export default function ClubNavigator() {
  return (
    <Suspense fallback={<Text>Loading Club navigator ...</Text>}>
      <ClubStack.Navigator headerMode="none" initialRouteName="Clubmap">
        <ClubStack.Screen name="Stories" component={Stories} />
        <ClubStack.Screen name="Clubmap" component={Clubmap} />
        <ClubStack.Screen name="Cycling" component={Cycling} />
        <ClubStack.Screen name="Congratulation" component={Congratulation} />
        <ClubStack.Screen name="Resault" component={Resault} />
      </ClubStack.Navigator>
    </Suspense>
  );
}
