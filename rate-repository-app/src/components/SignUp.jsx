import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import ErrorPlaceHolder from "./ErrorPlaceHolder";
import Text from "./Text";

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
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
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password fields must match')
    .required('Password confirmation is required'),
})

const getInputStyle = (formikHandler, field) => [
  styles.input,
  formikHandler.touched[field] && formikHandler.errors[field] && styles.inputErrorBorder,
];

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      await signIn(values);
    } catch (e) {
      console.error('Sign-in failed:', e);
    }
  }

  return <SignUpForm onSubmit={onSubmit} />;
}

export const SignUpForm = ({ onSubmit }) => {
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

      <TextInput
        style={[styles.input, getInputStyle(formik, 'passwordConfirm')]}
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        testID="passwordConfirmField"
      />
      {<ErrorPlaceHolder formikHandler={formik} field={'passwordConfirm'} />}

      <Pressable style={styles.button} onPress={formik.handleSubmit} testID="submitButton">
        <Text color={"textSecondary"} fontWeight={'bold'}>Sign Up</Text>
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

export default SignUp;
