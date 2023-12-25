import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { LocaleConfig, CalendarList, Calendar } from "react-native-calendars";
import AppStyles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function CalendarScreen() {
  const animation = useRef(null);

  const [selected, setSelected] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "fr";
  const date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/booking?date=${selected}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        // console.log("EFFECT>>>>>", response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [selected]);

  // console.log("COUCOU", selected);
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

      {/* WORK IN PROGRESS */}
      {/* <View style={styles.nav}>
        <Text>Calendrier</Text>
        <Calendar
          style={styles.calendar}
          pastScrollRange={240}
          horizontal
          onDayPress={(day) => {
            // console.log(" COUCOU>>>>>>>", day);
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected || date]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          theme={{
            selectedDayBackgroundColor: AppStyles.color.primary,
            todayTextColor: AppStyles.color.primary,
            arrowColor: AppStyles.color.accent,
          }}
        />
      </View>

      <Text>This is the CalendarScreen component</Text> */}
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
