/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Block, Button, hp, ImageComponent, Text, wp} from '_elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RouteNames} from '_routeName';
import {
  encrypted,
  formatDate,
  formatTime,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
import EmptyUnit from 'src/common/empty-unit';
import {STATUS_URL} from 'src/utils/config';
import {currentUnitRequest} from 'src/redux/unit/current/action';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, AppState, RefreshControl, ScrollView} from 'react-native';
import io from 'socket.io-client';
import {API_URL} from 'src/utils/config';
import {apiCall} from 'src/redux/store/api-client';
import DefaultSkeleton from 'src/components/defaultskeleton';
import {profileRequest} from 'src/redux/login/action';

const CurrentUnit = () => {
  const {navigate} = useNavigation();
  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setloading] = useState(false);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const [loading, data, user] = useSelector((v) => [
    v.unit.currentUnit.loading,
    v.unit.currentUnit.data,
    v.auth.login.profile,
  ]);

  useEffect(() => {
    dispatch(profileRequest());
  }, []);

  useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`driver_id_${user.driver_id}`, (msg) => {
        dispatch(currentUnitRequest(encryptedData));
      });
    }
  }, []);

  const callApi = () => {
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    dispatch(currentUnitRequest(encryptedData));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callApi();
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const onRefresh = () => {
    const statusData = {status: STATUS_URL.Active_Status};
    const encryptedData = encrypted(statusData);
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    dispatch(currentUnitRequest(encryptedData));
  };

  const confirmUnitChanges = async () => {
    const socket = io(API_URL.BASE_URL);

    setloading(true);
    const val = {
      unit_id: data.unit_id,
      status: 'inactive',
      reason: '',
      type: 'unit',
    };
    const encryptData = encrypted(val);
    const res = await apiCall('POST', API_URL.UNIT_ACTION_URL, encryptData);
    if (res.status === 1) {
      setloading(false);
      onRefresh();
      socket.emit('unit_action', {
        unit_id: data.unit_id,
      });
    }
  };

  const onSubmit = () => {
    Alert.alert('Alert', 'Are you sure you want to deactivate this unit?', [
      {
        text: 'No',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          confirmUnitChanges();
        },
      },
    ]);
  };

  const _renderItem = (item) => {
    return (
      <Block margin={[hp(2), 0, hp(2)]} flex={false}>
        <Block flex={false} row center space={'between'}>
          <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
            <ImageComponent
              name={item.status === 'active' ? 'active_unit' : 'pending_unit'}
              height={26}
              width={26}
            />
            <Text grey margin={[0, 0, 0, wp(3)]}>
              Status :{' '}
              <Text size={15} capitalize semibold black>
                {item.status}
              </Text>
            </Text>
          </Block>
        </Block>
        <Block
          margin={[hp(1), 0, hp(1.5)]}
          borderColor={'#C5C5C7'}
          borderWidth={[0, 0, 1, 0]}
        />
        <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
          <ImageComponent name="calendar" height={25} width={25} />
          <Block flex={false}>
            <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
              Shift Date-Time
            </Text>
            {strictValidObjectWithKeys(item.isUnitUpdated) && (
              <Text height={24} grey size={14} margin={[0, 0, 0, wp(3)]}>
                (last modified on {formatDate(item.isUnitUpdated.updated_time)}{' '}
                at {formatTime(item.isUnitUpdated.updated_time)})
              </Text>
            )}
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            Start
          </Text>
          <Block margin={[0, 0, 0, wp(3)]} flex={false}>
            <Block row flex={false}>
              <Text
                style={{width: wp(28)}}
                grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                height={28}
                semibold
                size={18}>
                {strictValidObjectWithKeys(item.isUnitUpdated)
                  ? formatDate(item.isUnitUpdated.start_time)
                  : formatDate(item.start_time)}
              </Text>
              {strictValidObjectWithKeys(item.isUnitUpdated) && (
                <>
                  <ImageComponent name="arrow_forward" height={25} width={25} />
                  <Text
                    accent
                    margin={[0, 0, 0, wp(4)]}
                    grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                    height={28}
                    semibold
                    size={18}>
                    {formatDate(item.start_time)}
                  </Text>
                </>
              )}
            </Block>
            <Block row flex={false}>
              <Text
                style={{width: wp(28)}}
                grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                height={28}
                semibold
                size={18}>
                {strictValidObjectWithKeys(item.isUnitUpdated)
                  ? formatTime(item.isUnitUpdated.start_time)
                  : formatTime(item.start_time)}
              </Text>
              {strictValidObjectWithKeys(item.isUnitUpdated) && (
                <>
                  <ImageComponent name="arrow_forward" height={25} width={25} />
                  <Text
                    accent
                    margin={[0, 0, 0, wp(4)]}
                    grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                    height={28}
                    semibold
                    size={18}>
                    {formatTime(item.start_time)}
                  </Text>
                </>
              )}
            </Block>
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            End
          </Text>
          <Block margin={[0, 0, 0, wp(4)]} flex={false}>
            <Block row flex={false}>
              <Text
                style={{width: wp(28)}}
                grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                height={28}
                semibold
                size={18}>
                {strictValidObjectWithKeys(item.isUnitUpdated)
                  ? formatDate(item.isUnitUpdated.end_time)
                  : formatDate(item.end_time)}
              </Text>
              {strictValidObjectWithKeys(item.isUnitUpdated) && (
                <>
                  <ImageComponent name="arrow_forward" height={25} width={25} />
                  <Text
                    accent
                    margin={[0, 0, 0, wp(4)]}
                    grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                    height={28}
                    semibold
                    size={18}>
                    {formatDate(item.end_time)}
                  </Text>
                </>
              )}
            </Block>

            <Block row flex={false}>
              <Text
                style={{width: wp(28)}}
                grey={strictValidObjectWithKeys(item.isUnitUpdated)}
                height={28}
                semibold
                size={18}>
                {strictValidObjectWithKeys(item.isUnitUpdated)
                  ? formatTime(item.isUnitUpdated.end_time)
                  : formatTime(item.end_time)}
              </Text>
              {strictValidObjectWithKeys(item.isUnitUpdated) && (
                <>
                  <ImageComponent name="arrow_forward" height={25} width={25} />
                  <Text
                    margin={[0, 0, 0, wp(4)]}
                    accent
                    height={28}
                    semibold
                    size={18}>
                    {formatTime(item.end_time)}
                  </Text>
                </>
              )}
            </Block>
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
          <ImageComponent
            name="assistant_icon"
            color="#5C6878"
            height={25}
            width={25}
          />
          <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
            Attendant
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            Name
          </Text>
          <Block flex={false}>
            <Text height={28} semibold size={18} margin={[0, 0, 0, wp(3)]}>
              {item.attendant_name}
            </Text>
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
          <ImageComponent name="vehicle" height={25} width={25} />
          <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
            Vehicle
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0, hp(4), wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            Code
          </Text>
          <Block flex={false}>
            <Text height={28} semibold size={18} margin={[0, 0, 0, wp(3)]}>
              {item.vehicle_code}
            </Text>
          </Block>
        </Block>
        {strictValidObjectWithKeys(item.isUnitUpdated) && (
          <Block flex={false} row space={'between'}>
            <Button
              icon="cancel"
              iconWithText
              style={{width: wp(44)}}
              onPress={() =>
                navigate(RouteNames.REJECT_UNIT_SCREEN, {
                  buttonText: 'Reject Unit',
                  header: 'Reject Pending Unit',
                  navType: 'reject_pending_unit',
                  data: item,
                  status: 'changes',
                })
              }
              color={'accent'}>
              Reject Changes
            </Button>
            <Button
              style={{width: wp(44)}}
              onPress={() =>
                navigate(RouteNames.CONFIRM_CHANGES_SCREEN, {
                  header: 'Confirm Unit Changes',
                  subtitle: 'Are you sure you want to confirm unit ?',
                  data: item,
                  status: 'changes',
                  navType: 'current',
                })
              }
              color={'primary'}>
              Confirm Changes
            </Button>
          </Block>
        )}
        {item.status === 'active' && (
          <Button
            isLoading={isLoading}
            onPress={() => onSubmit()}
            color={'primary'}>
            Deactivate Unit
          </Button>
        )}
        {item.status === 'pending' && (
          <Block flex={false} row space={'between'}>
            <Button
              icon="cancel"
              iconWithText
              style={{width: wp(44)}}
              onPress={() =>
                navigate(RouteNames.REJECT_UNIT_SCREEN, {
                  buttonText: 'Reject Unit',
                  header: 'Reject Pending Unit',
                  navType: 'reject_pending_unit',
                  data: item,
                  status: 'unit',
                })
              }
              color={'accent'}>
              Reject Unit
            </Button>
            <Button
              style={{width: wp(44)}}
              onPress={() =>
                navigate(RouteNames.CONFIRM_CHANGES_SCREEN, {
                  header: 'Confirm Unit',
                  subtitle: 'Are you sure you want to confirm unit ?',
                  data: item,
                  status: 'unit',
                  navType: 'current',
                })
              }
              color={'primary'}>
              Confirm Unit
            </Button>
          </Block>
        )}
      </Block>
    );
  };
  return (
    <Block primary>
      {!refreshing && loading ? (
        <DefaultSkeleton data={[1]} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Block defaultPadding flex={false}>
            {strictValidObjectWithKeys(data) ? (
              _renderItem(data)
            ) : (
              <EmptyUnit />
            )}
          </Block>
        </ScrollView>
      )}
    </Block>
  );
};

export default CurrentUnit;
