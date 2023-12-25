import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
// AppStyles.js
import AppStyles from "../AppStyles";
// icons
import { Feather } from "@expo/vector-icons";

export default function HelpScreen() {
  // add/modify questions here
  const FAQList = [
    {
      question: "Question 1",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      question: "Question 2",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      question: "Question 3",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      question: "Question 4",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      question: "Question 5",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      question: "Question 6",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
  ];
  // add/modify themes here
  const helpList = [
    {
      theme: "Mes premiers pas",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      theme: "Envoyer un message",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
    {
      theme: "En savoir plus",
      detail:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est tempore nam, doloribus nobis voluptatum doloremque nisi dolores iure, ab aspernatur adipisci quidem, blanditiis repudiandae cupiditate alias repellendus voluptate dolore?",
    },
  ];

  // state for each question block
  const FAQstateList = [];
  for (let i = 0; i < FAQList.length; i++) {
    FAQstateList.push(false);
  }
  const [FaqState, setFaqState] = useState(FAQstateList);

  // state for each help block
  const themeStateList = [];
  for (let j = 0; j < helpList.length; j++) {
    themeStateList.push(false);
  }
  const [helpState, setHelpState] = useState(themeStateList);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Besoin d'aide</Text>
      <View style={styles.FAQcontainer}>
        {FAQList.map((item, index) => {
          return (
            <View style={styles.questionBlock} key={index}>
              <View style={styles.firstLine}>
                <Text>{item.question}</Text>
                {FaqState[index] ? (
                  <Feather
                    name="chevron-up"
                    size={20}
                    color="black"
                    onPress={() => {
                      const newFaqState = [...FaqState];
                      newFaqState.splice(index, 1, false);
                      setFaqState(newFaqState);
                    }}
                  />
                ) : (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color="black"
                    onPress={() => {
                      const newFaqState = [...FaqState];
                      newFaqState.splice(index, 1, true);
                      setFaqState(newFaqState);
                    }}
                  />
                )}
              </View>
              {FaqState[index] ? (
                <Text style={styles.content}>{item.detail}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
      <View style={styles.FAQcontainer}>
        {helpList.map((item, index) => {
          return (
            <View style={styles.questionBlock} key={index}>
              <View style={styles.firstLine}>
                <Text>{item.theme}</Text>
                {helpState[index] ? (
                  <Feather
                    name="chevron-up"
                    size={20}
                    color="black"
                    onPress={() => {
                      const newHelpState = [...helpState];
                      newHelpState.splice(index, 1, false);
                      setHelpState(newHelpState);
                    }}
                  />
                ) : (
                  <Feather
                    name="chevron-down"
                    size={20}
                    color="black"
                    onPress={() => {
                      const newHelpState = [...helpState];
                      newHelpState.splice(index, 1, true);
                      setHelpState(newHelpState);
                    }}
                  />
                )}
              </View>
              {helpState[index] ? (
                <Text style={styles.content}>{item.detail}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  FAQcontainer: {
    borderTopColor: AppStyles.color.border_subtle,
    borderTopWidth: 1,
    borderLeftColor: AppStyles.color.border_subtle,
    borderLeftWidth: 1,
    borderRightColor: AppStyles.color.border_subtle,
    borderRightWidth: 1,
    marginBottom: 30,
  },
  questionBlock: {
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 10,
  },
});
