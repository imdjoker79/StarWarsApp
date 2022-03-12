import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../common/colors';

interface ListItemProps {
  id?: string | number;
  title?: string;
  subtitle?: string;
  // Entypo Icon
  lefIcon?: string;
}

const ListItem = ({
  title = 'Title',
  subtitle = 'subtitle',
  lefIcon = 'chevron-thin-right',
}: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.leftContent}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Entypo name={lefIcon} size={15} color={Colors.darkGray} />
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
  },
  title: {
    fontWeight: '500',
    color: Colors.darkGray,
  },
  leftContent: {
    flexDirection: 'row',
  },
  subtitle: {
    fontWeight: '500',
    marginRight: 10,
    color: 'grey',
  },
});
