import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ListScreen from "../screens/ListScreen.js";
import FavsScreen from "../screens/FavsScreen.js";
import MapScreen from "../screens/MapScreen.js";

// AppStyles.js
import AppStyles from "../AppStyles.js";

const TabTop = createMaterialTopTabNavigator();

const Explorer = () => {
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
      <TabTop.Screen name="List" options={{ tabBarLabel: "Liste" }}>
        {(props) => <ListScreen {...props} />}
      </TabTop.Screen>
      <TabTop.Screen name="Map" options={{ tabBarLabel: "Carte" }}>
        {(props) => <MapScreen {...props} />}
      </TabTop.Screen>
      <TabTop.Screen name="Favs" options={{ tabBarLabel: "Favoris" }}>
        {(props) => <FavsScreen {...props} />}
      </TabTop.Screen>
    </TabTop.Navigator>
  );
};

export default Explorer;
