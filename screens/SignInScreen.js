import * as Yup from 'yup';
import React, { useState } from 'react';
import Form from '../components/expo-form-starter/Form';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import {firebase} from '../utils/firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const RegisterScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState('');
  
  async function handleOnSubmit(values) {
    const { email, password, confirmPassword } = values;

    if (confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        setSignInError(error.message);
      });
    }
    else{
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        setSignInError(error.message);
      });
    }
    if (signInError == '') navigation.navigate("ScheduleScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container2}>
        <Form
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleOnSubmit(values)}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button title={values => values.confirmPassword ? "Sign Up" : "Log In"}/>
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ccccb3',
  },
  container2: {
      width: 250,
  },
  field: {
      height: 40,
      width: 0,
      padding: 5,
      backgroundColor: 'white',
  },
  fieldContainer: {
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
  },
  label: {
      fontWeight: 'bold',
  }
});

export default RegisterScreen;