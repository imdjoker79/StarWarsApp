import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {isEmpty} from 'ramda';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-switch';

import {Colors} from '@common/colors';
import {windowWidth} from '@common/const';
import {RootState} from '../../store';
import {Pages} from '@navigators/constants/allPages';
import {Navigation} from 'react-native-navigation';
import {switchLang} from '@redux/language';
import {setTabsRoot} from '@navigators/roots';
import {authRequest, clearAuthState} from '@redux/auth/login';
import {AuthProps} from '@interfaces/index';
import LoaderModal from '@components/LoaderModal';
import translate from '@helpers/translator';

const LoginScreen = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);
  const authData = useSelector((state: RootState) => state.auth);

  const [lang, setLang] = useState<boolean>(language.code === 'id');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = () => {
    setIsLoading(true);
    let bodyRequest: AuthProps = {
      email,
      password,
    };
    dispatch(authRequest(bodyRequest));
  };

  const onGoRegister = () => {
    Navigation.push(props.componentId, {
      component: {
        id: Pages.registerScreen.id,
        name: Pages.registerScreen.name,
        // id: Pages.createGroupScreen.id,
        // name: Pages.createGroupScreen.name,
        // passProps: {
        //   params: 'Params',
        // },
      },
    });
  };

  useEffect(() => {
    if (!isEmpty(authData.data)) {
      setTimeout(() => {
        setIsLoading(authData.isLoading!);
        setTabsRoot();
      }, 2000);
    } else if (authData.status === 403) {
      setTimeout(() => {
        setIsLoading(authData.isLoading!);
        showErrorMessage();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);

  const showErrorMessage = () => {
    Alert.alert(
      translate(
        {
          en: 'Authentication',
          id: 'Auntentikasi',
        },
        language,
      ),
      authData.error,
      [{text: 'OK', onPress: () => {}}],
    );
    dispatch(clearAuthState());
  };

  useEffect(() => {
    dispatch(
      switchLang(
        lang ? {code: 'id', name: 'Indonesia'} : {code: 'en', name: 'English'},
      ),
    );
  }, [dispatch, lang]);

  return (
    <View style={styles.container}>
      <LoaderModal visible={isLoading} />
      <View style={styles.langSetting}>
        <Switch
          value={lang}
          onValueChange={setLang}
          disabled={false}
          activeTextStyle={{color: Colors.darkGray}}
          inactiveTextStyle={{color: Colors.darkGray}}
          activeText={'ID'}
          inActiveText={'EN'}
          backgroundActive={Colors.white}
          backgroundInactive={Colors.white}
          circleActiveColor={Colors.primary}
          circleInActiveColor={Colors.primary}
        />
      </View>
      <Text style={styles.headerTitle}>StarWars App</Text>
      <View style={styles.card}>
        <TextInput
          placeholder={translate(
            {
              en: 'Your e-mail address',
              id: 'Alamat e-mail kamu',
            },
            language,
          )}
          onChangeText={setEmail}
          style={styles.textInput}
          autoCapitalize={'none'}
          keyboardType="email-address"
        />

        <TextInput
          placeholder={translate(
            {
              en: 'Password',
              id: 'Kata Sandi',
            },
            language,
          )}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
          <Text style={{...styles.textTitle, color: Colors.white}}>
            {translate(
              {
                en: 'LOGIN',
                id: 'MASUK',
              },
              language,
            )}
          </Text>
        </TouchableOpacity>

        <View style={styles.spacerSm}>
          <TouchableOpacity style={styles.btnForgot}>
            <Text style={{...styles.textTitle, color: Colors.primary}}>
              {translate(
                {
                  en: 'Forget Password',
                  id: 'Lupa Kata Sandi',
                },
                language,
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, styles.spacerSm]} />

        <View style={styles.spacerSm}>
          <Text
            style={{
              ...styles.textTitle,
            }}>
            {translate(
              {
                en: "You don't have your account?",
                id: 'Kamu belum punya akun?',
              },
              language,
            )}
          </Text>
        </View>

        <TouchableOpacity onPress={onGoRegister} style={styles.btnRegister}>
          <Text style={{...styles.textTitle, color: Colors.white}}>
            {translate(
              {
                en: 'Create a new account',
                id: 'Buat akun baru',
              },
              language,
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  langSetting: {
    top: 30,
    right: 30,
    position: 'absolute',
  },
  headerTitle: {
    top: windowWidth / 6,
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  spacerLg: {
    marginVertical: 30,
  },
  spacerSm: {
    marginVertical: 10,
  },
  card: {
    padding: 20,
    elevation: 1,
    borderRadius: 10,
    shadowOpacity: 0.2,
    width: windowWidth - 40,
    backgroundColor: Colors.white,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    marginBottom: 15,
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  btnLogin: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  btnForgot: {},
  btnRegister: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.green,
  },
});
