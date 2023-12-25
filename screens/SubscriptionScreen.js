import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

// AppStyles.js
import AppStyles from "../AppStyles";
// Customs
import CustomButton from "../components/CustomButton";

export default function SubscriptionScreen() {
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };

  const navigation = useNavigation();
  // data state
  const [dataUser, setDataUser] = useState();
  // data company state
  const [dataSubscriptions, setDataSubscriptions] = useState();
  // user subscription state
  const [userSub, setUserSub] = useState();
  // next user subscription state
  const [nextUserSub, setNextUserSub] = useState();
  // is loading state
  const [isLoading, setIsLoading] = useState(true);
  // modifying subsciption program state
  const [modifySub, setModifySub] = useState(false);
  // refreshing page state
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  let dateToDisplay = "";
  if (dataUser?.nextSubscription) {
    dateToDisplay = new Date(dataUser.nextSubscription.startDate);
    const month = ("0" + (dateToDisplay.getMonth() + 1)).slice(-2);
    const year = dateToDisplay.getFullYear();
    dateToDisplay = `01-${month}-${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`
        );
        const responseSubsData = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/subscription`
        );
        // console.log(JSON.stringify(response.data.user, null, 2));
        setDataUser(response.data.user);
        setUserSub(response.data.user.subscription);

        // console.log(
        //   JSON.stringify(responseSubsData.data.subscriptions, null, 2)
        // );
        setDataSubscriptions(responseSubsData.data.subscriptions);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [refreshSwitch]);

  const handleClick = async () => {
    // setModifySub(true);
    try {
      // console.log(nextUserSub);
      // post request with next subscription id and date of availability (first day of next 2nd month)
      const today = new Date();
      let next2Month = today.getMonth() + 3;
      let year = today.getFullYear();
      if (next2Month > 12) {
        next2Month -= 12;
        year += 1;
      }
      next2Month = ("0" + next2Month).slice(-2);
      const dateNextSubIsActive = new Date(`${year}-${next2Month}-01`);
      // console.log(dateNextSubIsActive);
      const nextSubId = nextUserSub._id;
      // console.log(nextUserSub._id);
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      // console.log(userId);
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`,
        {
          nextSubscription: {
            subscriptionId: nextSubId,
            startDate: dateNextSubIsActive,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(JSON.stringify(response.data, null, 2));
      setNextUserSub(null);
      setModifySub(false);
      showToast(
        "success",
        "Merci pour votre fidélité",
        "Vos informations ont été modifiées avec succès"
      );
      setRefreshSwitch(!refreshSwitch);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteModif = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      // console.log(userId);
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`,
        {
          nextSubscription: {
            subscriptionId: "",
            startDate: "",
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(JSON.stringify(response.data, null, 2));
      showToast(
        "success",
        "Merci pour votre fidélité",
        "Vos informations ont été modifiées avec succès"
      );
      setRefreshSwitch(!refreshSwitch);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Abonnement</Text>
      <View style={styles.subsContainer}>
        <View style={[styles.block, styles.left]}>
          {/* check if user already has subscribed */}
          {userSub ? (
            <>
              <Text style={styles.tall}>{userSub.name}</Text>
              <Text
                style={[styles.small, styles.green]}
              >{`${userSub.userCredits} Crédits - ${userSub.price} €`}</Text>
            </>
          ) : (
            <>
              <Text style={styles.tall}>Forfait -</Text>
              <Text
                style={[styles.small, styles.green]}
              >{`__ Crédits - __ €`}</Text>
            </>
          )}
        </View>
        <View style={[styles.block, styles.right]}>
          <Text style={styles.tall}>Restant</Text>
          {userSub ? (
            <Text
              style={[styles.small, styles.green]}
            >{`${dataUser.remainingCredits} Crédits`}</Text>
          ) : (
            <Text style={[styles.small, styles.green]}>{`__ Crédits`}</Text>
          )}
        </View>
      </View>
      {userSub ? (
        <Text style={styles.subtitle}>Changer de forfait</Text>
      ) : (
        <Text style={styles.subtitle}>Choisir un forfait</Text>
      )}

      {dataSubscriptions ? (
        <View style={styles.subsListContainer}>
          {dataSubscriptions.map((sub) => {
            if (userSub?._id !== sub._id) {
              return (
                <TouchableOpacity
                  key={sub._id}
                  style={styles.subContainer}
                  onPress={() => {
                    if (nextUserSub?._id === sub._id) {
                      setNextUserSub(null);
                    } else {
                      setNextUserSub(sub);
                    }
                  }}
                >
                  <View style={styles.subInfos}>
                    <View>
                      <Text style={[styles.small, styles.green]}>
                        {sub.name}
                      </Text>
                      <Text
                        style={styles.lightgrey}
                      >{`${sub.userCredits} Crédits`}</Text>
                    </View>
                    <Text
                      style={[styles.price, styles.lightgrey]}
                    >{`${sub.price} €`}</Text>
                  </View>
                  {dataUser.nextSubscription ? (
                    dataUser.nextSubscription.subscriptionId === sub._id ? (
                      <View style={styles.subInfos}>
                        <Text
                          style={[styles.infos, styles.green]}
                        >{`Ce forfait débutera le ${dateToDisplay}`}</Text>
                        <Text
                          style={[styles.small, styles.green]}
                          onPress={() => {
                            handleDeleteModif();
                          }}
                        >
                          Annuler
                        </Text>
                      </View>
                    ) : null
                  ) : null}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      ) : null}

      <Text style={[styles.small, styles.green]}>
        Votre forfait est sans engagement.
      </Text>
      <Text style={[styles.infos, styles.lightgrey]}>
        Vous pouvez changer de forfait à tout moment et le changement prendra
        effet dans les deux mois qui suivent.
      </Text>
      {nextUserSub ? (
        !modifySub ? (
          <CustomButton
            style="full_width"
            onPress={() => {
              // console.log("click");
              handleClick();
            }}
            text={`Valider le ${nextUserSub.name}`}
            type="solid"
          />
        ) : (
          <CustomButton
            style="full_width"
            text={`Valider le ${nextUserSub.name}`}
            type="disabled"
          />
        )
      ) : null}
      <>
        {/* ... */}
        <Toast style={styles.toast} position="top" topOffset={100} />
      </>
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
  loadingContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  subsListContainer: {
    marginBottom: 20,
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
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: AppStyles.color.primary,
  },
  subContainer: {
    paddingVertical: 10,
    marginTop: 10,

    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
  },
  subInfos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
  },
  lightgrey: {
    color: AppStyles.color.text_subtle,
  },
  infos: {
    fontStyle: "italic",
    marginTop: 5,
    lineHeight: 20,
    // marginBottom: 20,
  },
  toast: {
    // marginTop: 20,
  },
});
