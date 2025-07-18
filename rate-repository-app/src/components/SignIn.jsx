import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import ErrorPlaceHolder from "./ErrorPlaceHolder";
import Text from "./Text";

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 6 characters long')
    .max(50, 'Password must be at most 50 characters long'),
})

const getInputStyle = (formikHandler, field) => [
  styles.input,
  formikHandler.touched[field] && formikHandler.errors[field] && styles.inputErrorBorder,
];


const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.error('Sign-in failed:', e);
    }
  }

  return <SignInForm onSubmit={onSubmit} />;
}

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, getInputStyle(formik, 'username')]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        testID="usernameField"
      />
      {<ErrorPlaceHolder formikHandler={formik} field={'username'} />}

      <TextInput
        style={[styles.input, getInputStyle(formik, 'password')]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        testID="passwordField"
      />
      {<ErrorPlaceHolder formikHandler={formik} field={'password'} />}

      <Pressable style={styles.button} onPress={formik.handleSubmit} testID="submitButton">
        <Text color={"textSecondary"} fontWeight={'bold'}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A6AEBF',
    padding: 12,
    borderRadius: 5,
  },
  inputErrorBorder: {
    borderColor: '#d73a4a',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  error: {
    color: '#d73a4a',
    marginTop: 8,
    marginBottom: 8,
  },
})

export default SignIn;
