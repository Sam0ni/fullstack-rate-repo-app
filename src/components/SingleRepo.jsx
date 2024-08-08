import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
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

const SingleRepo = () => {
  const { repositoryId } = useParams();

  const { repository, loading } = useRepository(repositoryId);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => {
        return item.node.id;
      }}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepo;
