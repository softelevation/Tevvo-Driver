/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {AppState, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PlanningCards from 'src/common/planning-cards';
import DefaultSkeleton from 'src/components/defaultskeleton';
import {planningRequest} from 'src/redux/unit/planning/action';
import {encrypted, strictValidObjectWithKeys} from 'src/utils/commonUtils';
import {API_URL, STATUS_URL} from 'src/utils/config';
import {Block} from '_elements';
import io from 'socket.io-client';
import {useFocusEffect} from '@react-navigation/native';

const Planning = () => {
  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(false);
  const [loading, data, user] = useSelector((v) => [
    v.unit.planning.loading,
    v.unit.planning.data,
    v.auth.login.profile,
  ]);
  const appState = useRef(AppState.currentState);

  const currentApiCall = () => {
    const statusData = {status: STATUS_URL.Planned_Status};
    const encryptedData = encrypted(statusData);
    dispatch(planningRequest(encryptedData));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        currentApiCall();
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
      currentApiCall();
    }, []),
  );

  React.useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`driver_id_${user.driver_id}`, (msg) => {
        currentApiCall();
      });
    }
  }, []);

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    currentApiCall();
  };
  return (
    <Block primary>
      {!refreshing && loading ? (
        <DefaultSkeleton />
      ) : (
        <PlanningCards
          data={data}
          headerText={'No Planned Units'}
          subtitleText={''}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Block>
  );
};

export default Planning;
