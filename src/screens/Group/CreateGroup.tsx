import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import translate from '@helpers/translator';
import {Colors} from '@common/colors';
import {RootState, store} from '../../store';
import {isIos, windowWidth} from '@common/const';
import TextInputCustom from '@components/TextInputCustom';
import {Navigation} from 'react-native-navigation';
import {Pages} from '@navigators/constants/allPages';
import GroupMemberItem from '../../components/GroupMemberItem';
import {DataUserItem} from '../../interfaces';

const CreateGroup = (props: any) => {
  const language = useSelector((state: RootState) => state.language);

  const [groupName, setGroupName] = useState<string>();
  const [descriptionGroup, setDescriptionGroup] = useState<string>();

  const [data] = useState<DataUserItem[]>([
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  ]);

  const onInvitMember = () => {
    Navigation.push(props.componentId, {
      component: {
        id: Pages.inviteMemberScreen.id,
        name: Pages.inviteMemberScreen.name,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={70}
      behavior={isIos ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.avatarContainer, styles.spacer]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarPlaceholder}>GM</Text>
          </View>
          <Text style={styles.userName}>Group Name</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInputCustom
            title={translate(
              {
                en: 'Group name',
                id: 'Nama group',
              },
              language,
            )}
            placeholder={translate(
              {
                en: 'Group name',
                id: 'Nama group',
              },
              language,
            )}
            onChange={setGroupName}
          />
          <View style={styles.descriptionGroup}>
            <View style={styles.headerSection}>
              <Text style={styles.sectionTitle}>
                {translate(
                  {
                    en: 'Description',
                    id: 'Deskripsi',
                  },
                  language,
                )}
              </Text>
              <Entypo
                name={'chevron-thin-right'}
                size={15}
                color={Colors.darkGray}
              />
            </View>
            <TextInput
              style={styles.inputDescription}
              placeholder={translate(
                {
                  en: 'Group Description',
                  id: 'Deskripsi Grub',
                },
                language,
              )}
              multiline={true}
              numberOfLines={4}
              onChangeText={setDescriptionGroup}
            />
          </View>

          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={onInvitMember}
              style={styles.headerSection}>
              <Text style={{...styles.sectionTitle, color: Colors.primary}}>
                {translate(
                  {
                    en: 'Invite member',
                    id: 'Undang anggota',
                  },
                  language,
                )}
              </Text>
              <Entypo
                name={'chevron-thin-right'}
                size={15}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.listUserContainer}>
            {data.map((e: DataUserItem, index: number) => (
              <GroupMemberItem
                key={index}
                firstName={e.firstName}
                lastName={e.lastName}
                imageUrl={e.imageUrl}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateGroup.options = () => ({
  topBar: {
    rightButtons: [
      {
        id: 'SAVE_CREATE_GROUP',
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
          en: 'Create group account',
          id: 'Buat grub pengguna',
        },
        store.getState().language,
      ),
    },
  },
});

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listUserContainer: {
    marginTop: 1,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 6,
    height: windowWidth / 6,
    borderRadius: windowWidth / 12,
    backgroundColor: Colors.blueEgg,
  },
  avatarPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.darkGray,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  spacer: {
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputDescription: {
    marginTop: 1,
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
  },
  descriptionGroup: {
    marginTop: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontWeight: '500',
    color: Colors.darkGray,
  },
});
