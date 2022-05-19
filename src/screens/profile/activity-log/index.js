/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Block, hp, ImageComponent, Text, wp} from '_elements';
import {FlatList, RefreshControl} from 'react-native';
import {encrypted, formatDate, formatTime} from 'src/utils/commonUtils';
import EmptyUnit from 'src/common/empty-unit';
import {useFocusEffect} from '@react-navigation/native';
import {activityLogsRequest} from 'src/redux/unit/activity/action';
import {STATUS_URL} from 'src/utils/config';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import DefaultSkeleton from 'src/components/defaultskeleton';
import {flatlistStyle} from 'src/assets/styles/flatlist';

const ActivityLog = () => {
  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(false);
  const [loading, data, isSuccess] = useSelector((v) => [
    v.unit.activityLogs.loading,
    v.unit.activityLogs.data,
    v.unit.activityLogs.isSuccess,
  ]);

  const currentApiCall = () => {
    const statusData = {status: STATUS_URL.Complete_Status};
    const encryptedData = encrypted(statusData);
    dispatch(activityLogsRequest(encryptedData));
  };

  useFocusEffect(
    React.useCallback(() => {
      currentApiCall();
    }, []),
  );

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    currentApiCall();
  };

  const _renderItem = ({item}) => {
    return (
      <Block margin={[hp(1), 0, hp(0)]} flex={false}>
        <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
          <ImageComponent name="calendar" height={25} width={25} />
          <Block flex={false}>
            <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
              Shift Date-Time
            </Text>
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            Start
          </Text>
          <Block margin={[0, 0, 0, wp(3)]} flex={false}>
            <Block row flex={false}>
              <Text style={{width: wp(28)}} height={28} semibold size={18}>
                {formatDate(item.start_time)}
              </Text>
            </Block>
            <Block row flex={false}>
              <Text style={{width: wp(28)}} height={28} semibold size={18}>
                {formatTime(item.start_time)}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            End
          </Text>
          <Block margin={[0, 0, 0, wp(4)]} flex={false}>
            <Block row flex={false}>
              <Text style={{width: wp(28)}} height={28} semibold size={18}>
                {formatDate(item.end_time)}
              </Text>
            </Block>

            <Block row flex={false}>
              <Text style={{width: wp(28)}} height={28} semibold size={18}>
                {formatTime(item.end_time)}
              </Text>
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
        <Block margin={[hp(0.5), 0, hp(1), wp(7)]} flex={false} row>
          <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
            Code
          </Text>
          <Block flex={false}>
            <Text height={28} semibold size={18} margin={[0, 0, 0, wp(3)]}>
              {item.vehicle_code}
            </Text>
          </Block>
        </Block>

        <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
          <ImageComponent
            name={
              item.status === 'inactive' ? 'status_success' : 'status_failed'
            }
            height={25}
            width={25}
          />
          <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
            Status
          </Text>
        </Block>
        <Block margin={[hp(0.5), 0, hp(1), wp(7)]} flex={false} row>
          <Text height={20} grey size={14} margin={[0, 0, 0, wp(3)]}>
            {item.status === 'inactive'
              ? 'Unit is inactive'
              : item.reason || 'N/A'}
          </Text>
        </Block>
        <Block
          margin={[hp(1), 0]}
          borderColor={'#C5C5C7'}
          borderWidth={[0, 0, 1, 0]}
        />
      </Block>
    );
  };
  return (
    <Block primary>
      {!refreshing && loading ? (
        <DefaultSkeleton />
      ) : (
        <Block defaultPadding flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={_renderItem}
            contentContainerStyle={flatlistStyle.containerStyle}
            ListEmptyComponent={
              <EmptyUnit header={'No Activity Logs'} subtitle={''} />
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </Block>
      )}
    </Block>
  );
};

export default ActivityLog;
