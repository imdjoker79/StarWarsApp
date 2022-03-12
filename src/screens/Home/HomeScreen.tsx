import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {RootState, store} from '../../store';
import translate from '../../helpers/translator';
import {useDispatch, useSelector} from 'react-redux';
import {getPlatformTabsIcon} from '../../navigators/helpers/navigationIconHelpers';
import {SFSymbols} from '../../assets/symbols/SFSymbols';
import {Navigation} from 'react-native-navigation';
import {windowWidth} from '../../common/const';
import {Colors} from '../../common/colors';
import {PieChart} from 'react-native-svg-charts';
import {ChartLabel} from '../../components/ChartLabel';

export const data13 = [
  {
    key: 'General',
    value: 50,
    svg: {fill: Colors.semiDarkGray},
    arc: {outerRadius: '80%', cornerRadius: 0},
  },
  {
    key: 'Commander',
    value: 50,
    svg: {fill: Colors.thirdGreen},
    arc: {cornerRadius: 5},
  },
  {
    key: 'Pilot',
    value: 40,
    svg: {fill: Colors.secondGreen},
    arc: {cornerRadius: 5},
  },
  {
    key: 'Jedi',
    value: 95,
    svg: {fill: Colors.darkGreen},
    arc: {cornerRadius: 5},
  },
];

const HomeScreen = (props: any) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language);
  const dataUser = useSelector((state: RootState) => state.register);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      bottomTab: {
        text: translate(
          {
            en: 'Home',
            id: 'Beranda',
          },
          language,
        ),
      },
    });
  }, [language, props.componentId]);

  useEffect(() => {
    console.log('DATA    ', dataUser);
  }, [dataUser]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <Text style={styles.groupPlaceholder}>GM</Text>
          </View>
          <View style={styles.spacer} />
          <Text style={styles.groupName}>Rebels Alliance</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.membersTitle}>Members</Text>
          <Text>10 People</Text>
          <View style={styles.spacerVertical} />
          <View style={styles.row}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
              style={styles.membersAvatar}
            />
            <View style={styles.spacerHorizontal} />
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
              style={styles.membersAvatar}
            />
            <View style={styles.spacerHorizontal} />
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
              style={styles.membersAvatar}
            />
          </View>
          <PieChart
            style={styles.chartContainer}
            outerRadius={'70%'}
            innerRadius={4}
            labelRadius={100}
            sort={(a, b) => b.value - a.value}
            data={data13}>
            <ChartLabel />
          </PieChart>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.starshipTitle}>Starship Used by Alliance</Text>
        </View>
      </View>
    </ScrollView>
  );
};

HomeScreen.options = () => ({
  topBar: {
    visible: false,
  },
  bottomTab: {
    text: translate(
      {
        en: 'Home',
        id: 'Beranda',
      },
      store.getState().language,
    ),
    ...getPlatformTabsIcon(SFSymbols.house, SFSymbols['house.fill'], 'home'),
  },
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  spacerVertical: {
    marginVertical: 5,
  },
  spacerHorizontal: {
    marginHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  avatar: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: windowWidth / 10,
    backgroundColor: Colors.blueEgg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  groupPlaceholder: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.white,
  },
  spacer: {
    marginLeft: 10,
  },
  groupName: {
    fontWeight: '600',
    fontSize: 25,
    color: Colors.darkGray,
  },
  cardContainer: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: windowWidth - 40,
    backgroundColor: Colors.white,
    shadowColor: 'grey',
    marginVertical: 10,
    elevation: 0.5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
  },
  membersTitle: {
    fontWeight: '600',
    color: Colors.darkGray,
    opacity: 0.7,
  },
  starshipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.darkGray,
    opacity: 0.7,
  },
  chartContainer: {
    width: windowWidth / 1.7,
    height: windowWidth / 1.7,
    alignSelf: 'center',
  },
});
