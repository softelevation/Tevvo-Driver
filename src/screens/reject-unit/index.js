/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Block, Button, hp, ImageComponent, Text, wp} from '_elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteNames} from '_routeName';
import {formatDate, formatTime} from 'src/utils/commonUtils';
import {TextInput} from 'react-native-paper';
import {TextInputStyle} from 'src/assets/styles/flatlist';

const RejectUnit = () => {
  const navigation = useNavigation();
  const [cont, setCont] = useState('');
  const {params} = useRoute();
  const {header, buttonText, navType, data = {}, status} = params;

  useEffect(() => {
    navigation.setOptions({title: header});
  }, []);

  const _renderItem = () => {
    const item = data;
    return (
      <Block margin={[hp(2), 0, hp(2)]} flex={false}>
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
              <Text height={28} semibold size={18}>
                {formatDate(item.start_time)}{' '}
                <Text height={28} grey size={18}>
                  at
                </Text>{' '}
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
              <Text height={28} semibold size={18}>
                {formatDate(item.end_time)}{' '}
                <Text height={28} grey size={18}>
                  at
                </Text>{' '}
                {formatTime(item.end_time)}
              </Text>
            </Block>
            <Block row flex={false}>
              <Text style={{width: wp(28)}} height={28} semibold size={18} />
            </Block>
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

        <TextInput
          // label={'Reject Reason *'}
          placeholder={'Reject Reason *'}
          value={cont}
          onChangeText={(value) => setCont(value)}
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          style={[TextInputStyle.containerStyle, {height: hp(15)}]}
          textAlignVertical="top"
        />
        <Block margin={[hp(1), 0]} />
        <Button
          disabled={!cont}
          icon="cancel"
          iconWithText
          onPress={() => {
            if (navType === 'reject_changes') {
              navigation.navigate(RouteNames.REJECT_CONFIRM_CHANGES_SCREEN, {
                text: 'reject the changes',
                buttonText: buttonText,
                header: header,
                data: data,
                navType: navType,
                reason: cont,
                status: status,
              });
            } else {
              navigation.navigate(RouteNames.REJECT_CONFIRM_CHANGES_SCREEN, {
                text: 'reject the unit',
                buttonText: buttonText,
                header: header,
                data: data,
                navType: navType,
                reason: cont,
                status: status,
              });
            }
          }}
          uppercase
          color={'accent'}>
          {buttonText}
        </Button>
      </Block>
    );
  };
  return (
    <Block primary>
      <Block defaultPadding flex={false}>
        {_renderItem(data)}
      </Block>
    </Block>
  );
};

export default RejectUnit;
