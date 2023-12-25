import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppStyles from "../AppStyles.js";

export default function PastEventScreen() {
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/booking?date=past`
        );
        // console.log(response.data);
        setBooking(response.data);
        setIsLoading(false);
        // console.log(booking);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const styles = useStyle();

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={booking}
        style={styles.container_booking}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // console.log("booking1>>>>", item);
          return (
            <TouchableHighlight style={styles.booking_div}>
              <View style={styles.flex_horizontal}>
                <Image
                  style={styles.booking_image}
                  source={{ uri: item.image.secure_url }}
                />
                <View style={styles.container_text}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.nameOfActivity}
                  </Text>
                  <Text style={styles.text}>{item.address[0].city}</Text>
                  <Text style={styles.text}>
                    {moment(item.date).format("ddd DD MMM YYYY")}
                  </Text>
                  <Text style={styles.text}>
                    {moment(item.date).format("hh:mm")}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    </View>
  );
}

const useStyle = () => {
  // utilisation du hook "useWindowDimensions"
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      alignItems: "flext-start",
      justifyContent: "flext-start",
      backgroundColor: "white",
      padding: 15,
    },
    container_booking: {
      // borderColor: "black",
      // borderWidth: 3,
      width: "100%",
    },
    flex_horizontal: {
      flexDirection: "row",
      width: "100%",
      gap: 10,
      alignItems: "center",
    },
    booking_div: {
      width: "100%",
      borderColor: AppStyles.color.border_subtle,
      borderBottomWidth: 1,
      padding: 15,
    },
    booking_image: {
      width: 100,
      height: 83,
      resizeMode: "cover",
      borderRadius: 3,
    },
    container_text: {
      flex: 2,
      alignSelf: "flex-start",
      border: 3,
      gap: 10,
      justifyContent: "space-between",
    },
    text: {
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
      color: AppStyles.color.text_subtle,
    },
    title: {
      fontFamily: AppStyles.font.regular,
      fontSize: 16,
    },
  });

  // Retourne le style
  return styles;
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nav: {
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "center",
//   },
// });
