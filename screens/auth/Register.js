import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginSchemaA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('Email must be provided.'),
  password: Yup.string()
    .required('Password must be provided.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/,
      'Password must be at least 6 characters long and contain at least one number, one uppercase and one special character.',
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirm password must be provided')
          .oneOf([Yup.ref('password')], 'Passwords must match.')
      : field,
  ),
});

const Register = ({navigation}) => {
  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../assets/images/download.png')}
        />

        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
          validationSchema={LoginSchemaA}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            console.log(values);
            setSubmitting(true);
            auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(() => {
                console.log('User account created & signed in!');
              })
              .catch(error => {
                Alert.alert(error['message']);
              });
            setSubmitting(false);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    errors.email && touched.email ? 'red' : '#cccccc',
                }}
                placeholder="E-mail"
                placeholderTextColor="#aaaaaa"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values?.email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    errors.password && touched.password ? 'red' : '#cccccc',
                }}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values?.password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    errors.confirmPassword && touched.confirmPassword
                      ? 'red'
                      : '#cccccc',
                }}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values?.confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonTitle}>Create account</Text>
                {isSubmitting && (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{marginLeft: 12}}
                  />
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '35%',
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 220,
    resizeMode: 'contain',
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000000',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
