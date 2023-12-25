import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AppStyles.js
import AppStyles from "../AppStyles";

// components
import CustomButtonSearch from "../components/CustomButtonSearch";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [trending, setTrending] = useState([]);

  //Activities chosen to be featured in the highlights and trending sections
  const chosenHighlights = [
    "656ee5f1488bf54ee853d24e",
    "656ee68b488bf54ee853d256",
    "656ee8ae488bf54ee853d279",
    "656eeb30488bf54ee853d28b",
  ];
  const chosenTrending = [
    "656ee64a488bf54ee853d254",
    "656ee79f488bf54ee853d26f",
    "656ee8f7488bf54ee853d27b",
    "656eeb74488bf54ee853d28d",
  ];

  const fetchActivities = async (activityId) => {
    try {
      const activityDetails = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/activity/${activityId}`
      );
      return activityDetails.data;
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavoritesData = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId");
          const favoritesData = await axios.get(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/favorites/${userId}`
          );
          // console.log(JSON.stringify(favoritesData.data, null, 2));
          setFavorites(favoritesData.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchHighlightsData = async () => {
        try {
          const activities = await Promise.all(
            chosenHighlights.map((activityId) => fetchActivities(activityId))
          );
          setHighlights(activities);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchTrendingData = async () => {
        try {
          const activities = await Promise.all(
            chosenTrending.map((activityId) => fetchActivities(activityId))
          );
          setTrending(activities);
        } catch (error) {
          console.log(error);
        }
      };

      fetchHighlightsData();
      fetchTrendingData();
      fetchFavoritesData();
      setIsLoading(false);
    }, [])
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomButtonSearch
        text="Cours, activité, atelier"
        style="full_width"
        feather_start
        start_icon="search"
        feather_end
        end_icon="sliders"
        onPress={() => {
          // navigation.navigate("Search");
          navigation.navigate("Search");
        }}
      />
      {favorites.length > 0 && (
        <View style={styles.categoryRow}>
          <View style={styles.categoryTitle}>
            <Feather name={"heart"} style={styles.picto} />
            <Text style={styles.categoryTitle_Text}>Favoris</Text>
          </View>
          <View style={styles.horizontalScroll}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={favorites}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Activity", { id: item._id })
                  }
                >
                  <Image
                    source={{ uri: item.image.secure_url }}
                    style={styles.smallImage}
                  />
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
        </View>
      )}

      <View style={styles.categoryRow}>
        <View style={styles.categoryTitle}>
          <Feather name={"star"} style={styles.picto} />
          <Text style={styles.categoryTitle_Text}>A la une</Text>
        </View>

        <View style={styles.horizontalScroll}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={highlights}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Activity", { id: item._id })
                }
              >
                <Image
                  source={{ uri: item.image.secure_url }}
                  style={styles.largeImage}
                />
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
      <View style={styles.categoryRow}>
        <View style={styles.categoryTitle}>
          <Feather name={"trending-up"} style={styles.picto} />
          <Text style={styles.categoryTitle_Text}>Tendances</Text>
        </View>

        <View style={styles.horizontalScroll}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={trending}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Activity", { id: item._id })
                }
              >
                <Image
                  source={{ uri: item.image.secure_url }}
                  style={styles.smallImage}
                />
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "white",
    padding: 15,
    // borderWidth: 1,
    // borderColor: "orange",
  },
  searchBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  categoryRow: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: "red",
  },
  categoryTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  categoryTitle_Text: {
    fontFamily: AppStyles.font.regular,
    fontSize: 18,
  },
  picto: {
    fontSize: 32,
    fontWeight: "100",
    alignSelf: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  smallImage: {
    width: 139,
    height: 69,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  largeImage: {
    width: 250,
    height: 190,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  horizontalScroll: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "pink",
  },
});
