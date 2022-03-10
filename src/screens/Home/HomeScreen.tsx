import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {switchLang} from '@redux/language/index';
import {RootState} from '../../store';
import translate from '../../helpers/translator';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen: React.FunctionComponent = (_): any => {
  const dispatch = useDispatch();

  const language = useSelector((state: RootState) => state.language);

  // useEffect(() => {
  //   (async () => {
  //     console.log('LANG', language);
  //   })();
  // }, [language]);

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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
