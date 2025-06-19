import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import ErrorPlaceHolder from './ErrorPlaceHolder';
import Text from './Text';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  text: yup.string().optional(),
});

const getInputStyle = (formikHandler, field) => [
  styles.input,
  formikHandler.touched[field] && formikHandler.errors[field] && styles.inputErrorBorder,
];

const ReviewForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <TextInput style={[styles.input, getInputStyle(onSubmit, "ownerName")]} placeholder="Repository owner name" onChangeText={onSubmit.handleChange('ownerName')} value={onSubmit.values.ownerName} />
    {<ErrorPlaceHolder formikHandler={onSubmit} field={'ownerName'} />}

    <TextInput style={[styles.input, getInputStyle(onSubmit, "repositoryName")]} placeholder="Repository name" onChangeText={onSubmit.handleChange('repositoryName')} value={onSubmit.values.repositoryName} />
    {<ErrorPlaceHolder formikHandler={onSubmit} field={'repositoryName'} />}

    <TextInput style={[styles.input, getInputStyle(onSubmit, "rating")]} placeholder="Rating (0-100)" onChangeText={onSubmit.handleChange('rating')} value={onSubmit.values.rating} keyboardType="numeric" />
    {<ErrorPlaceHolder formikHandler={onSubmit} field={'rating'} />}

    <TextInput style={[styles.input, getInputStyle(onSubmit, "text")]} placeholder="Review" onChangeText={onSubmit.handleChange('text')} value={onSubmit.values.text} multiline />
    {<ErrorPlaceHolder formikHandler={onSubmit} field={'text'} />}

    <Pressable style={styles.button} onPress={onSubmit.handleSubmit}>
      <Text color="textSecondary" fontWeight="bold">Create a review</Text>
    </Pressable>
  </View>
);

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const ratingValue = Number(rating)

    try {
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: ratingValue,
          text
        }
      })
      navigate(`/repository/${data.createReview.repositoryId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {(props) => <ReviewForm onSubmit={props} />}
    </Formik>
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
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default CreateReview
