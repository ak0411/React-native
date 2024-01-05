import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Sorter = ({ filter, setFilter }) => {
  return (
    <View style={{ padding: 10 }}>
      <Picker
        selectedValue={filter}
        onValueChange={(value) => setFilter(value)}>
        <Picker.Item label="Latest repositories" value='latest' />
        <Picker.Item label="Highest rated repositories" value='highest' />
        <Picker.Item label="Lowest rated repositories" value='lowest' />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, filter, setFilter }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      }
      ListHeaderComponent={() => <Sorter filter={filter} setFilter={setFilter} />}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');
  const { repositories } = useRepositories(filter);

  return <RepositoryListContainer repositories={repositories} filter={filter} setFilter={setFilter} />;
};

export default RepositoryList;