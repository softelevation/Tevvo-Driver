/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {apiCall} from 'src/redux/store/api-client';
import {encrypted, formatDate, formatTime} from 'src/utils/commonUtils';
import {API_URL} from 'src/utils/config';
import {ImageComponent, Block, Text, wp, hp, Button} from '_elements';
import {RouteNames} from '_routeName';
import io from 'socket.io-client';

const RejectConfirmChanges = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const {params} = useRoute();
  const {text, buttonText, header, data = {}, navType, reason, status} = params;
  useEffect(() => {
    navigation.setOptions({title: header});
  }, []);

  const rejectUnitNavigation = () => {
    if (navType === 'reject_unit') {
      navigation.navigate(RouteNames.PLANNED_UNIT_SCREEN);
    } else {
      navigation.navigate(RouteNames.CURRENT_UNIT_SCREEN);
    }
  };

  const rejectUnitConfirm = async () => {
    const socket = io(API_URL.BASE_URL);
    setloading(true);
    const val = {
      unit_id: data.unit_id,
      status: 'reject',
      reason: reason,
      type: status,
    };
    const encryptData = encrypted(val);

    const res = await apiCall('POST', API_URL.UNIT_ACTION_URL, encryptData);
    if (res.status === 1) {
      setloading(false);
      rejectUnitNavigation();
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
          Are you sure you want to {text} ?
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
          icon="cancel"
          iconWithText
          // onPress={() => navigation.navigate(RouteNames.CURRENT_UNIT_SCREEN)}
          onPress={() => rejectUnitConfirm()}
          uppercase
          isLoading={loading}
          color={'accent'}>
          {buttonText}
        </Button>
      </Block>
    </Block>
  );
};

export default RejectConfirmChanges;
