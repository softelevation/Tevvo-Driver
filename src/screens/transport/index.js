/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {Alert, AppState, Linking, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputStyle} from 'src/assets/styles/flatlist';
import EmptyUnit from 'src/common/empty-unit';
import SkeletonComponent from 'src/components/skeleton';
import {
  socketTransportRequest,
  transportRequest,
} from 'src/redux/transport/action';
import {
  encrypted,
  formatDateTime,
  formatDOB,
  strictValidArray,
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
  strictValidString,
} from 'src/utils/commonUtils';
import {Block, Button, hp, ImageComponent, Text, wp} from '_elements';
import {RouteNames} from '_routeName';
import io from 'socket.io-client';
import {API_URL} from 'src/utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dialog, Portal, Button as ButtonPaper} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {apiCall} from 'src/redux/store/api-client';
import {light} from 'src/components/theme/colors';
import {openMaps} from 'src/utils/mobile-utils';
import TimeZone from 'react-native-timezone';
import {profileRequest} from 'src/redux/login/action';
import {transportStatus} from '_constants';
import BackgroundTimer from 'react-native-background-timer';
import {SocketContext} from 'src/utils/socketContext';

const Transport = () => {
  const [reject, setReject] = useState('');
  const [dob, setDob] = useState('');
  const [statusVal, setStatus] = useState('');
  const [refreshing, setrefreshing] = useState(false);
  const [trefreshing, settrefreshing] = useState(false);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isloading, setloading] = useState(false);
  const [socketloading, setSocketloading] = useState(false);
  const appState = useRef(AppState.currentState);
  const socketContext = useContext(SocketContext);
  var interval;
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(formatDOB(date));
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [data, loading, user] = useSelector((v) => [
    v.transport.transport.data,
    v.transport.transport.loading,
    v.auth.login.profile,
  ]);

  const setType = async (status) => {
    const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
    setStatus(status);
    setSocketloading(true);
    setReject('');
    const token = await AsyncStorage.getItem('token');
    const id = data.id;
    const objData = {
      status: status,
      reason: reject,
      id: id,
      token: token,
      timezone: timeZone,
    };
    socketContext.emit('transport', objData);
    setReject('');
  };
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    dispatch(socketTransportRequest());
  };

  const rejectUnitConfirm = async () => {
    const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
    const token = await AsyncStorage.getItem('token');
    const objData = {
      status: 'confirm_dob',
      reason: reject,
      id: data.id,
      token: token,
      timezone: timeZone,
    };
    if (strictValidString(dob)) {
      setloading(true);
      const val = {
        id: data.id,
        status: 'confirm_dob',
        dob: dob,
      };
      const encryptedData = encrypted(val);
      const res = await apiCall('POST', API_URL.VERIFYDOB_URL, encryptedData);
      if (res.status === 1) {
        setloading(false);
        hideDialog();
        dispatch(transportRequest());
        Alert.alert('Patient has been sucessfully verified');
        socketContext.emit('transport', objData);
      } else if (res.status === 0) {
        Alert.alert('Invalid Date of birth please verify again');
        setloading(false);
      }
    } else {
      Alert.alert('Please Choose Valid Date of Birth');
    }
  };
  useEffect(() => {
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socketContext.on(`transport_${user.driver_id}`, (msg) => {
        console.log(`transport_${user.driver_id}`);
        setSocketloading(false);
        settrefreshing(true);
        onRefresh();
        setTimeout(() => {
          settrefreshing(false);
        }, 6000);
      });
    }
  }, []);

  useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socketContext.emit('clear_badge', {driver_id: user.driver_id});
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(transportRequest());
    }, []),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatch(transportRequest());
        BackgroundTimer.clearInterval(interval);
      } else {
        interval = BackgroundTimer.setInterval(() => {
          console.log('connection status ', socketContext.connected);
          socketContext.emit('online', {});
        }, 5000);
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    dispatch(profileRequest());
  }, []);
  const renderDialog = () => {
    return (
      <Block flex={false}>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>Please Confirm DOB </Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder={'Date Of Birth *'}
                label={'Date Of Birth *'}
                value={dob}
                onChangeText={(value) => setDob(value)}
                editable={false}
                mode="outlined"
                style={[TextInputStyle.containerStyle]}
                right={
                  <TextInput.Icon
                    onPress={() => showDatePicker()}
                    name={() => (
                      <ImageComponent
                        name={'calendar'}
                        height={20}
                        width={20}
                      />
                    )}
                  />
                }
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <ButtonPaper
                color={light.danger}
                onPress={() => {
                  hideDialog();
                }}>
                Cancel
              </ButtonPaper>
              <ButtonPaper
                color={light.secondary}
                onPress={() => {
                  rejectUnitConfirm();
                }}>
                {isloading ? <ActivityIndicator /> : 'Verify'}
              </ButtonPaper>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Block>
    );
  };

  const renderCode = (code) => {
    switch (code) {
      case 'dispatch_requested':
        return 'Dispatch Requested';
      case 'accepted':
        return 'Accepted';
      case 'en_route':
        return 'En Route';
      case 'arrived_at_pick_up':
        return 'Arrived at Pick-up';
      case 'confirm_dob':
        return 'Confirmed DOB';
      case 'patient_loaded':
        return 'Patient Loaded';
      case 'arrived_at_drop_off':
        return 'Arrived at Drop-off';
      default:
        return code;
    }
  };
  const renderButtonStatus = (code) => {
    switch (code) {
      case 'accepted':
        return 'En Route';
      case 'en_route':
        return 'Arrived at Pick-up';
      case 'arrived_at_pick_up':
        return 'Confirm DOB';
      case 'confirm_dob':
        return 'Patient Loaded';
      case 'patient_loaded':
        return 'Arrived at Drop-off';
      case 'arrived_at_drop_off':
        return 'Completed';
      default:
        return code;
    }
  };
  const renderClick = (code) => {
    switch (code) {
      case 'accepted':
        return setType('en_route');
      case 'en_route':
        return setType('arrived_at_pick_up');
      case 'arrived_at_pick_up':
        return setType('patient_loaded');
      case 'confirm_dob':
        return setType('patient_loaded');
      case 'patient_loaded':
        return setType('arrived_at_drop_off');
      case 'arrived_at_drop_off':
        return setType('completed');
      default:
        return setType(code);
    }
  };

  const renderTypes = (title, subtitle, link) => {
    return (
      <Block margin={[hp(1.5), 0, 0]} row space={'between'} flex={false}>
        <Text style={{width: wp(40)}} black semibold>
          {title}
        </Text>
        <Text
          disabled={!link}
          onPress={() => {
            Linking.openURL(`tel:${subtitle}`);
          }}
          link={link}
          right
          style={{width: wp(50)}}
          grey
          semibold>
          {subtitle}
        </Text>
      </Block>
    );
  };
  const renderLocationTypes = (title, subtitle, lat, lng) => {
    return (
      <Block margin={[hp(1.5), 0, 0]} row space={'between'} flex={false}>
        <Text style={{width: wp(40)}} black semibold>
          {title}
        </Text>
        <Text
          link={subtitle !== 'N/A'}
          disabled={subtitle === 'N/A'}
          onPress={() => {
            openMaps(lat, lng, title);
          }}
          right
          style={{width: wp(50)}}
          grey
          semibold>
          {subtitle}
        </Text>
      </Block>
    );
  };
  const renderArrayTypes = (title, subtitle, link) => {
    return (
      <Block center margin={[hp(2), 0, 0]} row space={'between'} flex={false}>
        <Text style={{width: wp(30)}} black semibold>
          {title}
        </Text>
        <Block flex={false}>
          {subtitle.map((b, index) => {
            return (
              <Text
                margin={[0, 0, hp(1)]}
                disabled={!link}
                onPress={() => {
                  Linking.openURL(`tel:${b}`);
                }}
                link={link}
                right
                style={{width: wp(60)}}
                grey
                semibold>
                {strictValidString(b) ? b : 'N/A'}
              </Text>
            );
          })}
        </Block>
      </Block>
    );
  };

  const renderSkeleton = (val = false) => {
    return (
      <Block margin={[hp(1.5), 0, 0]} row space={'between'} flex={false}>
        <SkeletonComponent
          style={{width: wp(45), height: val ? hp(6) : hp(1.5)}}
        />
        <SkeletonComponent
          style={{width: wp(45), height: val ? hp(6) : hp(1.5)}}
        />
      </Block>
    );
  };

  const noShowAlert = () => {
    //
    Alert.alert(
      'Alert',
      'The patient is not at the location. Press YES to confirm and end the transport. Press NO to return to the application without ending the transport.',
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            setType('noshow');
          },
        },
      ],
    );
  };

  return (
    <Block defaultPadding={true} primary={true}>
      {/* <Button
        onPress={() => {
          const socket = io(API_URL.BASE_URL);
          socket.emit('trip_cancelled', 32);
        }}
        color={'primary'}>
        Test Socket
      </Button> */}
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing && !trefreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        bounce={false}>
        <Block margin={[hp(2), 0, hp(2)]} flex={false}>
          {!refreshing && loading && (
            <>
              <Block flex={false} row center space={'between'}>
                <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
                  <SkeletonComponent
                    style={{
                      height: 26,
                      width: 26,
                      borderRadius: 26,
                      marginRight: wp(3),
                    }}
                  />
                  <SkeletonComponent style={{width: wp(30)}} />
                </Block>
              </Block>
              <Block
                margin={[hp(1), 0, hp(1.5)]}
                borderColor={'#C5C5C7'}
                borderWidth={[0, 0, 1, 0]}
              />
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
              <Block
                margin={[hp(2), 0, hp(1.5)]}
                borderColor={'#C5C5C7'}
                borderWidth={[0, 0, 1, 0]}
              />
              <SkeletonComponent
                style={{
                  height: hp(15),
                  width: wp(90),
                }}
              />
              {renderSkeleton(true)}
            </>
          )}

          <>
            {(refreshing || !loading) && strictValidObjectWithKeys(data) && (
              <>
                <Block flex={false} row center space={'between'}>
                  <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
                    <ImageComponent
                      name={
                        data?.status === 'planned'
                          ? 'pending_unit'
                          : 'active_unit'
                      }
                      height={26}
                      width={26}
                    />
                    <Text grey margin={[0, 0, 0, wp(3)]}>
                      Status :{' '}
                      <Text size={15} semibold black>
                        {strictValidString(data.status)
                          ? transportStatus(data.status)
                          : 'N/A'}
                      </Text>
                    </Text>
                  </Block>
                </Block>
                <Block
                  margin={[hp(1), 0, hp(1.5)]}
                  borderColor={'#C5C5C7'}
                  borderWidth={[0, 0, 1, 0]}
                />
                {renderTypes(
                  'Leg Id',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.leg_id)
                    ? data.base_trip.leg_id
                    : 'N/A',
                )}
                {renderTypes(
                  'Pick-up Time',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.pick_up_date_time)
                    ? formatDateTime(data.base_trip.pick_up_date_time)
                    : 'N/A',
                )}
                {renderLocationTypes(
                  'Pick-up',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.trip_pickup_location)
                    ? data.base_trip.trip_pickup_location
                    : 'N/A',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.pickup_lat) &&
                    data.base_trip.pickup_lat,
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.pickup_lng) &&
                    data.base_trip.pickup_lng,
                )}
                {renderLocationTypes(
                  'Drop-off',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.trip_dropoff_location)
                    ? data.base_trip.trip_dropoff_location
                    : 'N/A',
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.dropoff_lat) &&
                    data.base_trip.dropoff_lat,
                  strictValidObjectWithKeys(data.base_trip) &&
                    strictValidString(data.base_trip.dropoff_lng) &&
                    data.base_trip.dropoff_lng,
                )}
                {renderTypes(
                  'Patient',
                  strictValidObjectWithKeys(data.base_patient) &&
                    strictValidString(data.base_patient.first_name)
                    ? `${data.base_patient.last_name}, ${data.base_patient.first_name}`
                    : 'N/A',
                )}
                {renderTypes(
                  'Account',
                  strictValidObjectWithKeys(data.corporate_account) &&
                    strictValidString(data.corporate_account.name)
                    ? `${data.corporate_account.name}`
                    : 'N/A',
                )}
                {renderTypes(
                  'Account Contact',
                  strictValidObjectWithKeys(data.corporate_contact) &&
                    strictValidString(data.corporate_contact.first_name)
                    ? `${data.corporate_contact.last_name}, ${data.corporate_contact.first_name}`
                    : 'N/A',
                )}
                {renderArrayTypes(
                  'Contact Tel No.',
                  strictValidObjectWithKeys(data.corporate_contact) &&
                    strictValidArray(data.corporate_contact.phone_number)
                    ? data.corporate_contact.phone_number
                    : 'N/A',
                  true,
                )}
                {renderTypes(
                  'Emergency No.',
                  strictValidObjectWithKeys(data.base_patient) &&
                    strictValidString(data.base_patient.phone)
                    ? `${data.base_patient.phone}`
                    : 'N/A',
                  true,
                )}
                {renderTypes(
                  'Room No.',
                  strictValidObjectWithKeys(data.base_patient) &&
                    strictValidString(data.base_patient.room_no)
                    ? `${data.base_patient.room_no}`
                    : 'N/A',
                )}
                {renderTypes(
                  'Weight',
                  strictValidObjectWithKeys(data.base_patient) &&
                    strictValidString(data.base_patient.weight)
                    ? `${data.base_patient.weight}`
                    : 'N/A',
                )}
                {renderTypes(
                  'Notes',
                  strictValidObjectWithKeys(data.base_patient) &&
                    strictValidString(data.base_patient.description)
                    ? `${data.base_patient.description}`
                    : 'N/A',
                )}
                {renderTypes('Trip Info', `${data.capability}` || 'N/A')}
                {strictValidArrayWithLength(data.question) &&
                  data.question.map((b) => {
                    return <>{renderTypes(b.question, 'Yes')}</>;
                  })}

                <Block
                  margin={[hp(2), 0, hp(1.5)]}
                  borderColor={'#C5C5C7'}
                  borderWidth={[0, 0, 1, 0]}
                />
                {strictValidObjectWithKeys(data) &&
                  data.status === 'dispatch_requested' && (
                    <TextInput
                      placeholder={'Reject Reason *'}
                      value={reject}
                      onChangeText={(value) => setReject(value)}
                      mode="outlined"
                      multiline={true}
                      numberOfLines={4}
                      style={[TextInputStyle.containerStyle, {height: hp(15)}]}
                      textAlignVertical="top"
                    />
                  )}
                {strictValidObjectWithKeys(data) &&
                  data.status === 'dispatch_requested' && (
                    <Block
                      margin={[hp(1), 0]}
                      flex={false}
                      row
                      space={'between'}>
                      <Button
                        disabled={!strictValidString(reject)}
                        icon="cancel"
                        iconWithText
                        style={{width: wp(44)}}
                        onPress={() => setType('rejected')}
                        isLoading={socketloading && statusVal === 'rejected'}
                        color={'accent'}>
                        Reject
                      </Button>
                      <Button
                        onPress={() => setType('accepted')}
                        disabled={strictValidString(reject)}
                        style={{width: wp(44)}}
                        isLoading={socketloading}
                        color={'primary'}>
                        Accept
                      </Button>
                    </Block>
                  )}
                {strictValidObjectWithKeys(data) &&
                  data.status !== 'dispatch_requested' && (
                    <Block margin={[hp(1), 0]} flex={false}>
                      <Button
                        isLoading={socketloading}
                        onPress={() => {
                          if (
                            renderButtonStatus(data.status) === 'Confirm DOB'
                          ) {
                            showDialog();
                          } else {
                            renderClick(data.status);
                          }
                        }}
                        disabled={strictValidString(reject)}
                        color={'primary'}>
                        {renderButtonStatus(data.status)}
                      </Button>
                      {renderButtonStatus(data.status) === 'Confirm DOB' && (
                        <Button
                          onPress={() => noShowAlert()}
                          isLoading={socketloading && statusVal === 'noshow'}
                          icon="cancel"
                          iconWithText
                          color={'accent'}>
                          No Show
                        </Button>
                      )}
                      <Button
                        onPress={() =>
                          navigate(RouteNames.ABORT_TRANSPORT_SCREEN, {
                            data: data,
                          })
                        }
                        icon="cancel"
                        iconWithText
                        color={'accent'}>
                        Abort
                      </Button>
                    </Block>
                  )}
              </>
            )}
            {!loading && !strictValidObjectWithKeys(data) && (
              <EmptyUnit
                header={'No Transport Active or Requested'}
                subtitle=""
              />
            )}
          </>
        </Block>
      </KeyboardAwareScrollView>
      {renderDialog()}
    </Block>
  );
};

export default Transport;

// 1. Skeleton Api Call ---- True
// 1. Data Api Call ----false
// 1. Empty unit Api Call ---- false
