import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { formatDateString } from '../utils/formatter';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
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
  },
  actionContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flexGrow: 1
  }
});

const ReviewItem = ({ rating, title, createdAt, text, MyReviews = false, onView, onDelete }) => {

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText} fontWeight='bold' color='primary'>{rating}</Text>
        </View>
        <View style={styles.content}>
          <Text fontSize='subheading' fontWeight='bold'>{title}</Text>
          <Text color='textSecondary'>{formatDateString(createdAt)}</Text>
          {text && <Text>{text}</Text>}
        </View>
      </View>
      {MyReviews &&
        <View style={styles.actionContainer}>
          <Button
            label='View repository'
            onSubmit={onView}
            style={styles.button} />
          <Button
            label='Delete review'
            onSubmit={onDelete}
            style={{ ...styles.button, backgroundColor: theme.colors.error }}
          />
        </View>
      }
    </View>
  );
};

export default ReviewItem;