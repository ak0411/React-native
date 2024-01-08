import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthentication from '../hooks/useAuthentication';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { me, signOut } = useAuthentication();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to='/' title='Repositories' />
        {me
          ? <>
            <AppBarTab to='/review' title='Create a review' />
            <AppBarTab to='/myreviews' title='My reviews' />
            <AppBarTab to='/' title='Sign out' onPress={signOut}/>
          </>
          : <>
            <AppBarTab to='/signin' title='Sign in' />
            <AppBarTab to='/signup' title='Sign up' />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;