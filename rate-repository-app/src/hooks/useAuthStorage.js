import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

/**
 * @returns {import('../components/utils/authStorage').default}
 */
const useAuthStorage = () => {
  return useContext(AuthStorageContext)
}

export default useAuthStorage
