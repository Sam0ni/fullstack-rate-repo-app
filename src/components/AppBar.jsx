import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row",
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
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab style={styles.text}>Repositories</AppBarTab>
        </Link>
        <Link to="/signin">
          <AppBarTab style={styles.text}>Sign In</AppBarTab>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
