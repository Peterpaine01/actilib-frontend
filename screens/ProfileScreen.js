import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import avatar from "../assets/Avatar.png";
import heart from "../assets/profile-icones/heart.png";
import shield from "../assets/profile-icones/shield.png";
import alert from "../assets/profile-icones/alert.png";
import disconnect from "../assets/profile-icones/disconnect.png";
import gear from "../assets/profile-icones/gear.png";
import plane from "../assets/profile-icones/plane.png";
import { useState, useEffect } from "react";
import axios from "axios";

// AppStyles.js
import AppStyles from "../AppStyles";

export default function ProfileScreen({ setToken }) {
  // while back is not ready use these data to populate:
  // const url = "";
  // const name = "Martin";
  // const firstname = "Eva";
  // const company = "BNP Paribas";
  // const seniority = "Mars 2023";
  // const userCredits = "";
  // const remainingCredits = "";
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [company, setCompany] = useState("");
  const [seniority, setSeniority] = useState("");
  const [seniorityDate, setSeniorityDate] = useState("");
  const [userCredits, setUserCredits] = useState(null);
  const [remainingCredits, setRemainingCredits] = useState(null);

  const navigation = useNavigation();
  // data state
  // const [data, setData] = useState();
  // is loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        // console.log(userId);
        // sending get request by user Id to populate data
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`
        );

        // console.log(JSON.stringify(response.data.user, null, 2));
        // setData(response.data.user);
        console.log(response.data.user.name);
        setUrl(response.data.user?.avatar?.secure_url);
        setName(response.data.user.name);
        setFirstname(response.data.user.firstname);
        setCompany(response.data.user.company.name);
        setSeniority(response.data.user.seniorityDate);
        setUserCredits(response.data.user.subscription.userCredits);
        setRemainingCredits(response.data.user.remainingCredits);
        // transforming date to string

        const date = new Date(response.data.user.seniorityDate);
        const year = date.getFullYear();
        let monthNumber = date.getMonth();
        // console.log(monthNumber);
        switch (monthNumber) {
          case 0:
            monthNumber = "Janvier";
            break;
            monthNumber = "Février";
            break;
          case 2:
            monthNumber = "Mars";
            break;
          case 3:
            monthNumber = "Avril";
            break;
          case 4:
            monthNumber = "Mai";
            break;
          case 5:
            monthNumber = "Juin";
            break;
          case 6:
            monthNumber = "Juillet";
            break;
          case 7:
            monthNumber = "Aout";
            break;
          case 8:
            monthNumber = "Septembre";
            break;
          case 9:
            monthNumber = "Octobre";
            break;
          case 10:
            monthNumber = "Novembre";
            break;
          case 11:
            monthNumber = "Décembre";
            break;
          default:
            console.log("error");
            break;
        }
        // console.log(year);
        // console.log(monthNumber);
        setSeniorityDate(`${monthNumber} ${year}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.basicInfoContainer}>
        {/* // check if user got profile picture already */}
        {url ? (
          <Image source={{ uri: url }} style={styles.profilePic} />
        ) : (
          <Image source={avatar} style={styles.profilePic} />
        )}
        <View style={styles.txtInfoContainer}>
          <Text
            style={[styles.tall, styles.green, styles.fullname]}
            numberOfLines={2}
          >{`${firstname} ${name}`}</Text>
          <Text style={styles.small}>{company}</Text>
          <Text style={styles.small}>{`Depuis ${seniorityDate}`}</Text>
        </View>
      </View>
      <View style={styles.subsContainer}>
        <View style={[styles.block, styles.left]}>
          <Text style={styles.tall}>Abonnement</Text>
          {/* Check if subsciption has already been choosen */}
          {userCredits ? (
            <Text
              style={[styles.small, styles.green]}
            >{`${userCredits} Crédits / Mois`}</Text>
          ) : (
            <Text
              style={[styles.small, styles.green]}
              onPress={() => {
                navigation.navigate("Subscription");
              }}
            >
              Veuillez choisir votre abonnement
            </Text>
          )}
        </View>
        <View style={[styles.block, styles.right]}>
          <Text style={styles.tall}>À dépenser</Text>
          {/* Check if subsciption has already been choosen */}
          {userCredits ? (
            <Text
              style={[styles.small, styles.green]}
            >{`${remainingCredits} Crédits`}</Text>
          ) : (
            <Text style={[styles.small, styles.green]}>- Crédits</Text>
          )}
        </View>
      </View>
      <View style={styles.category}>
        <Image source={heart} style={styles.picto} />
        <Text
          style={styles.small}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          Mon Profile
        </Text>
      </View>
      <View style={styles.category}>
        <Image source={shield} style={styles.picto} />
        <Text
          style={styles.small}
          onPress={() => {
            navigation.navigate("Subscription");
          }}
        >
          Abonnement
        </Text>
      </View>
      <View style={styles.category}>
        <Image source={plane} style={styles.picto} />
        <Text style={[styles.small, styles.lightgrey]}>Partage</Text>
      </View>
      <View style={styles.category}>
        <Image source={alert} style={styles.picto} />
        <Text style={[styles.small, styles.lightgrey]}>Notifications</Text>
      </View>
      <View style={styles.category}>
        <Image source={gear} style={styles.picto} />
        <Text
          style={styles.small}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          Réglage
        </Text>
      </View>
      <View style={styles.category}>
        <Image source={disconnect} style={styles.picto} />
        <Text
          style={styles.small}
          onPress={() => {
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("userId");
            setToken(null);
          }}
        >
          Déconnecter
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 30,
    backgroundColor: "white",
  },
  basicInfoContainer: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  txtInfoContainer: {
    gap: 10,
  },
  fullname: {
    marginBottom: 10,
  },
  tall: {
    fontSize: 20,
    fontWeight: "bold",
  },
  small: {
    fontSize: 15,
    fontWeight: "bold",
  },
  green: {
    color: AppStyles.color.primary,
  },
  subsContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
  },
  block: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderTopColor: AppStyles.color.border_subtle,
    borderTopWidth: 1,
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
  },
  left: {
    borderLeftColor: AppStyles.color.border_subtle,
    borderLeftWidth: 1,
    borderRightColor: AppStyles.color.border_subtle,
    borderRightWidth: 1,
  },
  right: {
    borderRightColor: AppStyles.color.border_subtle,
    borderRightWidth: 1,
  },
  category: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    marginBottom: 30,
  },
  picto: {
    height: 22,
    width: 22,
    objectFit: "contain",
  },
  lightgrey: {
    color: "lightgrey",
  },
  loadingContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
