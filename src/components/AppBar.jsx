import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    // ...
  },
  text: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab textStyle={styles.text}>Repositories</AppBarTab>
    </View>
  );
};

export default AppBar;
