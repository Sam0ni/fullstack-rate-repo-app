import { View, StyleSheet } from "react-native";
import Text from "./Text";

const turnToKs = (val) => {
  if (val < 1000) {
    return val;
  } else if (!val) {
    return 0;
  }
  let KVal = String(val);
  if (val >= 100000) {
    KVal = `${KVal.slice(0, 3)}.${KVal[3]}k`;
  } else if (val >= 10000) {
    KVal = `${KVal.slice(0, 2)}.${KVal[2]}k`;
  } else {
    KVal = `${KVal.slice(0, 1)}.${KVal[1]}k`;
  }
  return KVal;
};

const styles = StyleSheet.create({
  flexItem1: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-evenly",
  },
  flexItem2: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10,
  },
});

const RepoStats = ({ stars, forks, reviews, ratings }) => {
  const allValues = [stars, forks, reviews, ratings];
  const KValues = allValues.map((v) => turnToKs(v));
  const valueNames = ["stars", "forks", "reviews", "ratings"];
  const valuesWithNames = KValues.map((v, i) => {
    return [valueNames[i], v];
  });

  return (
    <View>
      <View style={styles.flexItem1}>
        {valuesWithNames.map((value) => {
          return (
            <View key={value[0]} style={styles.flexItem2}>
              <Text fontWeight="bold">{value[1]}</Text>
              <Text>{value[0]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RepoStats;
