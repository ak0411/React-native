import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    color: 'white'
  }
});

const AppBarTab = ({ title, to, onPress }) => {
  return (
    <Link to={to} style={styles.container} onPress={onPress}>
      <Text style={styles.text} fontSize='subheading' fontWeight='bold'>{title}</Text>
    </Link>
  );
};

export default AppBarTab;