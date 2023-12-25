import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen02({ setToken }) {
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };

  const navigation = useNavigation();
  const route = useRoute();
  // Retrieving info from SignUp01 page
  const { email, name, firstname } = route.params;

  // password state
  const [password, setPassword] = useState("");
  // tests states
  // length state
  const [lengthSupThan8, setLengthSupThan8] = useState(false);
  // contains at least one Uppercase letter
  const [gotUpperCase, setGotUpperCase] = useState(false);
  const regexUpper = new RegExp("[A-Z]");
  // contains at least one Lowercase letter
  const [gotLowerCase, setGotLowerCase] = useState(false);
  const regexLower = new RegExp("[a-z]");
  // contains at least one digit
  const [gotDigit, setGotDigit] = useState(false);
  const regexDigit = new RegExp("[0-9]");
  // contains at least one special character
  const [gotSpecial, setGotSpecial] = useState(false);
  const regexSpecial = new RegExp("[#?!@$%^&*-]");

  // accepts CGV state
  const [acceptsConditions, setAcceptsConditions] = useState(false);

  // state to hide or show password
  const [showPassword, setShowPassword] = useState(false);

  // state to wait for request answer
  const [isWaiting, setIsWaiting] = useState(false);
  // data state
  const [data, setData] = useState();

  const handlePress = (event) => {
    event.preventDefault();
    // console.log("click");

    const fetchData = async () => {
      try {
        const response = await axios.put(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/signUp02`,
          {
            email: email,
            name: name,
            firstname: firstname,
            password: password,
          }
        );
        // console.log(response.data);
        setData(response.data);

        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userId", response.data._id);
        showToast(
          "success",
          `Bienvenue sur Actilib ${response.data.firstname}`,
          ""
        );
        setToken(response.data.token);
        setIsWaiting(false);
      } catch (error) {
        console.log(error.message);
        showToast(
          "error",
          `Nous sommes désolés`,
          "Votre inscription n'a pas pu aboutir, veuillez réessayer ultérieurement"
        );
      }
    };
    fetchData();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Première connexion</Text>
      <Text style={styles.subtitle}>Définissez votre mot de passe</Text>
      <View style={styles.password}>
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={showPassword ? false : true}
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            text.length >= 8
              ? setLengthSupThan8(true)
              : setLengthSupThan8(false);
            regexUpper.test(text)
              ? setGotUpperCase(true)
              : setGotUpperCase(false);
            regexLower.test(text)
              ? setGotLowerCase(true)
              : setGotLowerCase(false);
            regexDigit.test(text) ? setGotDigit(true) : setGotDigit(false);
            regexSpecial.test(text)
              ? setGotSpecial(true)
              : setGotSpecial(false);
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
      <View style={styles.regex}>
        {lengthSupThan8 ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : (
          <AntDesign name="closecircleo" size={20} color="black" />
        )}
        <Text style={styles.txt}>8 caractères minimums</Text>
      </View>
      <View style={styles.regex}>
        {gotUpperCase ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : (
          <AntDesign name="closecircleo" size={20} color="black" />
        )}
        <Text style={styles.txt}>Une majuscule</Text>
      </View>
      <View style={styles.regex}>
        {gotLowerCase ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : (
          <AntDesign name="closecircleo" size={20} color="black" />
        )}
        <Text style={styles.txt}>Une minuscule</Text>
      </View>
      <View style={styles.regex}>
        {gotDigit ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : (
          <AntDesign name="closecircleo" size={20} color="black" />
        )}
        <Text style={styles.txt}>Un chiffre</Text>
      </View>
      <View style={styles.regex}>
        {gotSpecial ? (
          <Feather name="check-circle" size={20} color="white" />
        ) : (
          <AntDesign name="closecircleo" size={20} color="black" />
        )}
        <Text style={styles.txt}>Un caractère spécial</Text>
      </View>

      <View style={styles.conditions}>
        {acceptsConditions ? (
          <Feather
            name="check-square"
            size={20}
            color="white"
            onPress={() => {
              setAcceptsConditions(false);
            }}
          />
        ) : (
          <Feather
            name="square"
            size={20}
            color="black"
            onPress={() => {
              setAcceptsConditions(true);
            }}
          />
        )}
        <View style={styles.paragraph}>
          <Text style={styles.txtParagraph}>J'accepte les </Text>
          <Text
            style={[styles.txtParagraph, styles.bold]}
            onPress={() => {
              navigation.navigate("CGVU");
            }}
          >
            CGV, CGU,
          </Text>
          <Text style={styles.txtParagraph}> et la </Text>
          <Text
            style={[styles.txtParagraph, styles.bold]}
            onPress={() => {
              navigation.navigate("ConfidentialData");
            }}
          >
            politique de confidentialité des données.
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CustomPills
          feather
          start_icon="chevron-left"
          text="Retour"
          type="outlined"
          onPress={() => {
            navigation.navigate("SignUp01");
          }}
        />

        {lengthSupThan8 &&
        gotUpperCase &&
        gotLowerCase &&
        gotDigit &&
        gotSpecial &&
        acceptsConditions &&
        !isWaiting ? (
          <CustomPills
            feather
            end_icon="chevron-right"
            text="Entrer"
            type="outlined"
            onPress={async (event) => {
              handlePress(event);
              // await AsyncStorage.setItem("token", "token");
              // await AsyncStorage.setItem("userId", "id utilisateur");
              // setToken("token");
            }}
          />
        ) : (
          <CustomPills
            feather
            end_icon="chevron-right"
            text="Entrer"
            type="disabled"
          />
        )}
      </View>
      <StatusBar style="auto" />
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
    backgroundColor: "#0A837E",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 150,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 60,
    textAlign: "center",
  },
  txt: {
    color: "white",
    fontSize: 16,

    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 20,
  },
  password: {
    position: "relative",
    marginBottom: 20,
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
  lock: {
    position: "absolute",
    zIndex: 1,
    bottom: 23,
    left: 15,
  },
  regex: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 17,
  },
  conditions: {
    flexDirection: "row",
    marginLeft: 17,
    marginTop: 20,
    gap: 10,
    alignItems: "center",
  },
  paragraph: {
    flexDirection: "row",
    flexWrap: "wrap",
    // borderWidth: 1,
    // borderColor: "red",
    paddingRight: 10,
    alignItems: "flex-start",
  },
  bold: {
    fontWeight: "bold",
  },
  txtParagraph: {
    color: "white",
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 40,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btn: {
    paddingVertical: 8,
    width: 100,
    borderRadius: 24,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  },
  txtBtnL: {
    color: "#0A837E",
    fontSize: 18,
    paddingRight: 7,
  },
  txtBtnR: {
    color: "#0A837E",
    fontSize: 18,
    paddingLeft: 7,
  },
  toast: {
    marginTop: 200,
  },
});
