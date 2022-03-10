import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {switchLang} from '@redux/language/index';
import {RootState, store} from '../../store';
import translate from '../../helpers/translator';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getPlatformTabsIcon} from '../../navigators/helpers/navigationIconHelpers';
import {SFSymbols} from '../../assets/symbols/SFSymbols';
import {Navigation} from 'react-native-navigation';

const HomeScreen = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      bottomTab: {
        text: translate(
          {
            en: 'Home',
            id: 'Beranda',
          },
          language,
        ),
      },
    });
  }, [language, props.componentId]);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 16, padding: 20}}>
        {translate(
          {
            en: 'ENGLISH',
            id: 'INDONESIA',
          },
          language,
        )}
      </Text>
      <Button
        onPress={() => {
          dispatch(switchLang({code: 'en', name: 'English'}));
        }}
        title="EN"
      />
      <Button
        onPress={() => {
          dispatch(switchLang({code: 'id', name: 'Indonesia'}));
        }}
        title="ID"
      />
    </View>
  );
};

HomeScreen.options = () => ({
  topBar: {
    rightButtons: [
      {
        id: 'save',
        text: 'Save',
        color: Colors.primary,
      },
    ],
    title: {
      text: translate(
        {
          en: 'Home',
          id: 'Beranda',
        },
        store.getState().language,
      ),
    },
  },
  bottomTab: {
    text: translate(
      {
        en: 'Home',
        id: 'Beranda',
      },
      store.getState().language,
    ),
    ...getPlatformTabsIcon(SFSymbols.house, SFSymbols['house.fill'], 'home'),
  },
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
