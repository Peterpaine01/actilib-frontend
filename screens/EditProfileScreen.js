import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
// AppStyles.js
import AppStyles from "../AppStyles";
// components
import CustomButton from "../components/CustomButton";
// pictures
import { FontAwesome } from "@expo/vector-icons";
import avatar from "../assets/edit-profile/Avatar.png";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function EditProfileScreen() {
  // while back is not ready use these data to populate:
  // const url = "";
  // const email = "eva.martin@bnp.fr";
  // const name = "Martin";
  // const firstname = "Eva";

  const navigation = useNavigation();

  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };

  const [isLoading, setIsLoading] = useState(false); // <====== CHANGE TO TRUE WHEN BACK IS READY
  // state for data request
  const [dataRecieved, setDataRecieved] = useState();
  // updating state
  const [updating, setUpdating] = useState(false);
  // picture state
  const [picture, setPicture] = useState("");
  // name state
  const [name, setName] = useState("");
  // firstname state
  const [firstname, setFirstname] = useState("");
  // birthdate state
  const [birthdate, setBirthdate] = useState("");
  // show/hide calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  // email state
  const [email, setEmail] = useState("");
  // day selected on calendar state
  // const [selected, setSelected] = useState("");

  // calendar configs
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "fr";
  const date = new Date() - 630700000000;

  // allow opening gallery
  const getPermissionAndOpenGallery = async () => {
    // ask for access to pics gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(status);
    if (status === "granted") {
      // open pic gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        // for a square picture
        aspect: [1, 1],
      });

      if (result.canceled) {
        // alert("no picture selected");
        showToast("info", "", "Aucune image n'a été sélectionée");
      } else {
        setPicture(result.assets[0].uri);
      }
    } else {
      showToast(
        "error",
        "Accès refusé",
        "Pour modifier votre choix rendez-vous dans les paramètres des applications de votre téléphone"
      );
    }
  };

  // allow opening camera
  const getPermissionAndOpenCamera = async () => {
    // ask for access to camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      // open camera
      const result = await ImagePicker.launchCameraAsync();
      if (result.canceled) {
        showToast("info", "", "Aucune photo n'a été prise");
      } else {
        setPicture(result.assets[0].uri);
      }
    } else {
      showToast(
        "error",
        "Accès refusé",
        "Pour modifier votre choix rendez-vous dans les paramètres des applications de votre téléphone"
      );
    }
  };

  const handleSubmit = async () => {
    setUpdating(true);
    // console.log("click");
    // sending a first request for text inputs
    try {
      // name and firstname are mandatory, alert user if fields are empty
      if (!name || !firstname) {
        showToast(
          "error",
          "Certains champs sont obligatoires",
          "Veuillez renseigner au moins votre nom et prénom"
        );
        setUpdating(false);
      } else {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const resultUpdate = await axios.put(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`,
          {
            name: name,
            firstname: firstname,
            birthdate: new Date(birthdate),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(resultUpdate.data);
        // send second request if there is a picture
        if (picture) {
          const extension = picture.split(".").at(-1);
          const formData = new FormData();
          formData.append("image", {
            uri: picture,
            name: `myPict.${extension}`,
            type: `image/${extension}`,
          });
          const { data } = await axios.put(
            `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(data);
        }
        showToast(
          "success",
          `Merci ${firstname}`,
          "Vos informations ont été modifiées avec succès"
        );
        setUpdating(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        // launch GET request to obtain user informations by Id
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(JSON.stringify(response.data.user, null, 2));
        setDataRecieved(response.data.user);
        response.data.user.name && setName(response.data.user.name);
        response.data.user.firstname &&
          setFirstname(response.data.user.firstname);
        response.data.user.avatar &&
          setPicture(response.data.user.avatar.secure_url);
        // transform date to string readable by calendar package AAAA-MM-JJ
        if (response.data.user.birthDate) {
          const date = new Date(response.data.user.birthDate);
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          setBirthdate(`${year}-${month}-${day}`);
        }
        setEmail(response.data.user.email);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <View style={styles.avatarContainer}>
        {picture ? (
          <Image source={{ uri: picture }} style={styles.avatar} />
        ) : (
          <Image source={avatar} style={styles.avatar} />
        )}
        <View style={styles.pictoContainer}>
          <FontAwesome
            name="picture-o"
            size={24}
            color={AppStyles.color.accent}
            onPress={() => {
              getPermissionAndOpenGallery();
            }}
          />
          <FontAwesome
            name="camera"
            size={24}
            color={AppStyles.color.accent}
            onPress={() => {
              getPermissionAndOpenCamera();
            }}
          />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <Text>{email}</Text>
      <Text style={styles.label}>Mot de passe</Text>
      <CustomButton
        style="full_width"
        onPress={() => {
          navigation.navigate("ModifyPassword");
        }}
        feather
        end_icon="chevron-right"
        text="Modifier mon mot de passe"
        type="outlined"
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="firstname"
          value={firstname}
          onChangeText={(text) => {
            setFirstname(text);
          }}
        />
        <Text style={styles.label}>Date de naissance</Text>
        <View style={styles.birthdateContainer}>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-JJ"
            value={birthdate}
            onChangeText={(text) => {
              setBirthdate(text);
            }}
          />
          {!showCalendar ? (
            <Feather
              style={styles.caret}
              name="chevron-down"
              size={24}
              color="black"
              onPress={() => {
                setShowCalendar(true);
              }}
            />
          ) : (
            <Feather
              style={styles.caret}
              name="chevron-up"
              size={24}
              color="black"
              onPress={() => {
                setShowCalendar(false);
              }}
            />
          )}
        </View>

        {showCalendar && (
          <CalendarList
            // if no birthdate entered calendar will start 20 years from now,
            // calendar limit slide 45 years before/after current date to limit app memory
            pastScrollRange={540}
            horizontal={true}
            onDayPress={(day) => {
              setBirthdate(day.dateString);
            }}
            // Specify the current date
            current={birthdate || date}
            markedDates={{
              [birthdate]: {
                selected: true,
                disableTouchEvent: true,
                // selectedDotColor: "orange",
              },
            }}
            theme={{
              selectedDayBackgroundColor: AppStyles.color.primary,
              todayTextColor: AppStyles.color.primary,
              arrowColor: AppStyles.color.accent,
            }}
          />
        )}

        <View style={styles.submitBtn}>
          {updating ? (
            <CustomButton
              style="full_width"
              text="Enregistrer les changements"
              type="solid"
            />
          ) : (
            <CustomButton
              style="full_width"
              onPress={() => {
                handleSubmit();
                // console.log("submmit");
              }}
              text="Enregistrer les changements"
              type="solid"
            />
          )}
        </View>
      </View>
      <>
        {/* ... */}
        <Toast style={styles.toast} position="top" topOffset={100} />
      </>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  pictoContainer: {
    gap: 20,
  },
  camera: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
  avatar: {
    height: 140,
    width: 140,
    objectFit: "contain",
    borderRadius: 70,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  formContainer: {
    borderTopColor: AppStyles.color.border_subtle,
    borderTopWidth: 1,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: AppStyles.color.border_subtle,
    borderRadius: 5,
    padding: 10,
  },
  birthdateContainer: {
    position: "relative",
  },
  caret: {
    position: "absolute",
    right: 10,
    top: 13,
  },
  submitBtn: {
    marginTop: 30,
  },
  loadingContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toast: {
    marginTop: 200,
  },
});
