import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, header }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      ListHeaderComponent={header}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem
              fullName={item.fullName}
              desc={item.description}
              lang={item.language}
              forks={item.forksCount}
              stars={item.stargazersCount}
              rating={item.ratingAverage}
              reviews={item.reviewCount}
              img={item.ownerAvatarUrl}
            />
          </Pressable>
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 500);
  const { repositories } = useRepositories(filter, value);

  const header = (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setKeyword}
        value={keyword}
      />
      <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );

  return (
    <RepositoryListContainer repositories={repositories} header={header} />
  );
};

export default RepositoryList;
