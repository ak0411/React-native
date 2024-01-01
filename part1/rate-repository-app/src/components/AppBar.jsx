import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  }
});

const AppBar = ({ title }) => {
  return (
    <View style={styles.container}>
      <AppBarTab title={title} onPress={() => console.log('pressed')}/>
    </View>
  );
};

export default AppBar;