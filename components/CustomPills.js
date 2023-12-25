import React from "react";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";

// AppStyles.js
import AppStyles from "../AppStyles";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CustomPills = ({
  onPress,
  text,
  type,
  start_icon,
  end_icon,
  materialIcons,
  feather,
  ionicons,
  style,
}) => {
  const styles = useStyle();

  // Handle Underlay
  let underlayColor = "";
  if (type === "textlight" || type === "textdark") {
    underlayColor = "#EEEEEE20";
  }
  if (type === "text") {
    underlayColor = "#EEEEEE20";
  }
  if (type === "outlined") {
    underlayColor = "#ffffff80";
  }
  if (type === "solid") {
    underlayColor = "#0A847E80";
  }

  // console.log(type);
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, styles[`container_${type}`], styles[style]]}
    >
      <View style={styles.flex_horizontal}>
        {materialIcons && start_icon && (
          <MaterialIcons
            style={[styles.text, styles[`text_${type}`], styles.materialIcons]}
            name={start_icon}
          />
        )}
        {feather && start_icon && (
          <Feather
            style={[styles[`text_${type}`], styles.feather]}
            name={start_icon}
          />
        )}
        {ionicons && start_icon && (
          <Ionicons
            style={[styles[`text_${type}`], styles.ionicons]}
            name={start_icon}
          />
        )}
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        {materialIcons && end_icon && (
          <MaterialIcons
            style={[styles.text, styles[`text_${type}`], styles.materialIcons]}
            name={end_icon}
          />
        )}
        {feather && end_icon && (
          <Feather
            style={[styles[`text_${type}`], styles.feather]}
            name={end_icon}
          />
        )}
        {ionicons && (
          <Ionicons
            style={[styles[`text_${type}`], styles.ionicons]}
            name={end_icon}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

export default CustomPills;

const useStyle = () => {
  // On destructure l'objet retourné par le hook `useWindowDimensions`
  const { height, width } = useWindowDimensions();

  // On créé notre feuille de style
  const styles = StyleSheet.create({
    container: {
      borderRadius: 1000,
      paddingVertical: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    container_solid: {
      backgroundColor: AppStyles.color.primary,
      borderColor: AppStyles.color.primary,
      borderWidth: 2,
      borderRadius: 1000,
    },
    container_outlined: {
      backgroundColor: "white",
      borderColor: AppStyles.color.primary,
      borderWidth: 2,
    },
    container_disabled: {
      backgroundColor: AppStyles.color.background,
      borderColor: AppStyles.color.border_subtle,
      borderWidth: 2,
    },
    container_text: {
      backgroundColor: "none",
      borderColor: AppStyles.color.primary,
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: AppStyles.font.regular,
      marginBottom: 3,
    },
    text_solid: {
      color: "white",
    },
    text_outlined: {
      color: AppStyles.color.primary,
    },
    text_text: {
      color: AppStyles.color.primary,
    },
    text_textlight: {
      color: "white",
    },
    text_textdark: {
      color: AppStyles.color.text_normal,
    },
    text_disabled: {
      color: AppStyles.color.border_subtle,
    },
    feather: {
      fontSize: 20,
    },
    materialIcons: {
      fontSize: 24,
    },
    ionicons: {
      fontSize: 20,
    },
    flex_horizontal: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    full_width: {
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
    },
  });

  // On retourne l'objet contenant tout notre style pour l'utiliser dans notre composant
  return styles;
};
