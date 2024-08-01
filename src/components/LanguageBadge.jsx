import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  language: {
    backgroundColor: "#0366d6",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 3,
    textAlign: "center",
  },
});

const LangBadge = ({ lang }) => {
  return (
    <View>
      <Text style={styles.language} color="white">
        {lang}
      </Text>
    </View>
  );
};

export default LangBadge;
