import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    color: '#ffffff'
  }
});

const AppBarTab = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text} fontSize='subheading' fontWeight='bold'>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;