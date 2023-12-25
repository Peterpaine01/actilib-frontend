import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// AppStyles.js
import AppStyles from "../AppStyles";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réglages</Text>
      <Text style={[styles.bold, styles.green, styles.tall]}>Activités</Text>
      <Text
        style={styles.medium}
        onPress={() => {
          navigation.navigate("Address");
        }}
      >
        Mes adresses
      </Text>
      <Text style={[styles.medium, styles.grey]}>
        Demander l'ajout d'un lieu
      </Text>

      <Text style={[styles.bold, styles.green, styles.tall]}>Paiement</Text>
      <Text style={[styles.medium, styles.grey]}>Moyen de paiement</Text>
      <Text style={[styles.medium, styles.grey]}>Mes reçus</Text>

      <Text style={[styles.bold, styles.green, styles.tall]}>Autres</Text>
      <Text
        style={styles.medium}
        onPress={() => {
          navigation.navigate("CGVUbis");
        }}
      >
        CGU / CGV
      </Text>
      <Text
        style={styles.medium}
        onPress={() => {
          navigation.navigate("Help");
        }}
      >
        Besoin d'aide
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tall: {
    fontSize: 20,
  },
  medium: {
    fontSize: 18,
    marginBottom: 20,
  },
  green: {
    color: AppStyles.color.primary,
    marginBottom: 20,
    marginTop: 10,
  },
  bold: {
    fontWeight: 700,
  },
  grey: {
    color: AppStyles.color.border_subtle,
  },
});
