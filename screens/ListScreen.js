import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// components
import CustomButtonSearch from "../components/CustomButtonSearch";
import CustomButton from "../components/CustomButton";

// AppStyles.js
import AppStyles from "../AppStyles";

// Icons
import Heart from "../assets/heart.svg";
import HeartSolid from "../assets/heart_solid.svg";

// Images category
import Category01 from "../assets/category/01.png";
import Category02 from "../assets/category/02.png";
import Category03 from "../assets/category/03.png";
import Category04 from "../assets/category/04.png";
import Category05 from "../assets/category/05.png";
import Category06 from "../assets/category/06.png";
import Category07 from "../assets/category/07.png";

export default function ListScreen({ route, navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [name, setName] = useState(route?.params?.searchName || "");
  const [startDate, setStartDate] = useState(
    route?.params?.searchStartDate || ""
  );
  const [endDate, setEndDate] = useState(route?.params?.searchEndDate || "");
  const [address, setAddress] = useState(route?.params?.searchAddress || "");

  // const navigation = useNavigation();

  const categoryTab = [
    { name: "Les mains", url: Category01 },
    { name: "Le goût", url: Category02 },
    { name: "Le regard", url: Category03 },
    { name: "La détente", url: Category04 },
    { name: "La scène", url: Category05 },
    { name: "La musique", url: Category06 },
    { name: "La nature", url: Category07 },
  ];
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
      } else {
        await axios.put(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/addFavorite/${userId}/${activityId}`
        );
        setIsFavorite(true);
      }
      setRefresh(!refresh);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/activities?category=${category}&name=${name}&startDate=${startDate}&endDate=${endDate}&address=${address}`
          );

          // console.log(response.data);
          setActivitiesList(response.data.activities);
        } catch (error) {
          console.log(error.message);
        }
      };

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

      fetchData();
      fetchFavoritesData();
      setIsLoading(false);
    }, [category, name, address, startDate, endDate, refresh])
  );

  // console.log("name >>>", name);

  // Utilisation de la fonction 'useStyle' qui utilise le hook "useWindowDimensions"
  const styles = useStyle();

  const handlePressCategorie = (value) => {
    if (value === category) {
      setCategory("");
    } else {
      setCategory(value);
      setName("");
      setAddress("");
      setStartDate("");
      setEndDate("");
    }
  };

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
    >
      {name || address || startDate || endDate ? (
        <View style={styles.container_new_search}>
          <CustomButton
            style="full_width"
            feather
            end_icon="chevron-right"
            text="Nouvelle recherche"
            type="outlined"
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
      ) : (
        <CustomButtonSearch
          text="Cours, activité, atelier"
          style="full_width"
          feather_start
          start_icon="search"
          feather_end
          end_icon="sliders"
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      )}

      <FlatList
        contentContainerStyle={styles.container_category}
        nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryTab}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          // console.log("category url >>", item.url);
          return (
            <TouchableHighlight
              style={styles.search_category}
              underlayColor="white"
              onPress={() => {
                handlePressCategorie(item.name);
              }}
            >
              <View style={[styles.category]}>
                <View
                  style={
                    category === item.name
                      ? styles.container_category_image_current
                      : styles.container_category_image
                  }
                >
                  <Image style={[styles.category_image]} source={item.url} />
                </View>
                <Text
                  style={
                    category === item.name
                      ? styles.category_text_current
                      : styles.category_text
                  }
                >
                  {item.name}
                </Text>
              </View>
            </TouchableHighlight>
          );
        }}
      />
      <ScrollView nestedScrollEnabled style={styles.container_list}>
        {activitiesList.map((item) => {
          return (
            <View key={item._id}>
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

                    <View style={styles.flex_horizontal}>
                      {item.owner.address.address ? (
                        <Text style={styles.text} numberOfLines={1}>
                          {item.owner.address.address},
                          {item.owner.address.postcode}
                        </Text>
                      ) : (
                        <Text style={styles.text} numberOfLines={1}>
                          {item.owner.address.postcode}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={[styles.container_right]}>
                    <TouchableHighlight
                      style={styles.container_icon}
                      underlayColor="white"
                      onPress={() => handleFavorites(item._id)}
                    >
                      {favorites.some(
                        (favorite) => favorite._id === item._id
                      ) ? (
                        <HeartSolid style={styles.icon} />
                      ) : (
                        <Heart style={styles.icon} />
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}

const useStyle = () => {
  // Création du style
  // utilisation du hook "useWindowDimensions"
  const { height, width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  // const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    container: {
      alignItems: "flext-start",
      justifyContent: "flext-start",
      backgroundColor: "white",
      padding: 15,
      marginBottom: tabBarHeight,
    },
    container_list: {
      width: "100%",
    },
    container_category: {
      gap: 15,
      justifyContent: "space-between",
      marginBottom: 15,
      display: "flex",
    },
    search_category: {
      width: width / 4 - 5,
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
    },
    search_list_image: {
      width: 100,
      height: 83,
      resizeMode: "cover",
      borderRadius: 3,
    },
    container_icon: {
      width: 28,
    },
    container_text: {
      flex: 2,
      alignSelf: "flex-start",
    },
    text: {
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
      color: AppStyles.color.text_subtle,
    },
    text_price: {
      fontFamily: AppStyles.font.regular,
      fontSize: 14,
      color: AppStyles.color.text_normal,
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
      width: "100%",
      height: "100%",
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
    container_new_search: {
      width: "100%",
      marginBottom: 15,
    },
    container_right: {
      width: 24,
      gap: 25,
      alignItems: "center",
      justifyContent: "space-between",
    },
    credits: {
      minWidth: 50,
      gap: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: AppStyles.color.background,
      padding: 2,
      borderRadius: 4,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });

  // Retourne le style
  return styles;
};
