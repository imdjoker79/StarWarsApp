import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@common/colors';
import {windowWidth} from '@common/const';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Pages} from '@navigators/constants/allPages';
import {Navigation} from 'react-native-navigation';
import {switchLang} from '@redux/language';
import translate from '@helpers/translator';
import {Switch} from 'react-native-switch';
import {setTabsRoot} from '@navigators/roots';

const LoginScreen = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);

  const [lang, setLang] = useState<boolean>(language.code === 'id');
  const [email, setEmail] = useState<string>('');

  const onLogin = () => {
    setTabsRoot();
  };

  const onGoRegister = () => {
    Navigation.push(props.componentId, {
      component: {
        id: Pages.registerScreen.id,
        name: Pages.registerScreen.name,
      },
    });
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
        />

        <TextInput
          placeholder={translate(
            {
              en: 'Password',
              id: 'Kata Sandi',
            },
            language,
          )}
          onChangeText={setEmail}
          style={styles.textInput}
        />

        <TouchableOpacity style={styles.btnLogin}>
          <Text
            style={{...styles.textTitle, color: Colors.white}}
            onPress={onLogin}>
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
                en: 'You don`t have your account?',
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
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.darkGray,
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
