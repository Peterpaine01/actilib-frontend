import { StatusBar } from "expo-status-bar";
import React from "react";
// import "../.env";

// AppStyles.js
import AppStyles from "../AppStyles";

// components
import CustomPills from "../components/CustomPills";
import CustomButton from "../components/CustomButton";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import profile from "../assets/profile.png";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  // email state
  const [email, setEmail] = useState("");
  // password state
  const [password, setPassword] = useState("");
  // state to hide or show password
  const [showPassword, setShowPassword] = useState(false);
  // state to wait for request answer
  const [isWaiting, setIsWaiting] = useState(false);
  // data state
  const [data, setData] = useState();

  const navigation = useNavigation();

  const handlePress = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        // start request, user cannot click on button for now
        // console.log("request started");
        setIsWaiting(true);
        // console.log(SERVER_URL);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/signIn`,
          {
            email: email,
            password: password,
          }
        );

        setData(response.data);

        if (response.data.message) {
          // if mail exists in DB but there is no token, answer message "go to signup screen"
          if (
            response.data.message ===
            "Veuillez suivre le lien de première connexion"
          ) {
            showToast(
              "info",
              "Vous n'avez pas encore crée de compte",
              "Veuillez appuyer sur `Première connexion"
            );
          } else if (
            // if mail exists in DB but password is wrong, answer message "wrong combination of email/password"
            response.data.message === "Le mot de passe est incorrect"
          ) {
            showToast("error", "Mauvaise combinaison Email / Mot de passe", "");
          } else if (
            // if mail does not exist in DB, answer message "contact HR"
            response.data.message ===
            "L'email saisit n'existe pas dans la base de données, veuillez contacter votre service RH"
          ) {
            showToast(
              "info",
              "Cet Email n'existe pas",
              "Avez-vous renseigné votre Email professionnel ? Si oui veuillez contacter votre service des Ressources humaines"
            );
          }
          setData(null);
          setIsWaiting(false);
        } else {
          // if mail exists in DB and password ok, answer should contain user info (id, token)

          AsyncStorage.setItem("token", response.data.existingUser.token);
          AsyncStorage.setItem("userId", response.data.existingUser._id);

          setToken(response.data.token);
          setIsWaiting(false);
        }
      } catch (error) {
        // console.log("fall in catch");
        showToast(
          "error",
          "Avez-vous renseigné votre Email professionnel ?",
          "Si oui veuillez contacter votre service RH"
        );
        console.log(error.message);
        setIsWaiting(false);
        setData(null);
      }
    };
    fetchData();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.container_connect}>
        <Text style={styles.txt}>Je me connecte</Text>
        <View style={styles.inputContainer}>
          <TextInput
            inputMode="email"
            placeholder="Email"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <Image source={profile} style={styles.profileIco} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mot de passe"
            style={styles.input}
            value={password}
            secureTextEntry={showPassword ? false : true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          {showPassword ? (
            <Feather
              name="unlock"
              size={24}
              color="black"
              style={styles.lock}
              onPress={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <Feather
              name="lock"
              size={24}
              color="black"
              style={styles.lock}
              onPress={() => {
                setShowPassword(true);
              }}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          {/* If every fields are not filled in or request is waitong for answer, user
        cannot click on button "Entrer" */}

          {isWaiting || !password || !email ? (
            <View>
              <CustomPills
                feather
                end_icon="chevron-right"
                text="Entrer"
                type="disabled"
              />
            </View>
          ) : (
            <View>
              <CustomPills
                onPress={async (event) => {
                  handlePress(event);
                  // await AsyncStorage.setItem("token", "token");
                  // await AsyncStorage.setItem("userId", "id utilisateur");
                  // setToken("token");
                }}
                feather
                end_icon="chevron-right"
                text="Entrer"
                type="outlined"
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.linkContainer}>
        <CustomButton
          style="full_width"
          onPress={() => {
            navigation.navigate("SignUp01");
          }}
          feather
          end_icon="chevron-right"
          text="PREMIÈRE CONNEXION"
          type="textlight"
        />
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
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.primary,
    paddingTop: 200,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  container_connect: {
    // borderColor: "red",
    // borderWidth: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "white",
    fontSize: 24,
    marginBottom: 30,
    fontFamily: AppStyles.font.regular,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    height: 70,
    backgroundColor: "white",
    paddingLeft: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: AppStyles.color.border_subtle,
    fontSize: 16,
  },
  profileIco: {
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 1,
    bottom: 23,
    left: 15,
  },
  lock: {
    position: "absolute",
    zIndex: 1,
    bottom: 23,
    left: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  linkContainer: {
    marginBottom: 60,
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  // linkTxt: {
  //   fontSize: 16,
  //   color: "white",
  //   marginBottom: 1,
  //   fontFamily: AppStyles.font.regular,
  // },
  btn: {
    paddingVertical: 8,
    width: 100,
    borderRadius: 24,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inactive: {
    paddingVertical: 8,
    width: 100,
    borderRadius: 24,
    backgroundColor: "white",
    opacity: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  txtBtnR: {
    color: "#0A837E",
    fontSize: 18,
    paddingLeft: 7,
    marginBottom: 2,
  },
  toast: {
    marginTop: 200,
  },
});
