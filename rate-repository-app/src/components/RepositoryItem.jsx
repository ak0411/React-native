import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { formatNumber } from '../utils/formatter';
import * as Linking from 'expo-linking';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  infoContainer: {
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  languageTag: {
    color: 'white',
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingVertical: 10,
  }
});

const RepositoryHeader = ({ avatarUrl, fullName, description, language }) => (
  <View style={styles.infoContainer}>
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{ uri: avatarUrl }}
      />
    </View>
    <View style={{ flexShrink: 1 }}>
      <Text fontWeight='bold' fontSize='subheading'>{fullName}</Text>
      <Text color='textSecondary'>{description}</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.languageTag}>{language}</Text>
      </View>
    </View>
  </View>
);

const StatText = ({ value, label }) => (
  <View style={{ alignItems: 'center' }}>
    <Text fontWeight='bold' fontSize='subheading'>{formatNumber(value)}</Text>
    <Text color='textSecondary'>{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showGithub = false }) => {
  if (!repository) {
    return null;
  }

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryHeader
        avatarUrl={repository.ownerAvatarUrl}
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
      />
      <View style={styles.statsContainer}>
        <StatText value={repository.stargazersCount} label='Stars' />
        <StatText value={repository.forksCount} label='Forks' />
        <StatText value={repository.reviewCount} label='Reviews' />
        <StatText value={repository.ratingAverage} label='Rating' />
      </View>
      {showGithub &&
        <Button label='Open in GitHub' onSubmit={() => Linking.openURL(repository.url)}/>
      }
    </View>
  );
};

export default RepositoryItem;