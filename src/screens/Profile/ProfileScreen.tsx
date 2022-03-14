import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {isEmpty} from 'ramda';

import {isIos, windowWidth} from '@common/const';
import {Colors} from '@common/colors';
import ListItem from '@components/ListItem';
import {setAuthRoot} from '@navigators/roots';
import LoaderModal from '@components/LoaderModal';
import CustomModal from '@components/CustomModal';
import translate from '@helpers/translator';
import {useDispatch, useSelector} from 'react-redux';
import {DataUserItem, UpdateImageProfileBodyProps} from '@interfaces/index';
import {clearAuthState, clearSuccessImageState} from '@redux/auth/login';
import {fetchDetailUser} from '@redux/user/user';
import {RootState} from '../../store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera} from 'react-native-image-picker';
import {updateImageUser} from '@redux/auth/login';
import {Switch} from 'react-native-switch';
import {switchLang} from '../../redux/language';

interface ProfileScreenProps {
  isParentScreen?: boolean;
  data?: DataUserItem;
  getImagePicker?: (val: any) => void;
}

const ProfileScreen = ({
  isParentScreen = true,
  data,
  getImagePicker,
}: ProfileScreenProps) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);
  const authData = useSelector((state: RootState) => state.auth);
  const userData = useSelector((state: RootState) => state.user);

  const [lang, setLang] = useState<boolean>(language.code === 'id');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWantSignOut, setIsWantSignOut] = useState<boolean>(false);

  const onSignOut = () => {
    dispatch(clearAuthState());
  };

  const onAskSignOut = () => {
    setIsWantSignOut(true);
  };

  const onAddImage = async () => {
    const result: any = await launchCamera({
      mediaType: 'photo',
    });
    console.log(result);
    if (result) {
      //update from profile
      if (isParentScreen) {
        if (isIos) {
          onUpdateImage(result?.assets[0]?.uri);
        } else {
          onUpdateImage(result?.assets[0]?.uri);
        }
      } else {
        getImagePicker!(result);
        //from register
      }
    } else {
      if (isIos) {
      } else {
        ToastAndroid.show(
          translate(
            {
              en: 'Failed to pick image',
              id: 'Gagal mengambil gambar',
            },
            language,
          ),
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const onUpdateImage = (val: any) => {
    let body: UpdateImageProfileBodyProps = {
      idUser: authData.data.id,
      pathImage: val,
    };
    dispatch(updateImageUser(body));
  };

  useEffect(() => {
    let message = translate(
      {
        en: 'Success to update image profile',
        id: 'Berhasil mengubah foto profil',
      },
      language,
    );
    if (authData.successImage) {
      dispatch(clearSuccessImageState());
      if (isIos) {
        Alert.alert(
          translate(
            {
              en: 'Success',
              id: 'Berhasil',
            },
            language,
          ),
          message,
          [{text: 'OK', onPress: () => {}}],
        );
      } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  }, [authData, dispatch, language]);

  useEffect(() => {
    setIsWantSignOut(false);
    if (isEmpty(authData.data) && isParentScreen) {
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          setAuthRoot();
          setIsLoading(false);
        }, 1000);
      }, 500);
    }
  }, [authData, isParentScreen]);

  useEffect(() => {
    dispatch(fetchDetailUser(authData.data.firstName!));
  }, [authData, dispatch]);

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
      <CustomModal
        visible={isWantSignOut}
        positiveStyle={styles.btnSignOut}
        title={translate(
          {
            en: 'Are you sure want Sign Out?',
            id: 'Apakah anda yakin akan keluar?',
          },
          language,
        )}
        positiveBtnTitle={translate(
          {
            en: 'Sign Out',
            id: 'Keluar',
          },
          language,
        )}
        negativeBtnTitle={translate(
          {
            en: 'Cancel',
            id: 'Batal',
          },
          language,
        )}
        onPositiveClick={onSignOut}
        onNegativeClick={() => setIsWantSignOut(false)}
      />
      <ScrollView>
        <View style={styles.headerContainer}>
          {isParentScreen && (
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
          )}
          <View style={styles.avatar}>
            {/* <Text style={styles.avatarPlaceholder}>LS</Text> */}
            <Image
              style={styles.avatar}
              source={{
                uri: data?.imageUrl ? data?.imageUrl : authData.data.imageUrl,
              }}
            />
            <TouchableOpacity style={styles.addImage} onPress={onAddImage}>
              <MaterialCommunityIcons
                name={'image-plus'}
                size={25}
                color={Colors.darkGray}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>
            {isParentScreen
              ? userData.data?.name ?? '-'
              : `${data?.firstName} ${data?.lastName}`}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <ListItem
            title={'Email'}
            subtitle={isParentScreen ? authData.data.email : data?.email}
          />
          <View style={styles.inputSeparatorXS} />
          {isParentScreen ? (
            <>
              <ListItem
                title={translate(
                  {
                    en: 'Name',
                    id: 'Nama',
                  },
                  language,
                )}
                subtitle={userData.data?.name ?? '-'}
              />
              <View style={styles.inputSeparatorLG} />
              <ListItem
                title={translate(
                  {
                    en: 'Height',
                    id: 'Tinggi',
                  },
                  language,
                )}
                subtitle={userData.data?.height ?? '-'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={translate(
                  {
                    en: 'Mass',
                    id: 'Berat',
                  },
                  language,
                )}
                subtitle={userData.data?.mass ?? '-'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={translate(
                  {
                    en: 'Birth year',
                    id: 'Tanggal Lahir',
                  },
                  language,
                )}
                subtitle={userData.data?.birth_year ?? '-'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={translate(
                  {
                    en: 'Gender',
                    id: 'Jenis Kelamin',
                  },
                  language,
                )}
                subtitle={userData.data?.gender ?? '-'}
              />
            </>
          ) : (
            <>
              <ListItem
                title={translate(
                  {
                    en: 'Last Name',
                    id: 'Nama Belakang',
                  },
                  language,
                )}
                subtitle={data?.firstName}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={translate(
                  {
                    en: 'Last Name',
                    id: 'Nama Belakang',
                  },
                  language,
                )}
                subtitle={data?.lastName}
              />
              <View style={styles.inputSeparatorLG} />
              <ListItem
                title={translate(
                  {
                    en: 'Password',
                    id: 'Kata Sandi',
                  },
                  language,
                )}
                subtitle={'*****'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={translate(
                  {
                    en: 'Confirm Password',
                    id: 'Konfirmasi Sandi',
                  },
                  language,
                )}
                subtitle={'*****'}
              />
              <View style={styles.inputSeparatorSM} />
              <ListItem
                title={translate(
                  {
                    en: 'Job Title',
                    id: 'Nama Tugas',
                  },
                  language,
                )}
                subtitle={data?.jobTitle}
              />
            </>
          )}
        </View>
        {isParentScreen && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={onAskSignOut}>
              <Text style={styles.titleSignOut}>
                {translate(
                  {
                    en: 'SIGN OUT',
                    id: 'KELUAR',
                  },
                  language,
                )}
              </Text>
            </TouchableOpacity>
            <Text style={styles.versionApp}>V.0.0.1</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

ProfileScreen.options = () => ({
  topBar: {
    visible: false,
  },
});

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 10,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: windowWidth / 10,
    backgroundColor: Colors.darkGreen,
  },
  avatarPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.darkGray,
  },
  inputSeparatorLG: {
    marginVertical: 15,
  },
  inputSeparatorSM: {
    marginVertical: 10,
  },
  inputSeparatorXS: {
    marginVertical: 0.5,
  },
  logoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleSignOut: {
    fontWeight: 'bold',
    color: Colors.red,
  },
  versionApp: {
    marginTop: 10,
    color: 'grey',
  },
  btnSignOut: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.red,
  },
  addImage: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  langSetting: {
    top: 30,
    right: 30,
    position: 'absolute',
  },
});
