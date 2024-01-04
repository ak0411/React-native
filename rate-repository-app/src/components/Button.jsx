import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
  }
});

const Button = ({ onSubmit, label }) => {
  return (
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text style={styles.text} fontWeight='bold'>{label}</Text>
    </Pressable>
  );
};

export default Button;