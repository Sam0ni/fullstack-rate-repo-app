import { View, StyleSheet } from "react-native";
import RepoInfo from "./RepoInfo";
import RepoStats from "./RepoStats";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    backgroundColor: "white",
  },
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
    </View>
  );
};

export default RepositoryItem;
