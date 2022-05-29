import React from "react";
import { Text } from "react-native";

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <Text>Loader timed out!</Text>;
    } else if (props.pastDelay) {
      return <Text>Loading...</Text>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <Text>Error! Component failed to load</Text>;
  } else {
    return null;
  }
}
