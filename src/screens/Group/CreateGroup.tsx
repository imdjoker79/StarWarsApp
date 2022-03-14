import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import translate from '@helpers/translator';
import {Colors} from '@common/colors';
import {isIos, windowWidth} from '@common/const';
import TextInputCustom from '@components/TextInputCustom';
import {Navigation} from 'react-native-navigation';
import GroupMemberItem from '@components/GroupMemberItem';
import {RootState, store} from '../../store';
import {
  AuthProps,
  DataGroupItem,
  DataUserItem,
  GroupBodyProps,
  UpdateGroupIdBodyProps,
} from '@interfaces/index';
import {isEmpty} from 'ramda';
import acronym from '@helpers/acronym';
import {
  clearGroupLoading,
  clearGroupStatusState,
  createGroup,
} from '@redux/group/group';
import uid from '@helpers/uuidGenerator';
import LoaderModal from '@components/LoaderModal';
import {updateGroupIDUser} from '@redux/auth/register';
import {authRequest} from '@redux/auth/login';

const CreateGroup = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);
  const registerData = useSelector((state: RootState) => state.register);
  const groupData = useSelector((state: RootState) => state.group);
  const authData = useSelector((state: RootState) => state.auth);

  const [groupName, setGroupName] = useState<string>('');
  const [groupDescription, setGroupDescription] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const temMember: DataUserItem[] = [];

  const onSavedCreateGroup = async () => {
    if (isEmpty(groupName) && isEmpty(groupDescription)) {
      Alert.alert(
        translate(
          {
            en: 'Validation',
            id: 'Validasi',
          },
          language,
        ),
        translate(
          {
            en: "Group name or description can't empty ",
            id: 'Nama grub dan deskripsi tidak boleh kosong',
          },
          language,
        ),
        [{text: 'OK', onPress: () => {}}],
      );
    } else {
      setIsLoading(true);
      let tempData: DataGroupItem = {
        id: await uid(),
        title: groupName,
        description: groupDescription,
        member: temMember,
      };

      let body: GroupBodyProps = {
        body: tempData,
      };

      dispatch(createGroup(body));

      setTimeout(() => {
        temMember.forEach((el: DataUserItem) => {
          let bodyUpdateGroupId: UpdateGroupIdBodyProps = {
            idGroup: tempData.id,
            idUser: el.id,
          };
          dispatch(updateGroupIDUser(bodyUpdateGroupId));
        });
      }, 700);
    }
  };

  const onClickAddMember = (el: DataUserItem) => {
    temMember.push(el);
  };

  useEffect(() => {
    let params = props.params;
    if (!isEmpty(params)) {
      let currentUser: DataUserItem = {
        id: params?.id,
        groupId: params?.groupId,
        email: params?.email,
        firstName: params?.firstName,
        lastName: params?.lastName,
        password: params?.lastName,
        jobTitle: params?.lastName,
        imageUrl: params?.lastName,
      };
      temMember.push(currentUser);
    }
  }, [props, temMember]);

  useEffect(() => {
    if (groupData.status === 200) {
      setTimeout(() => {
        let bodyRequest: AuthProps = {
          email: props.params?.email,
          password: props.params?.password,
        };
        dispatch(authRequest(bodyRequest));
        setIsLoading(false);
      }, 1000);
      dispatch(clearGroupStatusState());
    } else if (groupData.status === 403) {
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
      dispatch(clearGroupLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupData]);

  useEffect(() => {
    const navigationButtonEventListener =
      Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'SAVE_CREATE_GROUP') {
            onSavedCreateGroup();
          }
        },
      );
    return () => {
      navigationButtonEventListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName, groupDescription, temMember]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={70}
      behavior={isIos ? 'padding' : 'height'}
      style={styles.container}>
      <LoaderModal visible={isLoading} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.avatarContainer, styles.spacer]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarPlaceholder}>
              {isEmpty(groupName) ? acronym('Group Name') : acronym(groupName)}
            </Text>
          </View>
          <Text style={styles.groupName}>
            {isEmpty(groupName) ? 'Group Name' : groupName}
          </Text>
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
              onChangeText={setGroupDescription}
            />
          </View>

          <View style={styles.spacerSM}>
            <View style={styles.headerSection}>
              <Text style={{...styles.sectionTitle}}>
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
            </View>
          </View>

          <View style={styles.listUserContainer}>
            {registerData.data
              .filter(el => {
                let userId = props.params ? props.params?.id : authData.data.id;
                el.id !== userId;
              })
              .map((e: DataUserItem, index: number) => (
                <GroupMemberItem
                  key={index}
                  data={e}
                  onClick={onClickAddMember}
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
  groupName: {
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
    fontSize: 15,
  },
  spacerSM: {
    marginTop: 15,
  },
});
