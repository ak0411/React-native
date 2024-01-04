import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositoryById from '../hooks/useRepositoryById';

const Repository = () => {
  const { id } = useParams();
  const repository = useRepositoryById(id);

  return (
    <RepositoryItem showGithub={true} repository={repository} />
  );
};

export default Repository;