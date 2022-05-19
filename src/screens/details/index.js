import React from 'react';
import {Block, Button, hp, ImageComponent, Text, wp} from '_elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteNames} from '_routeName';
import {
  formatDate,
  formatTime,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
const UnitDetails = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {data} = params;
  const _renderItem = () => {
    const item = data;
    return (
      <Block margin={[hp(2), 0, hp(2)]} flex={false}>
        <Block flex={false} row center space={'between'}>
          <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
            <ImageComponent name="calendar_green" height={26} width={26} />
            <Text grey margin={[0, 0, 0, wp(3)]}>
              Status :{' '}
              <Text capitalize={true} size={15} semibold black>
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
                  buttonText: 'Reject Changes',
                  header: 'Reject Unit Changes',
                  navType: 'reject_unit',
                  data: data,
                  status: 'changes',
                })
              }
              uppercase
              color={'accent'}>
              Reject Changes
            </Button>
            <Button
              style={{width: wp(44)}}
              onPress={() =>
                navigate(RouteNames.CONFIRM_CHANGES_SCREEN, {
                  header: 'Confirm Unit Changes',
                  subtitle:
                    'Are you sure you want to confirm the changes in unit ?',
                  data: item,
                  navType: 'planned',
                  status: 'changes',
                })
              }
              uppercase
              color={'primary'}>
              Confirm Changes
            </Button>
          </Block>
        )}
        {!strictValidObjectWithKeys(item.isUnitUpdated) && (
          <Button
            onPress={() =>
              navigate(RouteNames.REJECT_UNIT_SCREEN, {
                buttonText: 'Reject Unit',
                header: 'Reject Planned Unit',
                navType: 'reject_unit',
                data: data,
                status: 'unit',
              })
            }
            uppercase
            icon="cancel"
            iconWithText
            color={'accent'}>
            Reject Unit
          </Button>
        )}
      </Block>
    );
  };
  return (
    <Block primary>
      <Block defaultPadding flex={false}>
        {_renderItem()}
      </Block>
    </Block>
  );
};

export default UnitDetails;
