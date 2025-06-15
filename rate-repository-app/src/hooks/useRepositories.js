import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return { repositories: [], loading };
  }

  if (error) {
    console.error(error);
    throw error;
  }

  const repositoryNodes = data.repositories.edges.map(edge => edge.node);

  return { repositories: repositoryNodes, loading: false };
};

export default useRepositories;
