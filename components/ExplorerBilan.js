import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BilanScreen from "../screens/BilanScreen.js";
import TestScreen from "../screens/TestScreen.js";
import DetailsScreen from "../screens/DetailsScreen.js";

// AppStyles.js
import AppStyles from "../AppStyles.js";

const TabTop = createMaterialTopTabNavigator();

const ExplorerBilan = () => {
  const toptabBarOptions = {
    tabBarStyle: {
      backgroundColor: "#fff",
      width: "80%",
      shadowOpacity: 0,
      elevation: 0,
      marginTop: 15,
      borderBottomWidth: 1,
      borderColor: AppStyles.color.border_subtle,
      alignSelf: "center",
    },
    tabBarLabelStyle: { fontSize: 14, textTransform: "none" },
    tabBarActiveTintColor: AppStyles.color.accent,
    tabBarInactiveTintColor: "black",
    tabBarIndicatorStyle: {
      backgroundColor: AppStyles.color.accent,
      height: 3,
      borderBottomWidth: 0,
      marginBottom: -1,
    },
  };

  return (
    <TabTop.Navigator screenOptions={toptabBarOptions}>
      <TabTop.Screen
        name="Bilan"
        // component={BilanScreen}
        options={{ tabBarLabel: "Bilan" }}
      >
        {(props) => <BilanScreen {...props} />}
      </TabTop.Screen>
      <TabTop.Screen
        name="Test"
        // component={TestScreen}
        options={{ tabBarLabel: "Test" }}
      >
        {(props) => <TestScreen {...props} />}
      </TabTop.Screen>
      <TabTop.Screen
        name="Details"
        // component={DetailsScreen}
        options={{ tabBarLabel: "Détails" }}
      >
        {(props) => <DetailsScreen {...props} />}
      </TabTop.Screen>
    </TabTop.Navigator>
  );
};

export default ExplorerBilan;
