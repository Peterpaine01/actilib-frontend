import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

// AppStyles.js
import AppStyles from "../AppStyles";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  multiline,
  lines,
  type,
  secureTextEntry,
  start_icon,
  end_icon,
  materialIcons_start,
  feather_start,
  ionicons_start,
  materialIcons_end,
  feather_end,
  ionicons_end,
  style,
}) => {
  const styles = useStyle();
  // console.log(value);
  return (
    <View
      style={[styles.container, styles[`container_${type}`], styles[style]]}
    >
      {start_icon && (
        <View style={[styles.container_icon]}>
          {materialIcons_start && start_icon && (
            <MaterialIcons
              style={[
                styles.text,
                styles[`text_${type}`],
                styles.materialIcons,
              ]}
              name={start_icon}
            />
          )}
          {feather_start && start_icon && (
            <Feather
              style={[styles[`text_${type}`], styles.feather]}
              name={start_icon}
            />
          )}
          {ionicons_start && start_icon && (
            <Ionicons
              style={[styles[`text_${type}`], styles.ionicons]}
              name={start_icon}
            />
          )}
        </View>
      )}

      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        fontStyle={!value || value.length === 0 ? "italic" : "normal"}
        style={styles.input}
        multiline={multiline}
        numberOfLines={lines}
      />
      {end_icon && (
        <View style={[styles.container_icon, styles.container_icon_end]}>
          {materialIcons_end && end_icon && (
            <MaterialIcons
              style={[
                styles.text,
                styles[`text_${type}`],
                styles.materialIcons,
              ]}
              name={end_icon}
            />
          )}
          {feather_end && end_icon && (
            <Feather
              style={[styles[`text_${type}`], styles.feather]}
              name={end_icon}
            />
          )}
          {ionicons_end && end_icon && (
            <Ionicons
              style={[styles[`text_${type}`], styles.ionicons]}
              name={end_icon}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const useStyle = () => {
  // On destructure l'objet retourné par le hook `useWindowDimensions`
  const { height, width } = useWindowDimensions();

  // On créé notre feuille de style
  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      paddingVertical: 15,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: AppStyles.color.border_normal,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 5,
    },
    container_textarea: {
      padding: 10,
      minHeight: 100,
    },
    input: {
      flex: 2,
    },
    container_input: {},
    container_icon: {
      width: 30,
      height: 30,

      alignItems: "center",
      justifyContent: "center",
    },
    container_icon_end: {
      // alignSelf: "flex-end",
    },
    container_text: {
      backgroundColor: "none",
      borderColor: AppStyles.color.primary,
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: AppStyles.font.regular,
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
    feather: {
      fontSize: 20,
    },
    materialIcons: {
      fontSize: 28,
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
    },
  });

  // On retourne l'objet contenant tout notre style pour l'utiliser dans notre composant
  return styles;
};
