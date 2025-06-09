import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

const SignInForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        <View style={{ minHeight: 36}}>
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
        </View>

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />

        <View style={{ minHeight: 36}}>
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
        </View>

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A6AEBF',
    padding: 12,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#ffffff'
  },
  error: {
    color: '#d73a4a',
    marginTop: 8,
    marginBottom: 8,
  },
})

export default SignInForm;