import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link, useNavigate } from "react-router-native";
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
  const navigate = useNavigate();
  const signOutAndRedirect = async () => {
    await signOut();
    navigate("/");
  };
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
        {data.me == null && (
          <Link to="/signup">
            <AppBarTab style={styles.text}>Sign Up</AppBarTab>
          </Link>
        )}
        {data.me != null && (
          <Link to="/review">
            <AppBarTab style={styles.text}>Create a review</AppBarTab>
          </Link>
        )}
        {data.me != null && (
          <Link to="/myreviews">
            <AppBarTab style={styles.text}>My reviews</AppBarTab>
          </Link>
        )}
        {data.me != null && (
          <Pressable onPress={signOutAndRedirect}>
            <AppBarTab style={styles.text}>Sign out</AppBarTab>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
