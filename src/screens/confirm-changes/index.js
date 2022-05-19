/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {apiCall} from 'src/redux/store/api-client';
import {encrypted, formatDate, formatTime} from 'src/utils/commonUtils';
import {API_URL} from 'src/utils/config';
import {ImageComponent, Block, Text, wp, hp, Button} from '_elements';
import {RouteNames} from '_routeName';
import io from 'socket.io-client';

const ConfirmChanges = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const {params} = useRoute();
  const {
    header = 'Confirm Changes',
    subtitle = 'Are you sure you want to confirm changes ?',
    data = {},
    navType,
    status,
  } = params;
  useEffect(() => {
    navigation.setOptions({title: header});
  }, []);

  const confirmUnitNavigation = () => {
    if (navType === 'planned') {
      navigation.navigate(RouteNames.PLANNED_UNIT_SCREEN);
      setloading(false);
    } else {
      navigation.navigate(RouteNames.CURRENT_UNIT_SCREEN);
      setloading(false);
    }
  };

  const confirmUnitChanges = async () => {
    const socket = io(API_URL.BASE_URL);
    setloading(true);
    const val = {
      unit_id: data.unit_id,
      status: 'confirm',
      reason: '',
      type: status,
    };
    const encryptData = encrypted(val);
    console.log('encryptData: ', encryptData);
    const res = await apiCall('POST', API_URL.UNIT_ACTION_URL, encryptData);
    if (res.status === 1) {
      setloading(false);
      confirmUnitNavigation();
      socket.emit('unit_action', {
        unit_id: data.unit_id,
      });
    }
  };
  return (
    <Block middle primary>
      <Block center middle flex={1}>
        <ImageComponent name="logoW" height={95} width={320} />
      </Block>
      <Block defaultPadding flex={1}>
        <Text gutterBottom left>
          {subtitle}
        </Text>

        <Block flex={false} margin={[0, 0, 0, wp(10)]}>
          <Block margin={[hp(0.5), 0]} flex={false} row>
            <Text style={{width: wp(20)}}>Start</Text>
            <Text semibold>
              {formatDate(data.start_time)} at {formatTime(data.start_time)}
            </Text>
          </Block>

          <Block margin={[hp(0.5), 0]} flex={false} row>
            <Text style={{width: wp(20)}}>End</Text>
            <Text semibold>
              {formatDate(data.end_time)} at {formatTime(data.end_time)}
            </Text>
          </Block>

          <Block margin={[hp(0.5), 0, hp(5), 0]} flex={false} row>
            <Text style={{width: wp(20)}}>Code</Text>
            <Text semibold>{data.vehicle_code}</Text>
          </Block>
        </Block>
        <Button
          isLoading={loading}
          onPress={() => confirmUnitChanges()}
          uppercase
          color={'primary'}>
          {header}
        </Button>
      </Block>
    </Block>
  );
};
ConfirmChanges.defaultProps = {
  header: 'Confirm Changes',
  subtitle: 'Are you sure you want to confirm changes ?',
};

export default ConfirmChanges;
