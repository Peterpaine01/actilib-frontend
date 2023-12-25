import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  useWindowDimensions,
} from "react-native";
import moment from "moment/min/moment-with-locales";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// components
import CustomButtonSmall from "../components/CustomButtonSmall";
import CustomButtonSmallPrimary from "../components/CustomButtonSmallPrimary";

// AppStyles.js
import AppStyles from "../AppStyles";

// Icons
import Pin from "../assets/map-pin.svg";
import CustomPin from "../components/CustomPin";

export default function ActivityScreen({ navigation, route }) {
  const { id } = route.params;

  moment.locale("fr");

  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/activity/${id}`
        );
        // console.log(response.data);
        setActivity(response.data);
        setLatitude(response.data.owner.address.latitude);
        setLongitude(response.data.owner.address.longitude);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const markers = [
    {
      id: activity._id,
      latitude: latitude,
      longitude: longitude,
      title: activity.name,
    },
  ];

  // Using 'useStyle' function which use "useWindowDimensions" hook
  const styles = useStyle();

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: activity.image.secure_url }} />
      <View style={styles.container_bottom}>
        <View style={styles.section}>
          <Text style={styles.title}>{activity.name}</Text>
          <Text style={styles.text}>{activity.description}</Text>
          <View
            style={[
              styles.flex_horizontal,
              styles.flex_between,
              styles.block_linear,
            ]}
          >
            <View>
              <Text style={styles.price}>{activity.price} crédits</Text>
            </View>
            <TouchableHighlight style={styles.container_icon}>
              <Feather name="heart" size={24} />
            </TouchableHighlight>
          </View>
          <Text style={styles.title_accent}>Prochaines dates</Text>
          <FlatList
            horizontal
            contentContainerStyle={styles.container_booking}
            showsHorizontalScrollIndicator={false}
            data={activity.date}
            keyExtractor={(index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  underlayColor="white"
                  style={styles.container_date}
                >
                  <View>
                    <View style={styles.date_top}>
                      <Text style={styles.text_date}>
                        {moment(item).format("ddd DD MMM")}
                      </Text>
                      <Text style={styles.text_hour}>
                        {moment(item).format("hh:mm")}
                      </Text>
                    </View>
                    <CustomButtonSmall
                      style="full_width"
                      feather
                      end_icon="chevron-right"
                      text="Réserver"
                      type="solid"
                    />
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </View>
        <View style={styles.container_tag}>
          <Text style={styles.tag}>LIEU </Text>
        </View>
        <View style={[styles.container_place]}>
          <Text style={styles.title}>{activity.owner.name}</Text>
          <Text style={styles.text}>{activity.owner.description}</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.container_map}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 48.856614,
                  longitude: 2.3522219,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}
                // showsUserLocation={true}
              >
                {markers.map((marker) => {
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                      }}
                      title={marker.title}
                      image={require("../assets/map-pin.png")}
                    ></Marker>
                  );
                })}
              </MapView>
            </View>
          )}
          <CustomButtonSmallPrimary
            style="full_width"
            feather
            end_icon="chevron-right"
            text="Toutes les activités"
            type="outlined"
            onPress={() =>
              navigation.navigate("Partner", { id: activity.owner._id })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const useStyle = () => {
  // using hook "useWindowDimensions"
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      alignItems: "flext-start",
      justifyContent: "flext-start",
    },
    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
    },
    container_bottom: {
      alignItems: "flext-start",
      justifyContent: "flext-start",
      padding: 15,
      width: "100%",
    },
    section: {
      marginTop: 5,
      marginBottom: 10,
      width: "100%",
    },
    container_map: {
      width: "100%",
      // borderColor: "red",
      // borderWidth: 2,
    },
    map: {
      width: "100%",
      height: 150,
      marginBottom: 15,
    },
    map_icon: {
      width: 32,
      height: 36,
    },
    title: {
      color: AppStyles.color.primary,
      fontFamily: AppStyles.font.bold,
      marginBottom: 5,
      fontSize: 18,
    },
    title_accent: {
      color: AppStyles.color.accent,
      fontFamily: AppStyles.font.bold,
      marginBottom: 15,
      fontSize: 14,
    },
    container_booking: {
      gap: 5,
      marginBottom: 20,
      justifyContent: "space-between",
    },
    container_date: {
      borderColor: AppStyles.color.accent,
      borderWidth: 2,
      padding: 10,
      borderRadius: 6,
      width: width / 2 - 40,
    },
    subtitle: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.bold,
      marginBottom: 5,
      fontSize: 14,
    },
    text: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
      marginBottom: 20,
    },
    flex_horizontal: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    flex_between: {
      justifyContent: "space-between",
    },
    block_linear: {
      padding: 10,
      borderColor: AppStyles.color.border_subtle,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      marginBottom: 20,
    },
    container_tag: {
      padding: 5,
      backgroundColor: AppStyles.color.background,
      width: "100%",
      margin: 0,
      borderColor: AppStyles.color.border_subtle,
      borderWidth: 1,
      borderBottomWidth: 0,
    },
    tag: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
    },
    container_place: {
      margin: 0,
      borderColor: AppStyles.color.border_subtle,
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      width: "100%",
    },
    text_date: {
      color: AppStyles.color.border_normal,
      textTransform: "uppercase",
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
    },
    text_hour: {
      color: AppStyles.color.border_normal,
      textTransform: "uppercase",
      fontFamily: AppStyles.font.bold,
      fontSize: 24,
    },
    date_top: {
      alignItems: "center",
      marginBottom: 10,
    },
    price: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.bold,
      fontSize: 14,
    },
  });
  // Retourne le style
  return styles;
};
