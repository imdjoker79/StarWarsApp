import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowWidth} from '@common/const';
import {Colors} from '@common/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const GroupScreen = () => {
  const groupData = useSelector((state: RootState) => state.group);

  useEffect(() => {
    console.log(JSON.stringify(groupData));
  }, [groupData]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container}>
        <View style={[styles.avatarContainer, styles.spacer]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarPlaceholder}>
              {/* {isEmpty(groupName) ? acronym('Group Name') : acronym(groupName)} */}
              GM
            </Text>
          </View>
          <Text style={styles.groupName}>
            {/* {isEmpty(groupName) ? 'Group Name' : groupName} */}
            Group Name
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

GroupScreen.options = () => ({
  topBar: {
    visible: false,
  },
});

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
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
});
