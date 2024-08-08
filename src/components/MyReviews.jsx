import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  //console.log(data.me.reviews.edges);

  return (
    <FlatList
      ItemSeparatorComponent={ItemSeparator}
      data={data.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => {
        return item.node.id;
      }}
    ></FlatList>
  );
};

export default MyReviews;
