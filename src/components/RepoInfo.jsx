import { View, Text, StyleSheet } from "react-native";
import LangBadge from "./LanguageBadge";
import RepoImage from "./RepoImage";

const styles = StyleSheet.create({
  flexItem1: {
    flexDirection: "row",
    padding: 10,
  },
  flexItem2: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

const RepoInfo = ({ fullName, desc, img, lang }) => {
  return (
    <View style={styles.flexItem1}>
      <RepoImage url={img} />
      <View style={styles.flexItem2}>
        <Text style={styles.boldText}>{fullName}</Text>
        <Text>{desc}</Text>
        <LangBadge lang={lang} />
      </View>
    </View>
  );
};

export default RepoInfo;
