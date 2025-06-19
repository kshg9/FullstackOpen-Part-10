import { useQuery } from "@apollo/client"
import { useParams } from "react-router-native"
import { GET_REPOSITORY } from "../graphql/queries"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"

const SingleRepositoryView = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading the repository</Text>
  console.log(data)

  return <RepositoryItem item={data.repository} singleView />
}

export default SingleRepositoryView
