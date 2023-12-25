import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo_actilib_white.svg";
import { MaterialIcons } from "@expo/vector-icons";

// components
import CustomButton from "../components/CustomButton";

export default function LandingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container_logo}>
        <Text style={styles.txt}>Bienvenue sur</Text>
        <Logo style={styles.logo} />
      </View>

      <View style={styles.btnContainer}>
        <CustomButton
          style="full_width"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          feather
          end_icon="chevron-right"
          text="CONNEXION"
          type="outlined"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.primary,
    paddingTop: 200,

    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  container_logo: {
    // borderColor: "red",
    // borderWidth: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "white",
    fontSize: 26,
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
    resizeMode: "contain",
    height: 100,

    // objectFit: "cover",
    // marginBottom: 250,
  },
  btnContainer: {
    marginBottom: 130,
    width: "100%",
  },
});
