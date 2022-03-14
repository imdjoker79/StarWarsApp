import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DataUserItem} from '../interfaces';
import {Colors} from '../common/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface GroupMemberItemProps {
  data: DataUserItem;
  buttonType?: 'add' | 'delete';
  onClick: (el: DataUserItem) => void;
  isCurrentUser?: boolean;
}

const GroupMemberItem = ({
  data,
  buttonType = 'add',
  onClick,
  isCurrentUser = false,
}: GroupMemberItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.avatar}
          source={{
            uri: data.imageUrl,
          }}
        />
        <Text style={styles.name}>
          {data?.firstName} {data?.lastName}
        </Text>
      </View>
      {!isCurrentUser && (
        <TouchableOpacity onPress={() => onClick(data)} style={styles.btn}>
          <FontAwesome
            name={buttonType === 'add' ? 'plus-circle' : 'trash'}
            size={25}
            color={buttonType === 'add' ? Colors.green : Colors.red}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GroupMemberItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  name: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.darkGray,
  },
  btn: {
    paddingHorizontal: 10,
  },
});
