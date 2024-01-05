import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ filter, setFilter, search, setSearch }) => {

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        style={{ backgroundColor: 'white' }}
        placeholder="search"
        onChangeText={(value) => setSearch(value)}
        value={search}
      />

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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, setFilter, search, setSearch } = this.props;
    return (
      <RepositoryListHeader
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);

  const { repositories } = useRepositories(filter, searchKeyword);

  return <RepositoryListContainer
    repositories={repositories}
    filter={filter}
    setFilter={setFilter}
    search={search}
    setSearch={setSearch}
  />;
};

export default RepositoryList;