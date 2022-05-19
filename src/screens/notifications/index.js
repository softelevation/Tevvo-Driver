import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {apiCall} from 'src/redux/store/api-client';
import {API_URL} from 'src/utils/config';
import {Text, Block, hp, ImageComponent, wp} from '_elements';

const data = [
  {
    title: 'Unit has been created by the Unknown',
    type: 'accept',
  },
  {
    title: 'Unit has been rejected by the driver',
    type: 'reject',
  },
  {
    title: 'Unit has been approved by the driver',
    type: 'accept',
  },
  {
    title: 'Unit changes has been rejected by the driver',
    type: 'reject',
  },
  {
    title: 'Unit changes has been approved by the driver',
    type: 'accept',
  },
  {
    title: 'Unit has been rejected by the driver',
    type: 'reject',
  },
];

const Notifications = () => {
  const callApi = async () => {
    const res = await apiCall('POST', API_URL.NOTIFICATION_URL);
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <Block defaultPadding={true} primary>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={({item}) => {
          return (
            <Block flex={false} style={styles.surface} color="#fff" shadow>
              <ImageComponent
                name={
                  item.type === 'accept' ? 'status_success' : 'status_failed'
                }
                height={25}
                width={25}
              />
              <Text margin={[0, wp(2)]}>{item.title}</Text>
            </Block>
          );
        }}
      />
    </Block>
  );
};
const styles = StyleSheet.create({
  surface: {
    padding: hp(2),
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    marginTop: hp(2),
    marginHorizontal: wp(1),
    flexDirection: 'row',
  },
});
export default Notifications;
