import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 10
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
  infoContainer: {
    flexGrow: 1,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5
  },
  languageTag: {
    color: '#ffffff',
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingBottom: 10
  }
});

const formatNumber = (number) => {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber}k`;
  }
  return number.toString();
};

const RepoInfo = ({ avatarUrl, fullName, description, language }) => (
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{ uri: avatarUrl }}
      />
    </View>
    <View style={styles.infoContainer}>
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

const RepositoryItem = ({ repository }) => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <RepoInfo
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
    </View>
  );
};

export default RepositoryItem;