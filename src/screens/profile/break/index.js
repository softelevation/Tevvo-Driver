import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {light} from 'src/components/theme/colors';
import ToggleSwitch from 'src/components/toggle';
import {
  Block,
  Button,
  CustomButton,
  hp,
  ImageComponent,
  Text,
  wp,
} from '_elements';
import {RouteNames} from '_routeName';
const initialState = {
  breakVal: false,
};
const BreakTime = () => {
  const [state, setstate] = useState(initialState);
  const {breakVal} = state;
  const navigation = useNavigation();
  return (
    <Block primary defaultPadding>
      <Block padding={[hp(2), 0, 0]} flex={false} row center space={'between'}>
        <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
          <ImageComponent name="calendar_green" height={24} width={24} />
          <Text size={16} margin={[0, 0, 0, wp(5)]}>
            Break
          </Text>
        </Block>
        <ToggleSwitch
          isOn={breakVal}
          onColor={light.secondary}
          offColor={light.headerColor}
          label=""
          labelStyle={{color: 'black', fontWeight: '900'}}
          size="small"
          onToggle={(isOn) =>
            setstate({
              ...state,
              breakVal: isOn,
            })
          }
        />
      </Block>
      {breakVal && (
        <>
          <Block margin={[hp(1), 0, hp(1), wp(11)]} flex={false}>
            <Block margin={[hp(0.5), 0, hp(2)]} center flex={false} row>
              <Text style={{width: wp(10)}} size={16}>
                Start
              </Text>
              <CustomButton
                color={'#FAFAFA'}
                borderWidth={1}
                borderColor={'#EBEBEB'}
                margin={[0, 0, 0, wp(4)]}
                flex={1}
                row
                padding={[hp(1.5), wp(3)]}
                center
                space={'between'}>
                <Text>0941</Text>
                <ImageComponent name="month_calendar" height={20} width={20} />
              </CustomButton>
            </Block>
            <Block margin={[0, 0, hp(2.5)]} center flex={false} row>
              <Text style={{width: wp(10)}} size={16}>
                End
              </Text>
              <CustomButton
                color={'#FAFAFA'}
                borderWidth={1}
                borderColor={'#EBEBEB'}
                margin={[0, 0, 0, wp(4)]}
                flex={1}
                row
                padding={[hp(1.5), wp(3)]}
                center
                space={'between'}>
                <Text>1041 (+1h)</Text>
                <ImageComponent name="month_calendar" height={20} width={20} />
              </CustomButton>
            </Block>

            <Block flex={false} row space={'between'}>
              <Text size={16}>Break End Alarm</Text>
              <ToggleSwitch
                isOn={breakVal}
                onColor={light.secondary}
                offColor={light.headerColor}
                label=""
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="small"
                onToggle={(isOn) =>
                  setstate({
                    ...state,
                    breakVal: isOn,
                  })
                }
              />
            </Block>
            <Block margin={[hp(3), 0]} flex={false} row space={'between'}>
              <Text size={16}>Start Alarm 5 minutes earlier</Text>
              <ToggleSwitch
                isOn={breakVal}
                onColor={light.secondary}
                offColor={light.headerColor}
                label=""
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="small"
                onToggle={(isOn) =>
                  setstate({
                    ...state,
                    breakVal: isOn,
                  })
                }
              />
            </Block>
            <Button
              onPress={() =>
                navigation.navigate(RouteNames.ACTIVITY_LOG_SCREEN)
              }
              icon={'save_icon'}
              iconColor="#fff"
              iconWithText
              color={'primary'}>
              Save
            </Button>
          </Block>
        </>
      )}
    </Block>
  );
};

export default BreakTime;
