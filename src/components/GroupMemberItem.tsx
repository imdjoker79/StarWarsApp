import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DataUserItem} from '../interfaces';
import {Colors} from '../common/colors';

const GroupMemberItem = (props: DataUserItem) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: props.imageUrl}} />
      <Text style={styles.name}>
        {props.firstName} {props.lastName}
      </Text>
    </View>
  );
};

export default GroupMemberItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
  },
});
