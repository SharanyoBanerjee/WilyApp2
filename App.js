import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TransactionScreen from "./screens/BookTrs";
import SearchScreen from "./screens/SearchScreen";
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Transaction: TransactionScreen,
    Search: SearchScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === "Transaction") {
          return (
            <Image
              source={require("./assets/book.png")}
              style={{ height: 40, width: 40 }}
            ></Image>
          );
        } else if (routeName === "Search") {
          return (
            <Image
              source={require("./assets/searchingbook.png")}
              style={{ height: 40, width: 40 }}
            ></Image>
          );
        }
      },
    }),
  }
);
const AppContainer = createAppContainer(TabNavigator);
