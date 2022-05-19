import React from 'react';
import {FlatList} from 'react-native';
import {Block, CustomButton, hp, ImageComponent, Text, wp} from '_elements';
import PropTypes from 'prop-types';
import {light} from 'src/components/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '_routeName';
import {
  formatDate,
  formatTime,
  strictValidObjectWithKeys,
} from 'src/utils/commonUtils';
import EmptyUnit from '../empty-unit';
import {flatlistStyle} from 'src/assets/styles/flatlist';
const PlanningCards = ({data, refreshControl, subtitleText, headerText}) => {
  const {navigate} = useNavigation();
  const _renderItem = ({item}) => {
    return (
      <CustomButton
        activeOpacity={0.9}
        flex={false}
        onPress={() =>
          navigate(RouteNames.UNIT_DETAILS_SCREEN, {
            data: item,
          })
        }>
        <Block margin={[hp(2), 0, hp(2)]} flex={false}>
          <Block flex={false} row center space={'between'}>
            <Block padding={[0, 0, hp(1), 0]} flex={false} row center>
              <ImageComponent name="calendar_green" height={26} width={26} />
              <Text semibold size={16} margin={[0, 0, 0, wp(3)]}>
                {item.driver_name} — {item.vehicle_code}
              </Text>
            </Block>
            <ImageComponent name="arrow_forward_green" height={24} width={24} />
          </Block>
          <Block
            margin={[hp(1), 0, hp(1.5)]}
            borderColor={'#C5C5C7'}
            borderWidth={[0, 0, 1, 0]}
          />
          <Block margin={[hp(0.5), 0, 0]} flex={false} row center>
            <ImageComponent name="calendar" height={25} width={25} />
            <Text grey size={14} margin={[0, 0, 0, wp(3)]}>
              Shift Date-Time
            </Text>
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
                    <ImageComponent
                      name="arrow_forward"
                      height={25}
                      width={25}
                      // color={light.secondary}
                    />
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
                    <ImageComponent
                      name="arrow_forward"
                      height={25}
                      width={25}
                    />
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
                    <ImageComponent
                      name="arrow_forward"
                      height={25}
                      width={25}
                    />
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
                    <ImageComponent
                      name="arrow_forward"
                      height={25}
                      width={25}
                    />
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
          <Block margin={[hp(0.5), 0, 0, wp(7)]} flex={false} row>
            <Text height={28} grey size={14} margin={[0, 0, 0, wp(3)]}>
              Code
            </Text>
            <Block flex={false}>
              <Text height={28} semibold size={18} margin={[0, 0, 0, wp(3)]}>
                {item.vehicle_code}
              </Text>
            </Block>
          </Block>
          <Block
            margin={[hp(2), 0, 0]}
            borderColor={light.secondary}
            borderWidth={[0, 0, 1, 0]}
          />
        </Block>
      </CustomButton>
    );
  };
  return (
    <Block defaultPadding flex={1}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={_renderItem}
        contentContainerStyle={flatlistStyle.containerStyle}
        refreshControl={refreshControl}
        ListEmptyComponent={
          <EmptyUnit header={headerText} subtitle={subtitleText} />
        }
      />
    </Block>
  );
};
PlanningCards.defaultProps = {
  data: [],
};

PlanningCards.propTypes = {
  data: PropTypes.array,
};

export default PlanningCards;
