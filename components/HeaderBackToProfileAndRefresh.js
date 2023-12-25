import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// AppStyles.js
import AppStyles from "../AppStyles";

const HeaderBackToProfileAndRefresh = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.push("Profile");
      }}
    >
      <Feather name="arrow-left" size={22} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderBackToProfileAndRefresh;

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
