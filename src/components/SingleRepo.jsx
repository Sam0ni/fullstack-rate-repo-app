import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
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
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem
      fullName={repository.fullName}
      desc={repository.description}
      lang={repository.language}
      forks={repository.forksCount}
      stars={repository.stargazersCount}
      rating={repository.ratingAverage}
      reviews={repository.reviewCount}
      img={repository.ownerAvatarUrl}
      url={repository.url}
    />
  );
};

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
        <Text fontWeight="bold">{review.node.user.username}</Text>
        <Text color="textSecondary">{format(date, "dd-MM-yyyy")}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  );
};

const SingleRepo = () => {
  const { repositoryId } = useParams();
  console.log(repositoryId);

  const { repository, loading } = useRepository(repositoryId);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(repository);

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepo;
