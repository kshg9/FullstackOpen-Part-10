import { useApolloClient } from "@apollo/client"
import useAuthStorage from "./useAuthStorage"

const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloclient = useApolloClient()

  return async () => {
    authStorage.removeAccessToken()
    apolloclient.resetStore()
  }
}

export default useSignOut
