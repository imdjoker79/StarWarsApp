import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Colors} from '../common/colors';

interface LoaderModalProps {
  visible: boolean;
}

const LoaderModal = ({visible}: LoaderModalProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator color={Colors.white} size={'large'} />
      </View>
    </Modal>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
});
