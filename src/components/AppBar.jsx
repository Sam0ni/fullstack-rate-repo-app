import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";

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
  const { loading, data } = useQuery(GET_ME);
  const signOut = useSignOut();
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab style={styles.text}>Repositories</AppBarTab>
        </Link>
        {data.me == null && (
          <Link to="/signin">
            <AppBarTab style={styles.text}>Sign In</AppBarTab>
          </Link>
        )}
        {data.me != null && (
          <Link to="/review">
            <AppBarTab style={styles.text}>Create a review</AppBarTab>
          </Link>
        )}
        {data.me != null && (
          <Pressable onPress={signOut}>
            <AppBarTab style={styles.text}>Sign out</AppBarTab>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
