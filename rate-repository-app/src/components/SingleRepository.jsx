import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositoryById from '../hooks/useRepositoryById';
import { FlatList, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { formatDateString } from '../utils/formatter';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem showGithub repository={repository} />
      <ItemSeparator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
  },
  contentContainer: {
    flexDirection: 'row'
  },
  rating: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    marginRight: 10
  },
  content: {
    flexShrink: 1,
  },
  ratingText: {
    textAlign: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText} fontWeight='bold' color='primary'>{review.rating}</Text>
        </View>
        <View style={styles.content}>
          <Text fontSize='subheading' fontWeight='bold'>{review.user.username}</Text>
          <Text color='textSecondary'>{formatDateString(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

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
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;