import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id, first }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first,
    },
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
        id
      }
    })
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result
  }

}

export default useRepository;
