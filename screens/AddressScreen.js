import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// AppStyles.js
import AppStyles from "../AppStyles";
// components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Feather } from "@expo/vector-icons";

export default function AddressScreen() {
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  // In order to obtain coordinates from an address, user must accept geolocation
  //STATES for Home form fields
  const [displayHome, setDisplayHome] = useState(false);
  const [homeAddress, setHomeAddress] = useState("");
  const [homePostcode, setHomePostcode] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  //STATES for Work form fields
  const [displayWork, setDisplayWork] = useState(false);
  const [workAddress, setWorkAddress] = useState("");
  const [workPostcode, setWorkPostcode] = useState("");
  const [workCity, setWorkCity] = useState("");
  const [workCountry, setWorkCountry] = useState("");
  // STATES for new address form fields
  const [displayAddAddress, setDisplayAddAddress] = useState(false);
  const [newAddressTitle, setNewAddressTitle] = useState("");
  const [newAddressAddress, setNewAddressAddress] = useState("");
  const [newAddressPostcode, setNewAddressPostcode] = useState("");
  const [newAddressCity, setNewAddressCity] = useState("");
  const [newAddressCountry, setNewAddressCountry] = useState("");
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  // is waiting state
  const [isWaiting, setIsWaiting] = useState(false);
  // data recieved state
  const [dataUser, setDataUser] = useState();
  // addressList state
  const [addressList, setAddressList] = useState([]);
  // force refresh page state
  const [refreshPage, setRefreshPage] = useState(false);
  // determine position of home and work addresses in List if existing
  let titlesList = [];
  if (addressList) {
    titlesList = addressList.map((obj) => {
      return obj.title;
    });
  }
  // console.log(titlesList);
  let homeIndex = null;
  let homeExists = false;
  if (titlesList.includes("home")) {
    homeIndex = titlesList.indexOf("home");
    homeExists = true;
  }
  // console.log(homeIndex);
  let workIndex = null;
  let workExists = false;
  if (titlesList.includes("work")) {
    workIndex = titlesList.indexOf("work");
    workExists = true;
  }

  const handleAddNewAddress = async (event) => {
    event.preventDefault();
    if (
      !newAddressTitle ||
      !newAddressAddress ||
      !newAddressPostcode ||
      !newAddressCity ||
      !newAddressCountry
    ) {
      showToast("error", "Veuillez remplir tous les champs", "");
    } else {
      try {
        // ask for user authorization to use Loaction
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          setIsWaiting(true);
          // get coordinates from new address
          const newAddress = `${newAddressAddress}, ${newAddressPostcode} ${newAddressCity}, ${newAddressCountry}`;
          // console.log(newAddress);
          const answerData = await Location.geocodeAsync(newAddress);
          // console.log(answerData[0]);
          const longitude = Number.parseFloat(answerData[0].longitude).toFixed(
            6
          );
          // console.log(longitude);
          const latitude = Number.parseFloat(answerData[0].latitude).toFixed(6);
          // console.log(latitude);
          // create new address
          const userId = await AsyncStorage.getItem("userId");
          const token = await AsyncStorage.getItem("token");
          const responseCreation = await axios.put(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/addAddress/${userId}`,
            {
              title: newAddressTitle,
              address: newAddressAddress,
              postCode: newAddressPostcode,
              city: newAddressCity,
              country: newAddressCountry,
              latitude: latitude,
              longitude: longitude,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log(responseCreation.data);
          setDisplayAddAddress(false);
          setIsWaiting(false);
          setRefreshPage(!refreshPage);
        } else {
          showToast(
            "error",
            "Géolocalisation désactivée",
            "Activez-la dans les paramètres du téléphone"
          );
          setIsWaiting(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsWaiting(false);
      }
    }
  };

  const handleModifyHomeAddress = async (event, addressId) => {
    event.preventDefault();
    if (!homeAddress || !homePostcode || !homeCity || !homeCountry) {
      showToast("error", "Veuillez remplir tous les champs", "");
    } else {
      try {
        // ask for user authorization to use Location
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          setIsWaiting(true);
          // get coordinates from new address
          const newAddress = `${homeAddress}, ${homePostcode} ${homeCity}, ${homeCountry}`;
          // console.log(newAddress);
          const answerData = await Location.geocodeAsync(newAddress);
          // console.log(answerData[0]);
          const longitude = Number.parseFloat(answerData[0].longitude).toFixed(
            6
          );
          // console.log(longitude);
          const latitude = Number.parseFloat(answerData[0].latitude).toFixed(6);
          // console.log(latitude);
          const userId = await AsyncStorage.getItem("userId");
          const token = await AsyncStorage.getItem("token");
          // if Home address already exists we first delete it then add a new one, if not we create it anyway
          if (addressId) {
            const reponseDeletion = await axios.delete(
              `${process.env.EXPO_PUBLIC_SERVER_URL}/user/deleteAddress/${userId}/${addressId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            // console.log(reponseDeletion.data);
          }
          // (re)creation of Home address
          const responseCreation = await axios.put(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/addAddress/${userId}`,
            {
              title: "home",
              address: homeAddress,
              postCode: homePostcode,
              city: homeCity,
              country: homeCountry,
              latitude: latitude,
              longitude: longitude,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log(responseCreation.data);
          setDisplayHome(false);
          setIsWaiting(false);
          setRefreshPage(!refreshPage);
        } else {
          showToast(
            "error",
            "Géolocalisation désactivée",
            "Activez-la dans les paramètres du téléphone"
          );
          setIsWaiting(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsWaiting(false);
      }
    }
  };

  const handleModifyWorkAddress = async (event, addressId) => {
    event.preventDefault();
    if (!workAddress || !workPostcode || !workCity || !workCountry) {
      showToast("error", "Veuillez remplir tous les champs", "");
    } else {
      try {
        // ask for user authorization to use Location
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          setIsWaiting(true);
          // get coordinates from new address
          const newAddress = `${workAddress}, ${workPostcode} ${workCity}, ${workCountry}`;
          // console.log(newAddress);
          const answerData = await Location.geocodeAsync(newAddress);
          // console.log(answerData[0]);
          const longitude = Number.parseFloat(answerData[0].longitude).toFixed(
            6
          );
          // console.log(longitude);
          const latitude = Number.parseFloat(answerData[0].latitude).toFixed(6);
          // console.log(latitude);
          const userId = await AsyncStorage.getItem("userId");
          const token = await AsyncStorage.getItem("token");
          // if Work address already exists we first delete it then add a new one, if not we create it anyway
          if (addressId) {
            const reponseDeletion = await axios.delete(
              `${process.env.EXPO_PUBLIC_SERVER_URL}/user/deleteAddress/${userId}/${addressId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            // console.log(reponseDeletion.data);
          }
          // (re)creation of Work address
          const responseCreation = await axios.put(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/addAddress/${userId}`,
            {
              title: "work",
              address: workAddress,
              postCode: workPostcode,
              city: workCity,
              country: workCountry,
              latitude: latitude,
              longitude: longitude,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // console.log(responseCreation.data);
          setDisplayWork(false);
          setIsWaiting(false);
          setRefreshPage(!refreshPage);
        } else {
          showToast(
            "error",
            "Géolocalisation désactivée",
            "Activez-la dans les paramètres du téléphone"
          );
          setIsWaiting(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsWaiting(false);
      }
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      // console.log(addressId);
      const reponseDeletion = await axios.delete(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/user/deleteAddress/${userId}/${addressId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(reponseDeletion.data);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`
        );
        // console.log(JSON.stringify(response.data, null, 2));
        setDataUser(response.data.user);
        setAddressList(response.data.user.addresses);
        // console.log(response.data.user.addresses);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [refreshPage]);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={50}
      enableOnAndroid={true}
      scrollEnabled={true}
      enableAutomaticScroll={true}
    >
      <Text style={styles.title}>Mes adresses</Text>

      {/* Home address block and form*/}
      <View style={styles.addressAndFormContainer}>
        <View style={styles.addressContainer}>
          <View style={styles.addressBlock}>
            <Feather name="home" size={20} color="black" />
            <View style={styles.addressInfos}>
              <Text style={styles.addressTitle}>Adresse Maison</Text>
              {homeExists ? (
                <>
                  <Text style={styles.addressTxtInfos} numberOfLines={1}>
                    {addressList[homeIndex].address}
                  </Text>
                  <Text
                    style={styles.addressTxtInfos}
                    numberOfLines={1}
                  >{`${addressList[homeIndex].postCode} ${addressList[homeIndex].city}`}</Text>
                  <Text style={styles.addressTxtInfos} numberOfLines={1}>
                    {addressList[homeIndex].country}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.addressTxtInfos}>-</Text>
                  <Text style={styles.addressTxtInfos}>-</Text>
                  <Text style={styles.addressTxtInfos}>-</Text>
                </>
              )}
            </View>
          </View>
          {displayHome ? (
            <Text
              onPress={() => {
                setDisplayHome(false);
              }}
              style={styles.addressModify}
            >
              Annuler
            </Text>
          ) : (
            <Text
              onPress={() => {
                setDisplayHome(true);
              }}
              style={styles.addressModify}
            >
              Changer
            </Text>
          )}
        </View>
        {displayHome ? (
          <View style={styles.formBlock}>
            <CustomInput
              placeholder="1 rue de la Paix"
              value={homeAddress}
              setValue={setHomeAddress}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="75001"
              value={homePostcode}
              setValue={setHomePostcode}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="Paris"
              value={homeCity}
              setValue={setHomeCity}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="France"
              value={homeCountry}
              setValue={setHomeCountry}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomButton
              style="full_width"
              onPress={(event) => {
                if (homeExists) {
                  handleModifyHomeAddress(event, addressList[homeIndex]._id);
                } else {
                  handleModifyHomeAddress(event);
                }
              }}
              text="Modifier"
              type="solid"
            />
          </View>
        ) : null}
      </View>
      {/* Work address block and form*/}
      <View style={styles.addressAndFormContainer}>
        <View style={styles.addressContainer}>
          <View style={styles.addressBlock}>
            <Feather name="folder" size={20} color="black" />
            <View style={styles.addressInfos}>
              <Text style={styles.addressTitle}>Adresse Bureau</Text>
              {workExists ? (
                <>
                  <Text style={styles.addressTxtInfos} numberOfLines={1}>
                    {addressList[workIndex].address}
                  </Text>
                  <Text
                    style={styles.addressTxtInfos}
                    numberOfLines={1}
                  >{`${addressList[workIndex].postCode} ${addressList[workIndex].city}`}</Text>
                  <Text style={styles.addressTxtInfos} numberOfLines={1}>
                    {addressList[workIndex].country}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.addressTxtInfos}>-</Text>
                  <Text style={styles.addressTxtInfos}>-</Text>
                  <Text style={styles.addressTxtInfos}>-</Text>
                </>
              )}
            </View>
          </View>
          {displayWork ? (
            <Text
              onPress={() => {
                setDisplayWork(false);
              }}
              style={styles.addressModify}
            >
              Annuler
            </Text>
          ) : (
            <Text
              onPress={() => {
                setDisplayWork(true);
              }}
              style={styles.addressModify}
            >
              Changer
            </Text>
          )}
        </View>
        {displayWork ? (
          <View style={styles.formBlock}>
            <CustomInput
              placeholder="1 rue de la Paix"
              value={workAddress}
              setValue={setWorkAddress}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="75001"
              value={workPostcode}
              setValue={setWorkPostcode}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="Paris"
              value={workCity}
              setValue={setWorkCity}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="France"
              value={workCountry}
              setValue={setWorkCountry}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomButton
              style="full_width"
              onPress={(event) => {
                if (workExists) {
                  handleModifyWorkAddress(event, addressList[workIndex]._id);
                } else {
                  handleModifyWorkAddress(event);
                }
              }}
              text="Modifier"
              type="solid"
            />
          </View>
        ) : null}
      </View>
      {/* add address blocks for each other addresses saved by user */}
      <View style={styles.personnalAddressesBlock}>
        {addressList
          ? addressList.map((obj, index) => {
              if (index !== homeIndex && index !== workIndex) {
                return (
                  <View
                    style={[styles.addressContainer, styles.line]}
                    key={obj._id}
                  >
                    <View style={styles.addressBlock}>
                      <Feather name="map-pin" size={20} color="black" />
                      <View style={styles.addressInfos}>
                        <Text
                          style={styles.addressTitle}
                        >{`Adresse ${obj.title}`}</Text>

                        <Text style={styles.addressTxtInfos} numberOfLines={1}>
                          {obj.address}
                        </Text>
                        <Text
                          style={styles.addressTxtInfos}
                          numberOfLines={1}
                        >{`${obj.postCode} ${obj.city}`}</Text>
                        <Text style={styles.addressTxtInfos} numberOfLines={1}>
                          {obj.country}
                        </Text>
                      </View>
                    </View>

                    <Text
                      onPress={() => {
                        handleDeleteAddress(obj._id);
                      }}
                      style={styles.addressModify}
                    >
                      Supprimer
                    </Text>
                  </View>
                );
              }
            })
          : null}
      </View>
      {/* add address form */}
      <View style={styles.addBtn}>
        {displayAddAddress ? (
          <Text
            style={[styles.addressModify, styles.center]}
            onPress={() => {
              setDisplayAddAddress(false);
            }}
          >
            Annuler
          </Text>
        ) : (
          <Text
            style={[styles.addressModify, styles.center]}
            onPress={() => {
              setDisplayAddAddress(true);
            }}
          >
            Ajouter une adresse
          </Text>
        )}
        {displayAddAddress ? (
          <View style={styles.formBlock}>
            <CustomInput
              placeholder="Vacances"
              value={newAddressTitle}
              setValue={setNewAddressTitle}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="1 rue de la Paix"
              value={newAddressAddress}
              setValue={setNewAddressAddress}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="75001"
              value={newAddressPostcode}
              setValue={setNewAddressPostcode}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="Paris"
              value={newAddressCity}
              setValue={setNewAddressCity}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            <CustomInput
              placeholder="France"
              value={newAddressCountry}
              setValue={setNewAddressCountry}
              multiline={false}
              lines={1}
              type="input"
              style="full_width"
            />
            {isWaiting ? (
              <CustomButton
                style="full_width"
                text="Ajouter une adresse"
                type="disabled"
              />
            ) : (
              <CustomButton
                style="full_width"
                onPress={(event) => {
                  handleAddNewAddress(event);
                }}
                text="Ajouter une adresse"
                type="solid"
              />
            )}
          </View>
        ) : null}
      </View>
      <>
        {/* ... */}
        <Toast style={styles.toast} position="bottom" bottomOffset={100} />
      </>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    padding: 30,
    minHeight: "100%",
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
  addressAndFormContainer: {
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  addressContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addressTitle: {
    fontSize: 18,
    lineHeight: 20,
  },
  addressTxtInfos: {
    fontSize: 15,
    lineHeight: 20,
    color: AppStyles.color.text_subtle,
  },
  addressModify: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: AppStyles.color.primary,
  },
  formBlock: {
    marginVertical: 10,
  },
  addBtn: {
    marginTop: 40,
  },
  center: {
    textAlign: "center",
  },
  personnalAddressesBlock: {},
  line: {
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
