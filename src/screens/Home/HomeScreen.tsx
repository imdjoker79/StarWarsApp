import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {DataGroupItem, DataUserItem} from '../../interfaces';
import {fetchStarship} from '../../redux/starship';
import {isEmpty} from 'ramda';

let colorsChart: string[] = [
  Colors.defaultGrey,
  Colors.thirdGreen,
  Colors.secondGreen,
  Colors.darkGreen,
  Colors.blueEgg,
];

const getPieChartDataRounded = (data: DataUserItem[]) => {
  return data.map((item, index) => {
    const randomColor = colorsChart[Math.floor(Math.random() * data.length)];

    return {
      key: `${item.jobTitle}`,
      value: 10,
      svg: {fill: randomColor},
      arc: {cornerRadius: 5, outerRadius: index === 0 ? '80%' : ''},
    };
  });
};

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
  const authData = useSelector((state: RootState) => state.auth);
  const dataUser = useSelector((state: RootState) => state.register);
  const dataGroup = useSelector((state: RootState) => state.group);
  const starship = useSelector((state: RootState) => state.starship);

  const [stateDataGroup, setStateDataGroup] = useState<DataGroupItem>([]);

  const pieDataChart = getPieChartDataRounded(dataUser.data);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={{fontSize: 20, fontWeight: '800'}}>{item.name}</Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>{item.model}</Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>
          {item.manufacturer}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>
          {item.cost_in_credits}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>{item.length}</Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>{item.crew}</Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>{item.passengers}</Text>
        <Text style={{fontSize: 12, fontWeight: '300'}}>{item.created}</Text>
      </View>
    );
  };

  const itemSeparator = () => <View style={styles.itemSeparator} />;

  useEffect(() => {
    if (!isEmpty(authData.data.groupId)) {
      // let data = dataGroup.data.find(el => el.id === authData.data.groupId![0]);
      // setStateDataGroup(data!);
      // console.log('GROUPPP', data);
      // console.log('IMUNNN', authData.data?.groupId![0]);
    }
  }, [authData, dataGroup]);

  // useEffect(() => {
  //   console.log(starship);
  // }, [starship]);

  useEffect(() => {
    dispatch(fetchStarship(''));
  }, [dispatch]);

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
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.cardContainer,
            paddingHorizontal: 20,
          }}>
          <Text style={styles.membersTitle}>
            {translate(
              {
                en: 'Members',
                id: 'Anggota',
              },
              language,
            )}
          </Text>
          <Text>10ple</Text>
          <View style={styles.spacerVertical} />
          <View style={styles.row}>
            {dataGroup.data
              .filter(el => el.id === authData.data.groupId)
              .map(el => (
                <Image
                  source={{uri: el.member[0].imageUrl}}
                  style={styles.membersAvatar}
                />
              ))}
          </View>
          <PieChart
            style={styles.chartContainer}
            outerRadius={'70%'}
            innerRadius={4}
            labelRadius={100}
            sort={(a, b) => b.value! - a.value!}
            data={data13}>
            <ChartLabel />
          </PieChart>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.starshipTitle}>Starship Used by Alliance</Text>
          {starship.data && (
            <FlatList
              horizontal={true}
              data={starship.data}
              renderItem={renderItem}
              contentContainerStyle={styles.containerItem}
              ItemSeparatorComponent={itemSeparator}
              showsHorizontalScrollIndicator={false}
            />
          )}
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
    backgroundColor: Colors.gray,
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
    paddingVertical: 15,
    borderRadius: 10,
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
    marginHorizontal: 15,
    marginBottom: 10,
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
  containerItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemSeparator: {
    width: 10,
  },
  renderItemContainer: {
    padding: 10,
    width: windowWidth / 1.5,
    backgroundColor: Colors.gray,
    borderRadius: 5,
    elevation: 0.5,
    shadowOpacity: 0.5,
    shadowColor: Colors.defaultGrey,
    shadowOffset: {width: 1, height: 1},
  },
});
