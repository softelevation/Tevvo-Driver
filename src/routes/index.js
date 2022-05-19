import * as React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImageComponent} from '_elements';
import {RouteNames} from '_routeName';
import {
  SplashScreen,
  Profile,
  Planning,
  CurrentUnit,
  Login,
  UnitDetails,
  ConfirmChanges,
  RejectUnit,
  RejectConfirmChanges,
  BreakTime,
} from '_screens';
import {light} from 'src/components/theme/colors';
import ActivityLog from 'src/screens/profile/activity-log';
import {navigationRef} from './NavigationService';
import ChangePassword from 'src/screens/profile/change-password';
import {Alert, TouchableOpacity} from 'react-native';
import Notifications from 'src/screens/notifications';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from 'src/utils/config';
import {strictValidObjectWithKeys} from 'src/utils/commonUtils';
import io from 'socket.io-client';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import Transport from 'src/screens/transport';
import AbortTransport from 'src/screens/transport/abort';
import {socketTransportRequest} from 'src/redux/transport/action';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PlanningStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Planned Units',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.PLANNED_UNIT_SCREEN}
        component={Planning}
      />
      <Stack.Screen
        options={{
          title: 'Unit Details',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.UNIT_DETAILS_SCREEN}
        component={UnitDetails}
      />
      <Stack.Screen
        options={{
          title: 'Confirm Changes',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.CONFIRM_CHANGES_SCREEN}
        component={ConfirmChanges}
      />
      <Stack.Screen
        options={{
          title: 'Reject Pending Unit',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.REJECT_UNIT_SCREEN}
        component={RejectUnit}
      />
      <Stack.Screen
        options={{
          title: 'Reject Pending Unit',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.REJECT_CONFIRM_CHANGES_SCREEN}
        component={RejectConfirmChanges}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

function CurrentUnitStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Current Unit',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.CURRENT_UNIT_SCREEN}
        component={CurrentUnit}
      />
      <Stack.Screen
        options={{
          title: 'Unit Details',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
        name={RouteNames.UNIT_DETAILS_SCREEN}
        component={UnitDetails}
      />
      <Stack.Screen
        options={{
          title: 'Confirm Changes',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
        name={RouteNames.CONFIRM_CHANGES_SCREEN}
        component={ConfirmChanges}
      />
      <Stack.Screen
        options={{
          title: 'Reject Pending Unit',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.REJECT_UNIT_SCREEN}
        component={RejectUnit}
      />
      <Stack.Screen
        options={{
          title: 'Reject Pending Unit',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.REJECT_CONFIRM_CHANGES_SCREEN}
        component={RejectConfirmChanges}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'User Profile',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.USER_ACTIONS_SCREEN}
        component={Profile}
      />
      <Stack.Screen
        options={{
          title: 'Activity Log',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.ACTIVITY_LOG_SCREEN}
        component={ActivityLog}
      />
      <Stack.Screen
        options={{
          title: 'Break',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.BREAK_TIME_SCREEN}
        component={BreakTime}
      />
      <Stack.Screen
        options={{
          title: 'Change Password',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

function TranspoertStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Transport',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.TRANSPORT_SCREEN}
        component={Transport}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
      <Stack.Screen
        options={{
          title: 'Active Transport Abort',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.ABORT_TRANSPORT_SCREEN}
        component={AbortTransport}
      />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
  const [state, setState] = React.useState(null);
  const user = useSelector((v) => v.auth.login.profile);
  // const dispatch = useDispatch();
  React.useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`badge_${user.driver_id}`, (msg) => {
        if (strictValidObjectWithKeys(msg)) {
          setState(true);
        } else {
          setState(null);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const {navigate} = useNavigation();
  // const gotoTransport = () => {
  //   dispatch(socketTransportRequest());
  //   navigate(RouteNames.TRANSPORT_STACK_SCREEN);
  // };

  // const alertMessage = (msg) => {
  //   Alert.alert('Info', msg.message, [
  //     {
  //       text: 'Ok',
  //       onPress: () => {
  //         gotoTransport();
  //       },
  //     },
  //   ]);
  // };
  React.useEffect(() => {
    // const socket = io(API_URL.BASE_URL);
    // alertMessage({
    //   message: 'Removed Item',
    // });
    // if (strictValidObjectWithKeys(user) && user.driver_id) {
    //   socket.on(`trip_cancelled_driver_${user.driver_id}`, (msg) => {
    //     alertMessage(msg);
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'CurrentUnitStack') {
            iconName = focused ? 'home_selected' : 'home';
          } else if (route.name === 'PlannedStack') {
            iconName = focused ? 'planning_selected' : 'planning';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'profile_selected' : 'profile';
          } else if (route.name === 'TransportStack') {
            iconName = focused ? 'delivery_selected' : 'delivery';
          }

          // You can return any component that you like here!
          return <ImageComponent name={iconName} height={40} width={40} />;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarBadge: state,
          tabBarBadgeStyle: {
            backgroundColor: light.danger,
          },
          unmountOnBlur: true,
        }}
        name={RouteNames.TRANSPORT_STACK_SCREEN}
        component={TranspoertStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.CURRENT_UNIT_STACK_SCREEN}
        component={CurrentUnitStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.PLANNED_STACK_SCREEN}
        component={PlanningStack}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.PROFILE_STACK_SCREEN}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: light.secondary,
  },
};
function Routes() {
  const user = useSelector((state) => state.auth.login.profile);

  React.useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`notification_${user.driver_id}`, (msg) => {
        onDisplayNotification(msg);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.LOGIN_SCREEN}
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.HOME_SCREEN}
          component={HomeStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
