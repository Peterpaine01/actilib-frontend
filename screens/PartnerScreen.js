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
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// components
import CustomButton from "../components/CustomButton";

// Icons
import Pin from "../assets/map-pin.svg";
import CustomPin from "../components/CustomPin";

// AppStyles.js
import AppStyles from "../AppStyles";

export default function Partner({ navigation, route }) {
  const { id } = route.params;

  const [partner, setPartner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/partner/${id}`
        );
        setPartner(response.data);
        setLatitude(response.data.partner.address.latitude);
        setLongitude(response.data.partner.address.longitude);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const markers = [
    {
      id: id,
      latitude: latitude,
      longitude: longitude,
      title: partner.name,
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
      <Image
        style={styles.image}
        source={{ uri: partner.partner.image.secure_url }}
      />
      <View style={styles.container_bottom}>
        <View style={styles.section}>
          <Text style={styles.title}>{partner.partner.name}</Text>
          <FlatList
            horizontal
            data={partner.partner.activities}
            keyExtractor={(index) => index}
            renderItem={({ item }) => {
              return (
                <View style={styles.container_tag}>
                  <Text style={styles.tag}>{item}</Text>
                </View>
              );
            }}
          />
          <Text style={styles.text}>{partner.partner.description}</Text>
        </View>
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
        <View style={styles.section}>
          <Text style={styles.title}>Les activités proposées</Text>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.container_list}
          >
            {partner.activitiesToBooked.map((item) => {
              return (
                <TouchableHighlight
                  key={item._id}
                  style={styles.search_list}
                  underlayColor={AppStyles.color.background}
                  onPress={() => navigation.push("Activity", { id: item._id })}
                >
                  <View style={[styles.flex_horizontal, styles.flex_between]}>
                    <Image
                      style={styles.search_list_image}
                      source={{ uri: item.image.secure_url }}
                    />
                    <View style={styles.container_text}>
                      <Text style={styles.subtitle}>{item.name}</Text>
                      <Text style={styles.search_list_text} numberOfLines={3}>
                        {item.description}
                      </Text>
                    </View>
                    <TouchableHighlight style={styles.container_icon}>
                      <Feather name="heart" size={24} />
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
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
    },
    map: {
      width: "100%",
      height: 150,
      marginBottom: 20,
    },
    container_list: {
      width: "100%",
      marginBottom: 20,
    },
    search_list: {
      width: "100%",
      borderColor: AppStyles.color.border_subtle,
      borderBottomWidth: 1,
      padding: 15,
    },
    search_list_image: {
      width: 100,
      height: 83,
      resizeMode: "cover",
      borderRadius: 3,
    },
    search_list_text: {
      color: AppStyles.color.border_subtle,
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
    },
    container_icon: {
      width: 28,
    },
    container_text: {
      flex: 2,
      alignSelf: "flex-start",
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
    subtitle: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.bold,
      marginBottom: 5,
      fontSize: 14,
    },
    container_tag: {
      padding: 5,
      backgroundColor: AppStyles.color.background,
      borderRadius: 3,
      marginTop: 5,
      marginBottom: 15,
      marginRight: 5,
    },
    tag: {
      color: AppStyles.color.border_normal,
      fontFamily: AppStyles.font.regular,
      fontSize: 10,
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
  });

  // Retourne le style
  return styles;
};
