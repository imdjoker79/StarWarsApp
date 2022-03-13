import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Colors} from '@common/colors';
import {setAuthRoot} from '@navigators/roots';
import translate from '../../helpers/translator';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {setTabsRoot} from '../../navigators/roots';
import {isEmpty} from 'ramda';

const SplashScreen: NavigationFunctionComponent = () => {
  const language = useSelector((state: RootState) => state.language);
  const authData = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isEmpty(authData.data)) {
      setTimeout(() => {
        setTabsRoot();
      }, 2000);
    } else {
      setTimeout(() => {
        setAuthRoot();
      }, 2000);
    }
  }, [authData]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {translate(
          {
            en: 'WELCOME',
            id: 'SELAMAT DATANG',
          },
          language,
        )}
      </Text>
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
