import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

// Icons
import { Feather } from "@expo/vector-icons";
import Pin from "../assets/map-pin.svg";
import CustomPin from "../components/CustomPin";

// AppStyles.js
import AppStyles from "../AppStyles";

export default function MapScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCoords, setUserCoords] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
  });

  const [partnersList, setPartnersList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const askPermissionAndGetCoords = async () => {
      // Ask permission to access user's coords
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        //  --> User has authorized access to his/her coords
        // console.log("authorized coords");

        // -- Fetch user's coords
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords);

        setUserCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        try {
          // Fetch partners closer to the user
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/partners?latitude=${coords.latitude}&longitude=${coords.longitude}`
          );

          // console.log("partners >>", data.partners);

          setPartnersList(data.partners);
        } catch (error) {
          console.log("catch>>", error);
        }
      } else {
        //  --> User has not authorized access to his/her coords
        // console.log("no authorization coords");

        // Fetch all partners
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/partners?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
        );
        // console.log("partners >>>", data.partners);

        setPartnersList(data.partners);
      }

      setIsLoading(false);
    };

    askPermissionAndGetCoords();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        // showsUserLocation
      >
        {partnersList.map((partner) => {
          return (
            <Marker
              style={styles.marker}
              key={partner._id}
              calloutAnchor={{ x: 0, y: 0 }}
              calloutOffset={{ x: 0, y: 0 }}
              coordinate={{
                latitude: partner.address.latitude,
                longitude: partner.address.longitude,
              }}
              image={require("../assets/map-pin.png")}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("Partner", { id: partner._id });
                }}
                tooltip
              >
                <View style={styles.bubble}>
                  <Image
                    style={styles.image}
                    source={{ uri: partner.image.secure_url }}
                  />
                  <View style={styles.container_text}>
                    <Text style={styles.title}>{partner.name}</Text>
                    <Text numberOfLines={3} style={styles.text}>
                      {partner.description}
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    style={styles.icon}
                    size={24}
                    color={AppStyles.color.accent}
                  />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "blue",
    // borderWidth: 2,
  },
  map: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 2,
  },
  map_icon: {
    width: 32,
    height: 36,
  },

  bubble: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justfifyContent: "space-between",
    borderRadius: 6,
    backgroundColor: "white",
    width: 250,
    padding: 5,
    marginBottom: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  container_text: {
    // borderColor: "red",
    // borderWidth: 1,
    flex: 2,
    alignSelf: "flex-start",
  },
  image: {
    // borderColor: "orange",
    // borderWidth: 1,
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 12,
  },
  text: {
    fontSize: 10,
    color: AppStyles.color.border_subtle,
  },
  icon: {
    width: 24,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  container_tag: {
    flexDirection: "row",
    gap: 5,
  },
  marker: {
    width: 24,
  },
});
