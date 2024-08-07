import { View, StyleSheet, Pressable } from "react-native";
import RepoInfo from "./RepoInfo";
import RepoStats from "./RepoStats";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    backgroundColor: "white",
  },
  button: theme.button,
});

const RepositoryItem = ({
  fullName,
  desc,
  lang,
  forks,
  stars,
  rating,
  reviews,
  img,
  url,
}) => {
  return (
    <View style={styles.flexContainer} testID="repositoryItem">
      <RepoInfo fullName={fullName} desc={desc} lang={lang} img={img} />
      <RepoStats
        forks={forks}
        stars={stars}
        ratings={rating}
        reviews={reviews}
      />
      {url && (
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log(url);
            Linking.openURL(url);
          }}
        >
          <Text fontWeight="bold" color="white" style={{ textAlign: "center" }}>
            Open In Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
