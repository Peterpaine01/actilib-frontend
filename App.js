import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// AppStyles.js
import AppStyles from "./AppStyles";

const ActilibTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
  font: {
    ...DefaultTheme.font,
    regular: "Inter_400Regular",
  },
};

// Components import
import LogoTitle from "./components/LogoTitle.js";
import LogoProfile from "./components/LogoProfile.js";
import HeaderBack from "./components/HeaderBack.js";
import HeaderBackToProfileAndRefresh from "./components/HeaderBackToProfileAndRefresh.js";
import HeaderBackToHome from "./components/HeaderBackToHome.js";
import Explorer from "./components/Explorer.js";
import ExplorerBilan from "./components/ExplorerBilan";
import Seances from "./components/Seances";

// Screen imports
import SignInScreen from "./screens/SignInScreen.js";
import SignUpScreen01 from "./screens/SignUpScreen01.js";
import SignUpScreen02 from "./screens/SignUpScreen02.js";
import CGVUScreen from "./screens/CGVUScreen.js";
import ConfidentialDataScreen from "./screens/ConfidentialDataScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import SearchScreen from "./screens/SearchScreen.js";
import PastEventScreen from "./screens/PastEventScreen.js";
import FutureEventScreen from "./screens/FutureEventScreen.js";
import CalendarScreen from "./screens/CalendarScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import LandingScreen from "./screens/LandingScreen.js";
import ActivityScreen from "./screens/ActivityScreen.js";
import PartnerScreen from "./screens/PartnerScreen.js";
import BookingScreen from "./screens/BookingScreen.js";
import EditProfileScreen from "./screens/EditProfileScreen.js";
import SubscriptionScreen from "./screens/SubscriptionScreen.js";
import SettingsScreen from "./screens/SettingsScreen.js";
import ModifyPasswordScreen from "./screens/ModifyPasswordScreen";
import HelpScreen from "./screens/HelpScreen.js";
import AddressScreen from "./screens/AddressScreen.js";

