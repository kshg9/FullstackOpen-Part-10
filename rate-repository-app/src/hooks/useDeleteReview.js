import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: ['UserInfo']
  })

  const deleteReview = async (id) => {
    return await mutate({ variables: { id } })
  }

  return [deleteReview, result]
}

export default useDeleteReview
