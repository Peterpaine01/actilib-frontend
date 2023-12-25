import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FutureEventScreen from "../screens/FutureEventScreen";
import PastEventScreen from "../screens/PastEventScreen";
import CalendarScreen from "../screens/CalendarScreen";

import AppStyles from "../AppStyles";

const TabTop = createMaterialTopTabNavigator();

const Seances = () => {
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
        name="Upcoming"
        component={FutureEventScreen}
        options={{ tabBarLabel: "À venir" }}
      />
      <TabTop.Screen
        name="Past"
        component={PastEventScreen}
        options={{ tabBarLabel: "Passés" }}
      />
      <TabTop.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ tabBarLabel: "Calendrier" }}
      />
    </TabTop.Navigator>
  );
};
export default Seances;
