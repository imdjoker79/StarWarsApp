import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@common/colors';
import {Navigation} from 'react-native-navigation';
import translate from '@helpers/translator';
import {RootState, store} from '../../store';
import {useSelector} from 'react-redux';
import {isIos, windowWidth} from '@common/const';
import {Pages} from '@navigators/constants/allPages';
import TextInputCustom from '@components/TextInputCustom';

const RegisterScreen = (props: any) => {
  const language = useSelector((state: RootState) => state.language);

  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();
  const [job, setJob] = useState<string>();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  useEffect(() => {
    // console.log(email);
    // console.log(firstName);
  }, [email, firstName]);

  useEffect(() => {
    const navigationButtonEventListener =
      Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'SAVE_REGISTER') {
            onSaveRegister();
          }
        },
      );
    return () => {
      navigationButtonEventListener.remove();
    };
  }, []);

  const onSaveRegister = () => {
    setVisibleModal(true);
  };

  const onGoCreateGroup = () => {
    setVisibleModal(false);
    setTimeout(() => {
      Navigation.push(props.componentId, {
        component: {
          id: Pages.createGroupScreen.id,
          name: Pages.createGroupScreen.name,
        },
      });
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={70}
      behavior={isIos ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TextInputCustom
          title={'Email'}
          placeholder={'XXX@gmail.com'}
          onChange={setEmail}
        />
        <View style={styles.inputSeparatorLG} />
        <TextInputCustom
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
        <TextInputCustom
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
        <TextInputCustom
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
        <TextInputCustom
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
        <TextInputCustom
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

      <Modal visible={visibleModal} transparent={true}>
        <View style={{...styles.modal}}>
          <View style={styles.modalContent}>
            <Text style={{...styles.textTitle, fontSize: 18}}>
              {translate(
                {
                  en: 'Are you going to create group account?',
                  id: 'Apakah kamu akan membuat grub akun?',
                },
                language,
              )}
            </Text>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.btnYes} onPress={onGoCreateGroup}>
              <Text style={{...styles.textTitle, color: Colors.white}}>
                {translate(
                  {
                    en: 'Yes, I do',
                    id: 'Ya, tentu',
                  },
                  language,
                )}
              </Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity
              style={styles.btnSkip}
              onPress={() => setVisibleModal(false)}>
              <Text style={{...styles.textTitle, color: Colors.primary}}>
                {translate(
                  {
                    en: 'Skip',
                    id: 'Lewati',
                  },
                  language,
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

RegisterScreen.options = () => ({
  topBar: {
    rightButtons: [
      {
        id: 'SAVE_REGISTER',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: windowWidth - 40,
    backgroundColor: Colors.white,
    shadowColor: Colors.darkGray,
    elevation: 0.5,
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  btnYes: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.green,
  },
  btnSkip: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.primary,
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  spacer: {
    marginVertical: 10,
  },
});
