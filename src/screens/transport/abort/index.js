/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {io} from 'socket.io-client';
import {TextInputStyle} from 'src/assets/styles/flatlist';
import {API_URL} from 'src/utils/config';
import {Block, Text, hp, Button} from '_elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeZone from 'react-native-timezone';
const AbortTransport = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [state, setState] = useState('');
  const {params} = useRoute();
  const {data} = params;

  const rejectUnitConfirm = async (status) => {
    const timeZone = await TimeZone.getTimeZone().then((zone) => zone);
    setloading(true);
    const socket = io(API_URL.BASE_URL);
    const token = await AsyncStorage.getItem('token');
    const id = data.id;
    const objData = {
      status: status,
      reason: state,
      id: id,
      token: token,
      timezone: timeZone,
    };
    socket.emit('transport', objData);
    setTimeout(() => {
      setloading(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <Block middle primary>
      <Block margin={[hp(2), 0, 0]} defaultPadding flex={1}>
        {/* from <Text>Max Hospital</Text> to <Text>Southern Hills Hospital</Text>{' '} */}
        <Text height={24} size={16} center>
          Are you sure you want to abort the{' '}
          <Text uppercase={true} semibold>
            active
          </Text>{' '}
          transport{' '}
          <Text uppercase semibold>
            {data.base_trip.leg_id}
          </Text>{' '}
          ?
        </Text>
        <Block margin={[hp(6), 0, 0]} flex={false} />
        <TextInput
          placeholder={'Reason *'}
          value={state}
          onChangeText={(value) => setState(value)}
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          style={[TextInputStyle.containerStyle, {height: hp(15)}]}
          textAlignVertical="top"
        />
        <Block margin={[hp(3), 0, 0]} flex={false} />
        <Button
          icon="cancel"
          disabled={!state}
          iconWithText
          onPress={() => rejectUnitConfirm('aborted')}
          uppercase
          isLoading={loading}
          color={'accent'}>
          {'Abort Transport'}
        </Button>
        <Button
          onPress={() => navigation.goBack()}
          uppercase
          color={'secondary'}>
          {'Do not Abort'}
        </Button>
      </Block>
    </Block>
  );
};

export default AbortTransport;