// FONTS > npx expo install expo-font @expo-google-fonts/inter
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_100Thin,
} from "@expo-google-fonts/inter";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  //TOKEN
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("token");

      // This will switch to the App screen or Auth screen and this loading screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  //FONTS
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_100Thin,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <NavigationContainer theme={ActilibTheme}>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user is not signed in yet in this part
          <>
            <Stack.Screen name="Landing" options={{ headerShown: false }}>
              {() => <LandingScreen />}
            </Stack.Screen>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp01" options={{ headerShown: false }}>
              {() => <SignUpScreen01 />}
            </Stack.Screen>
            <Stack.Screen name="SignUp02" options={{ headerShown: false }}>
              {(props) => <SignUpScreen02 {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="CGVU"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <CGVUScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="ConfidentialData"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <ConfidentialDataScreen />}
            </Stack.Screen>
          </>
        ) : (
          // Here User is Signed-in
          <>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#0A837E",
                    tabBarInactiveTintColor: "black",
                    tabBarStyle: {
                      backgroundColor: "#fff",
                      shadowOpacity: 0,
                      borderTopWidth: 1,
                      borderColor: AppStyles.color.border_subtle,
                    },
                    tabBarIndicatorStyle: {
                      backgroundColor: AppStyles.color.primary,
                      borderTopWidth: 3,
                      marginTop: -1,
                    },
                  }}
                >
                  {/* HOME SCREEN */}
                  {/* HOME SCREEN */}
                  {/* HOME SCREEN */}
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      tabBarLabel: "Accueil",
                      tabBarIcon: ({ color, size }) => (
                        <Feather name={"home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        >
                          {(props) => <HomeScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  {/* EXPLORER SCREEN */}
                  {/* EXPLORER SCREEN */}
                  {/* EXPLORER SCREEN */}
                  <Tab.Screen
                    name="TabExplorer"
                    options={{
                      tabBarLabel: "Explorer",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"search-outline"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator initialRouteName="Explorer">
                        <Stack.Screen
                          name="Explorer"
                          component={Explorer}
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        >
                          {/* {(props) => <ListScreen {...props} />} */}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  {/* BILAN SCREEN */}
                  {/* BILAN SCREEN */}
                  {/* BILAN SCREEN */}
                  <Tab.Screen
                    name="TabBilan"
                    options={{
                      tabBarLabel: "Bilan",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                          name={"signal-cellular-alt"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator initialRouteName="ExplorerBilan">
                        <Stack.Screen
                          name="ExplorerBilan"
                          component={ExplorerBilan}
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  {/* EVENT SCREEN */}
                  {/* EVENT SCREEN */}
                  {/* EVENT SCREEN */}
                  <Tab.Screen
                    name="TabEvent"
                    options={{
                      tabBarLabel: "Séances",
                      tabBarIcon: ({ color, size }) => (
                        <Feather name={"calendar"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator initialRouteName="Seances">
                        <Stack.Screen
                          name="UpcomingEvent"
                          component={Seances}
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        >
                          {/* {() => <FutureEventScreen />} */}
                        </Stack.Screen>
                        <Stack.Screen
                          name="PastEvent"
                          // component={Seances}
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        >
                          {() => <PastEventScreen />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Calendar"
                          // component={Seances}
                          options={{
                            headerStyle: {
                              backgroundColor: "white",
                            },
                            headerTitleAlign: "center",
                            headerRight: (props) => <LogoProfile {...props} />,
                            headerTitle: (props) => <LogoTitle {...props} />,
                            headerShadowVisible: false,
                          }}
                        >
                          {() => <CalendarScreen />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>

            {/* PROFILE SCREENS */}
            {/* PROFILE SCREENS */}
            {/* PROFILE SCREENS */}
            <Stack.Screen
              name="Profile"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => <HeaderBackToHome {...props} />,
                headerBackVisible: false,
              }}
            >
              {(props) => <ProfileScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="EditProfile"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => (
                  <HeaderBackToProfileAndRefresh {...props} />
                ),
                headerBackVisible: false,
              }}
            >
              {(props) => <EditProfileScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Subscription"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => (
                  <HeaderBackToProfileAndRefresh {...props} />
                ),
                headerBackVisible: false,
              }}
            >
              {(props) => <SubscriptionScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Settings"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => (
                  <HeaderBackToProfileAndRefresh {...props} />
                ),
                headerBackVisible: false,
              }}
            >
              {(props) => <SettingsScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="CGVUbis"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <CGVUScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="ConfidentialDatabis"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <ConfidentialDataScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="ModifyPassword"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <ModifyPasswordScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="Help"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <HelpScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="Address"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {() => <AddressScreen />}
            </Stack.Screen>

            {/* ACTIVITY SCREEN */}
            <Stack.Screen
              name="Activity"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerRight: (props) => <LogoProfile {...props} />,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {(props) => <ActivityScreen {...props} />}
            </Stack.Screen>

            {/* SEARCH LIST SCREEN */}
            <Stack.Screen
              name="Search"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerRight: (props) => <LogoProfile {...props} />,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {(props) => <SearchScreen {...props} />}
            </Stack.Screen>

            {/* PARTNER SCREEN */}
            <Stack.Screen
              name="Partner"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerRight: (props) => <LogoProfile {...props} />,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {(props) => <PartnerScreen {...props} />}
            </Stack.Screen>
            {/* BOOKING SCREEN */}
            <Stack.Screen
              name="Booking"
              options={{
                headerStyle: {
                  backgroundColor: "white",
                },
                headerTitleAlign: "center",
                headerRight: (props) => <LogoProfile {...props} />,
                headerTitle: (props) => <LogoTitle {...props} />,
                headerShadowVisible: false,
                headerLeft: (props) => <HeaderBack {...props} />,
                headerBackVisible: false,
              }}
            >
              {(props) => <BookingScreen {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: AppStyles.color.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
