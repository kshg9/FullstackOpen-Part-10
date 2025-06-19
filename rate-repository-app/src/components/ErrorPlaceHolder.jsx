import { StyleSheet, View } from "react-native";
import Text from "./Text";

const ErrorPlaceHolder = ({ formikHandler, field }) => {
  const { touched, errors } = formikHandler
  return <View style={{ minHeight: 36 }}>
    {touched[field] && errors[field] && (
      <Text style={styles.error}>{errors[field]}</Text>
    )}
  </View>;
}

const styles = StyleSheet.create({
  error: {
    color: '#d73a4a',
    marginTop: 8,
    marginBottom: 8,
  },
})

export default ErrorPlaceHolder
