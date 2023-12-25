import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import axios from "axios";
import { useState, useEffect } from "react";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressChart } from "react-native-chart-kit";
import { Feather } from "@expo/vector-icons";

export default function BilanScreen() {
  // at the moment there is no key in User model for TestList type array of Objects containing Test data
  // there is no route either to add a test in user data

  // when key will be created , useEffect will search for data in user's appropriate key
  // if there is no data radar chart will be empty,
  // otherwise it will display last test results

  // is loading state
  const [isLoading, setIsLoading] = useState(false); // <<<<< change to true when ready
  // received data state
  const [data, setData] = useState();
  // last test data, empty object if user never did the test before
  const [lastTestData, setLastTestData] = useState();
  // if lastTestData exists get values and labels from it
  let labelList = [];
  let valueList = [];
  if (lastTestData) {
    // considering lastTestData is an object with key/values like this {"Gestion du stress": 20, "Confiance en soi": 30, ...}
    labelList = Object.keys(lastTestData);
    valueList = Object.values(lastTestData);
  } else {
    labelList = [
      "Épanouissement    ",
      "Confiance en soi",
      "Performance cognitive",
      "Maîtrise des émotions",
      "Créativité",
      "Renforcement physique",
      "Relations interpersonnelles",
      "Gestion du stress",
    ];
    valueList = [50, 60, 30, 50, 30, 70, 40, 80]; // <<<<<< SET TO 0 !!!
  }
  // for radar chart
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  let dataRadar = [];
  for (let i = 0; i < labelList.length; i++) {
    let obj = {};
    obj["label"] = labelList[i];
    obj["value"] = valueList[i];
    dataRadar.push(obj);
  }
  // console.log(dataRadar);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");
  //       // get all data from user
  //       const response = await axios.get(
  //         `https://site--actilib-backend--wpz9hk24xnmf.code.run/user/${userId}`
  //       );
  //       // console.log(JSON.stringify(response.data.user, null, 2));
  //       setData(response.data.user);
  //       // if there is something in testList key in user set last index of list in lastTestData
  //       if (response.data.user.testList.length > 0) {
  //         setLastTestData(
  //           response.data.user.testList[response.data.user.testList.length - 1]
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  //   setIsLoading(false);
  // }, []);

  const valueTest = 30;

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={AppStyles.color.primary} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.radarContainer}>
        <RadarChart
          data={dataRadar}
          gradientColor={{
            startColor: AppStyles.color.primary,
            endColor: "#edfffe",
            count: 5,
          }}
          stroke={[
            AppStyles.color.primary_background,
            AppStyles.color.primary_background,
            AppStyles.color.primary_background,
            AppStyles.color.primary_background,
            AppStyles.color.primary,
          ]}
          strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
          strokeOpacity={[1, 1, 1, 1, 0.13]}
          labelColor={AppStyles.color.primary}
          labelSize={10}
          dataFillColor={AppStyles.color.primary}
          dataFillOpacity={0.8}
          dataStroke={AppStyles.color.accent}
          dataStrokeWidth={2}
          isCircle
        />
      </SafeAreaView>
      {lastTestData ? (
        <CustomButton
          style="full_width"
          onPress={() => {
            navigation.navigate("Test");
          }}
          feather
          end_icon="chevron-right"
          text="Refaire le test"
          type="solid"
        />
      ) : (
        <CustomButton
          style="full_width"
          onPress={() => {
            navigation.navigate("Test");
          }}
          feather
          end_icon="chevron-right"
          text="Faire le test"
          type="solid"
        />
      )}

      <View style={styles.otherCharts}>
        {dataRadar.map((obj, index) => {
          return (
            <TouchableOpacity
              style={styles.caracteristicContainer}
              key={index}
              onPress={() => {
                navigation.navigate("Details", { label: obj.label });
              }}
            >
              <ProgressChart
                data={{ data: [obj.value === 0 ? obj.value : obj.value / 100] }}
                width={100}
                height={100}
                strokeWidth={16}
                radius={32}
                chartConfig={{
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(10, 132, 126, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    // borderRadius: 16,
                  },
                }}
                hideLegend={true}
              />
              <Text style={styles.ringChartValue}>{`${obj.value}%`}</Text>
              <View style={styles.ringChartInfos}>
                <Text style={styles.ringChartLabel} numberOfLines={1}>
                  {obj.label}
                </Text>
                <Text style={styles.ringChartTxt} numberOfLines={3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  maiores!
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={AppStyles.color.text_subtle}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 30,
  },
  loadingContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radarContainer: {
    marginBottom: 20,
  },
  otherCharts: {
    marginTop: 10,
    paddingTop: 20,
  },
  caracteristicContainer: {
    borderBottomColor: AppStyles.color.border_subtle,
    borderBottomWidth: 1,
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  ringChartValue: {
    position: "absolute",
    left: 40,
    top: 40,
    fontWeight: "bold",
  },
  ringChartInfos: {
    flex: 1,
  },
  ringChartLabel: {
    fontSize: 16,
  },
  ringChartTxt: {
    fontSize: 15,
    color: AppStyles.color.text_subtle,
  },
});
