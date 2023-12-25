import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function ConfidentialDataScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confidentialité</Text>
      <ScrollView style={styles.textArea}>
        <Text style={styles.subtitle}>
          Politique de confidentialité des données de l'utilisateur des services
          Actilib
        </Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          nemo neque cumque placeat sequi, officiis odit voluptates esse
          pariatur, tenetur debitis nihil quod quisquam dolores eligendi. Ex
          tempora dolor ipsum? Quibusdam vel fuga, hic distinctio commodi
          inventore vitae tenetur ullam quisquam iure sequi aut placeat quia
          temporibus voluptates accusamus illo amet eaque maiores, numquam ipsam
          officia corporis ratione.{"\n"}
          {"\n"}
          Repellendus, odit. Libero at labore ex quos. Voluptatum dolore
          obcaecati, soluta odit esse atque repudiandae nihil quas quis sapiente
          quasi error eveniet blanditiis perferendis a temporibus ducimus id
          reiciendis, aliquam totam asperiores. Alias dolorum ut atque
          perspiciatis beatae nostrum facere libero! Soluta, libero! Sint eius
          dolorem dolore.{"\n"}
          {"\n"}
          Dolore labore reprehenderit vero a! Nobis enim hic dicta beatae
          voluptas ea debitis magni id. Tenetur nostrum ullam ipsam
          voluptatibus, vero adipisci laborum, dolorem nesciunt velit rerum
          architecto totam? Officiis, facere porro, repellat odio maxime
          necessitatibus in aut aspernatur nemo, praesentium debitis possimus.
          Sapiente, deserunt! Facilis, iste?{"\n"}
          {"\n"}
          Cumque placeat, aut atque voluptates exercitationem quidem. Suscipit
          dolores dicta voluptatibus similique natus earum itaque sed doloribus,
          eos ducimus, cum cupiditate placeat, vel quo quisquam odit? Minus,
          fugit. Voluptatibus excepturi sed facere commodi optio dolores fugiat
          libero architecto, velit tenetur iusto molestiae voluptates nobis
          natus fugit non eos, ex in consectetur! Voluptatibus ullam ipsam, amet
          repellendus voluptatem provident.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 8,
    padding: 10,
  },
  content: {
    color: "#767676",
    lineHeight: 20,
    fontSize: 16,
  },
});
