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
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignUpScreen01() {
  const navigation = useNavigation();

  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  // email state
  const [email, setEmail] = useState("");
  // name state
  const [name, setName] = useState("");
  // firstname state
  const [firstname, setFirstname] = useState("");
  // state to wait for request answer
  const [isWaiting, setIsWaiting] = useState(false);
  // data state
  const [data, setData] = useState();

  // "Suivant" button is accessible when all fields are filled-in
  // On press a request is sent to check is mail exists in DB
  // if yes, user navigates whith params to signUp02
  // otherwise toast is sent to tell user to enter pro Email or contact HR

  const handlePress = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      // console.log(email);
      try {
        // start request, user cannot click on button for now
        // setIsWaiting(true);
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/signUp01`,
          {
            email: email,
          }
        );
        // console.log(response.data);
        setData(response.data);
        // if invalid email
        response.data.errors &&
          showToast(
            "error",
            "Email invalide",
            "Veuillez renseigner votre Email professionnel"
          );
        // if mail does not exist in DB, answer message "contact HR"
        response.data.message ===
          "Aucun compte n'existe avec cet email, veuillez contacter votre service RH" &&
          showToast(
            "info",
            "Avez-vous renseigné votre Email professionnel ?",
            "Si oui veuillez contacter votre service des Ressources humaines"
          );
        // otherwise if email exists
        if (
          response.data.message ===
          "L'email est présent dans la base de données, accédez à la création de mot de passe"
        ) {
          setIsWaiting(false);
          navigation.navigate("SignUp02", {
            email: email,
            name: name,
            firstname: firstname,
          });
        }
      } catch (error) {
        // console.log("fell in catch");
        console.log(error.message);
        if (error.message === "Request failed with status code 500") {
          showToast(
            "info",
            "Avez-vous renseigné votre Email professionnel ?",
            "Si oui veuillez contacter votre service des Ressources humaines"
          );
        }
      }
    };
    fetchData();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.txt}>Première connexion</Text>
      <Text style={styles.subtitle}>Bienvenue chez nous</Text>
      <View style={styles.inputContainer}>
        <TextInput
          inputMode="email"
          autoCapitalize="none"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Feather name="mail" size={24} color="black" style={styles.mail} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <Image source={profile} style={styles.profileIco} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={firstname}
          onChangeText={(text) => {
            setFirstname(text);
          }}
        />
        <Image source={profile} style={styles.profileIco} />
      </View>
      <View style={styles.btnContainer}>
        {/* If every fields are not filled in or request is waitong for answer, user
        cannot click on button "Entrer" */}
        {isWaiting || !name || !email || !firstname ? (
          <View>
            <CustomPills
              feather
              end_icon="chevron-right"
              text="Suivant"
              type="disabled"
            />
          </View>
        ) : (
          <View>
            <CustomPills
              onPress={(event) => {
                handlePress(event);
                // navigation.navigate("SignUp02", {
                //   email: email,
                //   name: name,
                //   firstname: firstname,
                // });
              }}
              feather
              end_icon="chevron-right"
              text="Suivant"
              type="outlined"
            />
          </View>
        )}
      </View>

      <View style={styles.linkContainer}>
        <CustomButton
          style="full_width"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          feather
          end_icon="chevron-right"
          text="VOUS AVEZ DÉJÀ UN COMPTE"
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
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#0A837E",
    paddingTop: 120,
    paddingHorizontal: 30,
  },
  txt: {
    color: "white",
    fontSize: 24,
    marginBottom: 60,
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 20,
  },
  link: {
    textAlign: "center",
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
    borderColor: "#AAAAAA",
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  mail: {
    position: "absolute",
    zIndex: 1,
    bottom: 23,
    left: 15,
  },
  linkContainer: {
    marginTop: 30,
    width: "100%",
  },
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
