import { Alert, FlatList, StyleSheet, View } from 'react-native';
import useAuthentication from '../hooks/useAuthentication';
import ReviewItem from './ReviewItem';
import { useNavigate } from 'react-router-native';
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews = () => {
  const { me, loading, refetch } = useAuthentication(true);
  const navigate = useNavigate();
  const [, , deleteReview] = useReview();

  if (loading) return null;

  const reviews = me.reviews
    ? me.reviews.edges.map(edge => edge.node)
    : [];

  const onView = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const onDelete = (repositoryId) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL'
      },
      {
        text: 'DELETE',
        onPress: async () => {
          await deleteReview(repositoryId);
          refetch();
        }
      }
    ]);
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <ReviewItem
          rating={item.rating}
          title={item.repository.fullName}
          createdAt={item.createdAt}
          text={item.text}
          MyReviews={true}
          onView={() => onView(item.repository.id)}
          onDelete={() => onDelete(item.id)}
        />
      }
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;