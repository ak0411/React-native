import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      marginVertical: 20
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      padding: 15,
    },
    inputField: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      marginTop: 20
    }
  });

  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.inputField} name='username' placeholder='Username' />
      <FormikTextInput style={styles.inputField} name='password' placeholder='Password' secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText} fontWeight='bold'>Sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be greater or equal to 3')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be greater or equal to 5')
    .required('Password is required')
});

export const SignInContainer = ({ onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;