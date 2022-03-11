import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import translate from '@helpers/translator';
import {Colors} from '@common/colors';
import {RootState, store} from '../../store';
import {useSelector} from 'react-redux';

const InviteMember = () => {
  const language = useSelector((state: RootState) => state.language);
  const [email, setEmail] = useState<string>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email address to invite</Text>
      <View style={styles.spacer} />
      <TextInput
        placeholder={translate(
          {
            en: 'Email address',
            id: 'Alamat email',
          },
          language,
        )}
        style={styles.textInput}
        onChangeText={setEmail}
      />
    </View>
  );
};

InviteMember.options = () => ({
  topBar: {
    title: {
      text: translate(
        {
          en: 'Invite member',
          id: 'Undang anggota',
        },
        store.getState().language,
      ),
    },
  },
});

export default InviteMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: '600',
    color: Colors.darkGray,
  },
  spacer: {
    marginTop: 10,
  },
  textInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
