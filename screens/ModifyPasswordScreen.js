import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRef } from "react";
import LottieView from "lottie-react-native";
import AppStyles from "../AppStyles";

export default function ModifyPasswordScreen() {
  const animation = useRef(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page en construction</Text>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
        source={require("../assets/animation/wip.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",

    position: "relative",
  },
  title: {
    position: "absolute",
    top: 20,
    fontWeight: "bold",
    zIndex: 1,
    color: AppStyles.color.accent,
  },
});
