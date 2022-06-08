import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy, Suspense } from "react";
import { Text } from "react-native";
import { enableScreens } from "react-native-screens";

enableScreens();

const UnboardingStack = createStackNavigator();

const Height = lazy(() =>
  import(/* webpackChunkName: "andrew-page-01" */ "./pages/Height")
);
const Name = lazy(() =>
  import(/* webpackChunkName: "andrew-page-02" */ "./pages/Name")
);
const Unboarding = lazy(() =>
  import(/* webpackChunkName: "andrew-page-03" */ "./pages/Unboarding")
);
const Weight = lazy(() =>
  import(/* webpackChunkName: "andrew-page-04" */ "./pages/Weight")
);

export default function UnboardingNavigator() {
  return (
    <Suspense fallback={<Text>Loading Unboarding Navigator ...</Text>}>
      <UnboardingStack.Navigator
        headerMode="none"
        initialRouteName="Unboarding"
      >
        <UnboardingStack.Screen name="Unboarding" component={Unboarding} />
        <UnboardingStack.Screen name="Name" component={Name} />
        <UnboardingStack.Screen name="Weight" component={Weight} />
        <UnboardingStack.Screen name="Height" component={Height} />
      </UnboardingStack.Navigator>
    </Suspense>
  );
}
