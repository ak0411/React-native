import { StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { Formik } from 'formik';
import Button from './Button';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating (0 - 100)' />
      <FormikTextInput name='text' placeholder='Review text (Optional)' multiline />
      <Button label='Submit' onSubmit={onSubmit} />
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(1, 'Owner name must be greater or equal to 1')
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .min(1, 'Repository name must be greater or equal to 1')
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
    .max(300, 'Text limit is 300')
});

export const ReviewContainer = ({ onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

const Review = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await createReview(values);
      console.log(data);
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;