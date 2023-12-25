import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

// Icons
import Heart from "../assets/heart.svg";
import HeartSolid from "../assets/heart_solid.svg";

// AppStyles.js
import AppStyles from "../AppStyles.js";

export default function FavsScreen() {
  const styles = useStyle();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //favorites

  const handleFavorites = async (activityId) => {
    const isFavorited = favorites.some(
      (favorite) => favorite._id === activityId
    );
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (isFavorited) {
        await axios.delete(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/deleteFavorite/${userId}/${activityId}`
        );
        setIsFavorite(false);
        // console.log("Unfavorited");
      } else {
        await axios.put(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/addFavorite/${userId}/${activityId}`
        );
        setIsFavorite(true);
        // console.log("Favorited");
      }
      setRefresh(!refresh);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavoritesData = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId");
          // console.log(userId);
          const favoritesData = await axios.get(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/favorites/${userId}`
          );
          // console.log(JSON.stringify(favoritesData.data, null, 2));
          setFavorites(favoritesData.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchFavoritesData();
      setIsLoading(false);
    }, [refresh])
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <View>
      {favorites ? (
        <FlatList
          style={styles.container_list}
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                style={styles.search_list}
                underlayColor={AppStyles.color.background}
                onPress={() =>
                  navigation.navigate("Activity", { id: item._id })
                }
              >
                <View style={[styles.flex_horizontal, styles.flex_between]}>
                  <Image
                    style={styles.search_list_image}
                    source={{ uri: item.image.secure_url }}
                  />
                  <View style={styles.container_text}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.text} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {item.owner.name}
                    </Text>
                    <View style={styles.flex_horizontal}>
                      {item.owner.address.address && (
                        <Text style={styles.text} numberOfLines={1}>
                          {item.owner.address.address},{" "}
                          {item.owner.address.postcode}
                        </Text>
                      )}
                    </View>
                  </View>
                  <TouchableHighlight
                    style={styles.container_icon}
                    underlayColor="white"
                    onPress={() => handleFavorites(item._id)}
                  >
                    {favorites.some((favorite) => favorite._id === item._id) ? (
                      <HeartSolid style={styles.icon} />
                    ) : (
                      <Heart style={styles.icon} />
                    )}
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            );
          }}
        >
          <Text>ok</Text>
        </FlatList>
      ) : (
        <ScrollView contentContainerStyle={styles.container_center}>
          <Text>Vous n'avez pas encore de favoris</Text>
        </ScrollView>
      )}
    </View>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      alignItems: "flext-start",
      justifyContent: "flext-start",
      backgroundColor: "white",
      padding: 15,
    },
    container_center: {
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
      display: "flex",
      height: "100%",
      // borderColor: "red",
      // borderWidth: 1,
    },
    container_list: {
      // borderColor: "blue",
      // borderWidth: 2,
      width: "100%",
      padding: 15,
    },
    container_category: {
      // borderColor: "red",
      // borderWidth: 1,
      gap: 15,
      justifyContent: "space-between",
      marginBottom: 15,
    },
    search_category: {
      width: width / 4 - 5,
      // borderColor: "blue",
      // borderWidth: 1,
    },
    category: {
      width: "100%",
      gap: 5,
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
    search_list: {
      width: "100%",
      borderColor: AppStyles.color.border_subtle,
      borderBottomWidth: 1,
      padding: 15,
      // borderColor: "red",
      // borderWidth: 2,
    },
    search_list_image: {
      width: 100,
      height: 83,
      resizeMode: "cover",
      borderRadius: 3,
    },
    container_icon: {
      width: 28,
      // borderColor: "blue",
      // borderWidth: 2,
    },
    container_text: {
      flex: 2,
      alignSelf: "flex-start",
      // borderColor: "red",
      // borderWidth: 2,
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
    container_category_image: {
      borderRadius: 1000,
      padding: 5,
      borderColor: AppStyles.color.border_subtle,
      borderWidth: 1,
      width: width / 4 - 5,
      height: width / 4 - 5,
    },
    container_category_image_current: {
      borderRadius: 1000,
      padding: 5,
      borderColor: AppStyles.color.accent,
      borderWidth: 3,
      width: width / 4 - 5,
      height: width / 4 - 5,
    },
    category_image: {
      borderRadius: 1000,
      backgroundColor: AppStyles.color.primary,
      width: "100%",
      height: "100%",
      // borderColor: "pink",
      // borderWidth: 1,
    },
    category_text: {
      textAlign: "center",
      fontFamily: AppStyles.font.regular,
      fontSize: 12,
      color: AppStyles.color.text_subtle,
    },
    category_text_current: {
      textAlign: "center",
      fontFamily: AppStyles.font.regular,
      fontSize: 12,
      color: AppStyles.color.accent,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });

  // Retourne le style
  return styles;
};
