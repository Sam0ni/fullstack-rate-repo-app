import Text from "./Text";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import { format, parse } from "date-fns";

const styles = StyleSheet.create({
  flexItem1: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  flexItem2: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    flexShrink: 1,
  },
  reviewScore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ReviewItem = ({ review }) => {
  const date = parse(
    review.node.createdAt,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    new Date()
  );
  return (
    <View style={styles.flexItem1}>
      <View style={styles.reviewScore}>
        <Text color="primary" fontWeight="bold">
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.flexItem2}>
        <Text fontWeight="bold">
          {review.node.repository
            ? review.node.repository.fullName
            : review.node.user.username}
        </Text>
        <Text color="textSecondary">{format(date, "dd-MM-yyyy")}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
