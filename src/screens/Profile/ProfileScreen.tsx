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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateImageUser} from '../../redux/auth/login';

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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWantSignOut, setIsWantSignOut] = useState<boolean>(false);

  const onSignOut = () => {
    dispatch(clearAuthState());
  };

  const onAskSignOut = () => {
    setIsWantSignOut(true);
  };

  const onAddImage = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result) {
      //update from profile
      if (isParentScreen) {
        if (isIos) {
          onUpdateImage(result?.assets[0]?.uri);
        } else {
          console.log(result);
        }
      } else {
        //from register
        getImagePicker!(result);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);

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
              <ListItem title={'Name'} subtitle={userData.data?.name ?? '-'} />
              <View style={styles.inputSeparatorLG} />
              <ListItem
                title={'Height'}
                subtitle={userData.data?.height ?? '-'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem title={'Mass'} subtitle={userData.data?.mass ?? '-'} />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={'Birth year'}
                subtitle={userData.data?.birth_year ?? '-'}
              />
              <View style={styles.inputSeparatorXS} />
              <ListItem
                title={'Gender'}
                subtitle={userData.data?.gender ?? '-'}
              />
            </>
          ) : (
            <>
              <ListItem title={'Fist Name'} subtitle={data?.firstName} />
              <View style={styles.inputSeparatorXS} />
              <ListItem title={'Last Name'} subtitle={data?.lastName} />
              <View style={styles.inputSeparatorLG} />
              <ListItem title={'Password'} subtitle={'*****'} />
              <View style={styles.inputSeparatorXS} />
              <ListItem title={'Confirm Password'} subtitle={'*****'} />
              <View style={styles.inputSeparatorSM} />
              <ListItem title={'Job Title'} subtitle={data?.jobTitle} />
            </>
          )}
        </View>
        {isParentScreen && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={onAskSignOut}>
              <Text style={styles.titleSignOut}>SIGN OUT</Text>
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
});
