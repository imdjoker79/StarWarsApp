import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../common/colors';
import {Navigation} from 'react-native-navigation';
import translate from '../../helpers/translator';
import {RootState, store} from '../../store';
import RegisterInput from './components/RegisterInput';
import {useSelector} from 'react-redux';
import {isIos} from '../../common/const';
import {Header} from 'react-native/Libraries/NewAppScreen';

const RegisterScreen = () => {
  const language = useSelector((state: RootState) => state.language);

  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();
  const [job, setJob] = useState<string>();

  useEffect(() => {
    // console.log(email);
    // console.log(firstName);
  }, [email, firstName]);

  useEffect(() => {
    const navigationButtonEventListener =
      Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          console.log(buttonId);
        },
      );
    return () => {
      navigationButtonEventListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={70}
      behavior={isIos ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <RegisterInput
          title={'Email'}
          placeholder={'XXX@gmail.com'}
          onChange={setEmail}
        />
        <View style={styles.inputSeparatorLG} />
        <RegisterInput
          title={translate(
            {
              en: 'First Name',
              id: 'Nama Depan',
            },
            language,
          )}
          placeholder={translate(
            {
              en: 'First Name',
              id: 'Nama Depan',
            },
            language,
          )}
          onChange={setFirstName}
        />
        <View style={styles.inputSeparatorSM} />
        <RegisterInput
          title={translate(
            {
              en: 'Last Name',
              id: 'Nama Belakang',
            },
            language,
          )}
          placeholder={translate(
            {
              en: 'Last Name',
              id: 'Nama Belakang',
            },
            language,
          )}
          onChange={setLastName}
        />
        <View style={styles.inputSeparatorLG} />
        <RegisterInput
          title={translate(
            {
              en: 'Password',
              id: 'Kata Sandi',
            },
            language,
          )}
          placeholder={translate(
            {
              en: 'Password',
              id: 'Kata Sandi',
            },
            language,
          )}
          onChange={setPassword}
        />
        <View style={styles.inputSeparatorSM} />
        <RegisterInput
          title={translate(
            {
              en: 'Confirm Password',
              id: 'Konfirmasi Sandi',
            },
            language,
          )}
          placeholder={translate(
            {
              en: 'Confirm Password',
              id: 'Konfirmasi Sandi',
            },
            language,
          )}
          onChange={setConfPassword}
        />
        <View style={styles.inputSeparatorLG} />
        <RegisterInput
          title={translate(
            {
              en: 'Job Title',
              id: 'Nama Pekerjaan',
            },
            language,
          )}
          placeholder={translate(
            {
              en: 'Job',
              id: 'Pekerjaan',
            },
            language,
          )}
          onChange={setJob}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

RegisterScreen.options = () => ({
  topBar: {
    rightButtons: [
      {
        id: 'save',
        text: translate(
          {
            en: 'Save',
            id: 'Simpan',
          },
          store.getState().language,
        ),
        color: Colors.primary,
      },
    ],
    title: {
      text: translate(
        {
          en: 'Create user account',
          id: 'Buat akun pengguna',
        },
        store.getState().language,
      ),
    },
  },
});

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSeparatorLG: {
    marginVertical: 20,
  },
  inputSeparatorSM: {
    marginVertical: 0.5,
  },
});
