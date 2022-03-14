/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '@common/colors';
import translate from '@helpers/translator';
import {isIos, windowWidth} from '@common/const';
import {Pages} from '@navigators/constants/allPages';
import TextInputCustom from '@components/TextInputCustom';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import CustomModal from '@components/CustomModal';
import {setAuthRoot} from '@navigators/roots';
import LoaderModal from '@components/LoaderModal';
import {RootState, store} from '../../store';
import {
  clearRegisterLoadingState,
  clearStatusState,
  registerRequest,
} from '@redux/auth/register';
import {DataUserItem, RegisterBodyProps} from '@interfaces/index';
import uid from '@helpers/uuidGenerator';
import {isEmpty} from 'ramda';

const RegisterScreen = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);
  const registerData = useSelector((state: RootState) => state.register);

  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  const [savedAccount, setSavedAccount] = useState(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [tempData, setTempData] = useState<DataUserItem>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  var bodyRequest: RegisterBodyProps = {};

  const onSaveRegister = async () => {
    setIsLoading(true);
    bodyRequest = {
      id: await uid(),
      groupId: [],
      email: email.toLowerCase(),
      firstName,
      lastName,
      password,
      jobTitle,
      imageUrl: '',
      confirmPassword,
    };
    setSavedAccount(true);
    if (isEmpty(tempData)) {
      setTempData(bodyRequest);
      dispatch(registerRequest(bodyRequest));
    } else {
      setTempData(bodyRequest);
      dispatch(registerRequest(tempData));
    }
  };

  const onPickImage = (val: any) => {
    setTempData(prevState => ({
      ...prevState,
      imageUrl: val?.assets[0]?.uri,
    }));
  };

  const onGoCreateGroup = () => {
    setVisibleModal(false);
    setTimeout(() => {
      Navigation.push(props.componentId, {
        component: {
          id: Pages.createGroupScreen.id,
          name: Pages.createGroupScreen.name,
          passProps: {
            params: tempData,
          },
        },
      });
    }, 500);
  };

  const onFinishRegister = () => {
    setVisibleModal(false);
    setTimeout(() => {
      setAuthRoot();
    }, 700);
  };

  useEffect(() => {
    if (registerData.status === 200) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setVisibleModal(true);
        }, 700);
      }, 1000);
      dispatch(clearStatusState());
    } else if (registerData.status === 403) {
      setIsLoading(false);
      if (isIos) {
        Alert.alert(
          translate(
            {
              en: 'Validation',
              id: 'Validasi',
            },
            language,
          ),
          registerData.message,
          [{text: 'OK', onPress: () => {}}],
        );
      } else {
        ToastAndroid.show(registerData.message, ToastAndroid.SHORT);
      }
      dispatch(clearRegisterLoadingState());
    }
  }, [registerData]);

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
  }, [email, firstName, lastName, password, jobTitle, tempData, bodyRequest]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={70}
      // behavior={isIos ? 'padding' : ''}
      style={styles.container}>
      <LoaderModal visible={isLoading} />
      {savedAccount ? (
        <ProfileScreen
          isParentScreen={false}
          data={tempData}
          getImagePicker={onPickImage}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <TextInputCustom
              title={'Email'}
              placeholder={'XXX@gmail.com'}
              autoCapitalize={'none'}
              onChange={setEmail}
              keyboardType="email-address"
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
              secureText={true}
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
              onChange={setConfirmPassword}
              secureText={true}
            />
            <View style={styles.inputSeparatorLG} />
            <TextInputCustom
              title={translate(
                {
                  en: 'Job Title',
                  id: 'Nama Tugas',
                },
                language,
              )}
              placeholder={translate(
                {
                  en: 'Job',
                  id: 'Tugas',
                },
                language,
              )}
              onChange={setJobTitle}
            />
          </ScrollView>
        </View>
      )}
      <CustomModal
        visible={visibleModal}
        title={translate(
          {
            en: 'Are you going to create group account?',
            id: 'Apakah kamu akan membuat grub akun?',
          },
          language,
        )}
        positiveBtnTitle={translate(
          {
            en: 'Yes, I do',
            id: 'Ya, tentu',
          },
          language,
        )}
        negativeBtnTitle={translate(
          {
            en: 'Skip',
            id: 'Lewati',
          },
          language,
        )}
        onPositiveClick={onGoCreateGroup}
        onNegativeClick={onFinishRegister}
      />
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
