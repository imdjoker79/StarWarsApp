import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {windowWidth} from '@common/const';
import {Colors} from '@common/colors';

interface CustomModalProps extends ViewProps {
  visible?: boolean;
  title?: string;
  positiveBtnTitle?: string;
  negativeBtnTitle?: string;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
  positiveStyle?: ViewStyle;
  negativeStyle?: ViewStyle;
}

const CustomModal = ({
  visible,
  title,
  positiveBtnTitle,
  negativeBtnTitle,
  onPositiveClick,
  onNegativeClick,
  positiveStyle = styles.btnYes,
  negativeStyle = styles.btnSkip,
  ...otherProps
}: CustomModalProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{...styles.modal}} {...otherProps}>
        <View style={styles.modalContent}>
          <Text style={styles.mainTitle}>{title}</Text>
          <View style={styles.spacer} />
          <TouchableOpacity style={positiveStyle} onPress={onPositiveClick}>
            <Text style={{...styles.textTitle, color: Colors.white}}>
              {positiveBtnTitle}
            </Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={negativeStyle} onPress={onNegativeClick}>
            <Text style={{...styles.textTitle, color: Colors.primary}}>
              {negativeBtnTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: windowWidth - 40,
    backgroundColor: Colors.white,
    shadowColor: Colors.darkGray,
    elevation: 5,
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  btnYes: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.green,
  },
  btnSkip: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.primary,
  },
  mainTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  spacer: {
    marginVertical: 10,
  },
});
