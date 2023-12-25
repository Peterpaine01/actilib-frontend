import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

// AppStyles.js
import AppStyles from "../AppStyles";

const HeaderBackToHome = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Home");
      }}
    >
      <Feather name="arrow-left" size={22} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderBackToHome;

const styles = StyleSheet.create({
  container: {
    borderRadius: 1000,
    backgroundColor: AppStyles.color.accent,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
