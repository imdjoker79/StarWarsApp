import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {Pages} from '../../navigators/constants/allPages';
import {Colors} from '../../common/colors';

const HomeScreen: NavigationFunctionComponent = (props): any => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              id: Pages.createGroupScreen.name,
              name: Pages.createGroupScreen.name,
              options: {
                topBar: {
                  rightButtons: [
                    {
                      id: 'save',
                      text: 'Save',
                      color: Colors.primary,
                    },
                  ],
                  title: {
                    text: 'Create Group Account',
                  },
                },
              },
            },
          });
        }}
        title="test"
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
