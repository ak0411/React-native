import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10
  },
  error: {
    borderColor: theme.colors.error
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.inputField, error && styles.error ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;