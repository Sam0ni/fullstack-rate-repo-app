import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  language: {
    backgroundColor: "#0366d6",
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 3,
    textAlign: "center",
    color: "white",
  },
});

const LangBadge = ({ lang }) => {
  return (
    <View>
      <Text style={styles.language}>{lang}</Text>
    </View>
  );
};

export default LangBadge;
