import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// components
import CustomInputSearch from "../components/CustomInputSearch";
import CustomButton from "../components/CustomButton";
import CustomButtonSearch from "../components/CustomButtonSearch";

// AppStyles.js
import AppStyles from "../AppStyles";

export default function SearchScreen() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();

  // config for calendar package
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
  const today = new Date();

  const handleDates = (clickedDate) => {
    // if clicked date is already date1 or date 2 delete either date 1 or date 2
    if (clickedDate === date1) {
      setDate1(null);
    } else if (clickedDate === date2) {
      setDate2(null);
    } else if (!date1) {
      // if date1 is null set clicked date as date 1
      setDate1(clickedDate);
    } else if (date1) {
      // if date1 exists and date2 is null or exists, set clicked date as date 2
      setDate2(clickedDate);
    }
  };

  // update StartDate and EndDate each time date1 or date2 changes
  useEffect(() => {
    if (date1 && date2) {
      const formatDate1 = new Date(date1);
      const formatDate2 = new Date(date2);
      if (formatDate1 < formatDate2) {
        setStartDate(date1);
        setEndDate(date2);
      } else {
        setStartDate(date2);
        setEndDate(date1);
      }
    } else if (date1 || date2) {
      if (date1) {
        setStartDate(date1);
      }
      if (date2) {
        setStartDate(date2);
      }
      setEndDate("");
    } else {
      setStartDate("");
      setEndDate("");
    }
  }, [date1, date2]);

  // console.log("date1 ==>", date1, "   date2==>", date2);
  // console.log("StartDate ==>", startDate, "   EndDate==>", endDate);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={15}
    >
      <View>
        <CustomInputSearch
          placeholder="Lieu, atelier, adresse"
          multiline={false}
          lines={1}
          type="input"
          style="full_width"
          feather_start
          start_icon="map-pin"
          feather_end
          end_icon="sliders"
          value={address}
          setValue={setAddress}
        />
        <CustomInputSearch
          placeholder="Activités, thèmes"
          multiline={false}
          lines={1}
          type="input"
          style="full_width"
          feather_start
          start_icon="crosshair"
          feather_end
          end_icon="sliders"
          value={name}
          setValue={setName}
        />
        {/* <CustomInputSearch
          placeholder="Dates, créneaux"
          multiline={false}
          lines={1}
          type="input"
          style="full_width"
          feather_start
          start_icon="calendar"
          feather_end
          end_icon="sliders"
        /> */}
        <CustomButtonSearch
          text="Dates, créneaux"
          feather_start
          start_icon="calendar"
          feather_end
          end_icon="sliders"
          onPress={() => {
            setDisplayCalendar(!displayCalendar);
            setDate1(null);
            setDate2(null);
            setStartDate("");
            setEndDate("");
          }}
        />
      </View>

      {displayCalendar ? (
        <CalendarList
          horizontal={true}
          onDayPress={(day) => {
            handleDates(day.dateString);

            // setDate1(day.dateString);
          }}
          current={today}
          markedDates={{
            [date1]: {
              selected: true,
              // disableTouchEvent: true,
            },
            [date2]: {
              selected: true,
              // disableTouchEvent: true,
            },
          }}
          theme={{
            selectedDayBackgroundColor: AppStyles.color.primary,
            todayTextColor: AppStyles.color.primary,
            arrowColor: AppStyles.color.accent,
          }}
        />
      ) : null}

      <CustomButton
        style="full_width"
        feather
        end_icon="chevron-right"
        text="Rechercher"
        type="solid"
        onPress={() =>
          // navigation.navigate("List", {
          //   searchName: name,
          //   searchStartDate: startDate,
          //   searchEndDate: endDate,
          //   searchAddress: address,
          // })
          // navigation.push("Explorer", {
          //   screen: "List",
          //   params: {
          //     searchName: name,
          //     searchStartDate: startDate,
          //     searchEndDate: endDate,
          //     searchAddress: address,
          //   },
          // })
          navigation.push("Tab", {
            // Ecran racine
            screen: "TabExplorer", // Ecran de niveau 2
            params: {
              screen: "Explorer", // Ecran que tu veux atteindre
              params: {
                screen: "List", // Ecran que tu veux atteindre
                params: {
                  searchName: name,
                  searchStartDate: startDate,
                  searchEndDate: endDate,
                  searchAddress: address,
                },
              },
            },
          })
        }
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    padding: 15,
    width: "100%",
  },
});
