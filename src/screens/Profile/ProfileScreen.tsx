import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {isEmpty} from 'ramda';

import {windowWidth} from '@common/const';
import {Colors} from '@common/colors';
import ListItem from '@components/ListItem';
import {setAuthRoot} from '@navigators/roots';
import LoaderModal from '@components/LoaderModal';
import CustomModal from '@components/CustomModal';
import translate from '@helpers/translator';
import {useDispatch, useSelector} from 'react-redux';
import {DataUserItem} from '@interfaces/index';
import {clearAuthState} from '@redux/auth/login';
import {fetchDetailUser} from '@redux/user/user';
import {RootState} from '../../store';

interface ProfileScreenProps {
  isParentScreen?: boolean;
  data?: DataUserItem;
}

const ProfileScreen = ({isParentScreen = true, data}: ProfileScreenProps) => {
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
    dispatch(fetchDetailUser());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

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
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            />
          </View>
          <Text style={styles.userName}>
            {isParentScreen
              ? userData.data.name
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
    width: windowWidth / 6,
    height: windowWidth / 6,
    borderRadius: windowWidth / 12,
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
});
