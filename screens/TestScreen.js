import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import brain from "../assets/test/brain.png";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import useFocusEffect from "@react-navigation/native";
import AppStyles from "../AppStyles";

export default function TestScreen() {
  const navigation = useNavigation();

  // display submission button
  const [displaySubmit, setDisplaySubmit] = useState(false);
  // list of state for every question
  const [stateList, setStateList] = useState([]);
  // list of state of answer values for every question
  const [answerValues, setAnswerValues] = useState([]);
  // restart state to erase all answers
  const [restart, setRestart] = useState(false);

  const questionsList = [
    { question: "Vous vous faites régulièrement de nouveaux amis." },
    {
      question:
        "Vous passez une grande partie de votre temps libre à explorer divers sujets qui vous intéressent.",
    },
    { question: "Vous prévoyez souvent un plan B et un plan C." },
    {
      question: "Vous restez généralement calme, même sous une forte pression.",
    },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
    { question: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
  ];

  // create a state for each question to display them, first one is active
  const newStateList = [];
  for (let i = 0; i < questionsList.length; i++) {
    if (i === 0) {
      newStateList.push(true);
    } else {
      newStateList.push(false);
    }
  }
  // create a state for each question for answers, at start they are all null
  const newAnswerValuesList = [];
  for (let j = 0; j < questionsList.length; j++) {
    newAnswerValuesList.push(null);
  }

  useEffect(() => {
    setDisplaySubmit(false);
    setStateList(newStateList);
    setAnswerValues(newAnswerValuesList);
  }, [restart]);

  // Pressing on "soummettre le questionnaire" button should send an object with answerValues to an API for result calculations
  // results are then stored as an object in user key testList (not created ATM)
  // const handleSubmit = async () => {

  // }

  // console.log(stateList);
  // console.log(answerValues);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quelle activité est faite pour toi ?</Text>
      <View style={styles.pictureContainer}>
        <Image source={brain} style={styles.picture} />
        <View style={styles.btnContainer}>
          {displaySubmit ? (
            <CustomButton
              style="full_width"
              onPress={() => {
                // handleSubmit()
                navigation.navigate("Bilan");
              }}
              text="Soummettre le questionnaire"
              type="solid"
            />
          ) : (
            <CustomButton
              style="full_width"
              onPress={() => {}}
              text="Soummettre le questionnaire"
              type="disabled"
            />
          )}
        </View>
      </View>
      {/* Questionnaire starts here */}
      <View style={styles.testContainer}>
        {questionsList.map((quest, index) => {
          return (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{quest.question}</Text>
              <View style={styles.circlesContainer}>
                <Text style={styles.ok}>D'accord</Text>
                <TouchableOpacity
                  style={[styles.large, styles.green]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = 100;
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === 100 && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.medium, styles.green]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = Math.ceil(500 / 6);
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === Math.ceil(500 / 6) && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.small, styles.green]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = Math.ceil(400 / 6);
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === Math.ceil(400 / 6) && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tiny, styles.grey]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = Math.ceil(300 / 6);
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === Math.ceil(300 / 6) && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.small, styles.grey]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = Math.ceil(200 / 6);
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === Math.ceil(200 / 6) && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.medium, styles.grey]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = Math.ceil(100 / 6);
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === Math.ceil(100 / 6) && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.large, styles.grey]}
                  onPress={() => {
                    const answerList = [...answerValues];
                    answerList[index] = 0;
                    setAnswerValues(answerList);
                    const otherStateList = [...stateList];
                    otherStateList[index] = true;
                    setStateList(otherStateList);
                    if (stateList.length === index + 1) {
                      setDisplaySubmit(true);
                    }
                  }}
                >
                  {answerValues[index] === 0 && (
                    <View style={styles.inside}></View>
                  )}
                </TouchableOpacity>
                <Text style={styles.notOk}>Pas d'accord</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.resetBtn}>
        <CustomButton
          style="full_width"
          onPress={() => {
            setRestart(!restart);
          }}
          text="Effacer les réponses"
          type="solid"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 30,
  },
  nav: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  pictureContainer: {
    position: "relative",
  },
  picture: {
    width: "100%",
  },
  btnContainer: {
    position: "absolute",
    bottom: -20,
    paddingHorizontal: 50,
    width: "100%",
  },
  testContainer: {
    marginTop: 35,
    marginHorizontal: 30,
  },
  questionContainer: {
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  questionTitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  circlesContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  medium: {
    height: 17,
    width: 17,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  small: {
    height: 14,
    width: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  tiny: {
    height: 11,
    width: 11,
    borderRadius: 5.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  inside: {
    width: "80%",
    height: "80%",
    backgroundColor: AppStyles.color.primary,
    borderRadius: 10,
  },
  green: {
    borderColor: AppStyles.color.primary,
  },
  grey: {
    borderColor: AppStyles.color.border_normal,
  },
  ok: {
    fontSize: 10,
    color: AppStyles.color.primary,
    width: 50,
  },
  notOk: {
    fontSize: 10,
    color: AppStyles.color.border_normal,
    width: 50,
    textAlign: "center",
  },
  resetBtn: {
    paddingHorizontal: 30,
    marginVertical: 30,
  },
});
