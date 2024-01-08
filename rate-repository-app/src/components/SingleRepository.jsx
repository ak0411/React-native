import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositoryById from '../hooks/useRepositoryById';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem showGithub repository={repository} />
      <ItemSeparator />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const repository = useRepositoryById(id);
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <ReviewItem
          rating={item.rating}
          title={item.user.username}
          createdAt={item.createdAt}
          text={item.text}
        />
      }
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;