import React, { ReactNode } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

// AppStyles.js
import AppStyles from "../AppStyles";

// Icons
import { Feather } from "@expo/vector-icons";

const CustomPin = ({}) => {
  const styles = useStyle();

  return (
    <Feather
      name="chevron-right"
      style={styles.icon}
      size={24}
      color={AppStyles.color.accent}
    />
  );
};

export default CustomPin;

const useStyle = () => {
  // On destructure l'objet retourné par le hook `useWindowDimensions`
  const { height, width } = useWindowDimensions();

  // On créé notre feuille de style
  const styles = StyleSheet.create({
    container: {
      borderRadius: 6,
      paddingVertical: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    container_solid: {
      backgroundColor: AppStyles.color.primary,
      borderColor: AppStyles.color.primary,
      borderWidth: 2,
    },
    container_outlined: {
      backgroundColor: "white",
      borderColor: AppStyles.color.primary,
      borderWidth: 2,
    },
    container_text: {
      backgroundColor: "none",
      borderColor: AppStyles.color.primary,
    },
    container_disabled: {
      backgroundColor: AppStyles.color.background,
      borderColor: AppStyles.color.border_subtle,
      borderWidth: 2,
    },
    text: {
      textAlign: "center",
      fontSize: 16,
      fontFamily: AppStyles.font.bold,
      fontWeight: 700,
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
