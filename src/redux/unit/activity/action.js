import {ActionConstants} from '../../constants';
// Agent List
export const activityLogsRequest = (payload) => {
  return {
    type: ActionConstants.ACTIVITY_LOGS_REQUEST,
    payload,
  };
};
export const activityLogsSuccess = (data) => {
  return {
    type: ActionConstants.ACTIVITY_LOGS_SUCCESS,
    data,
  };
};
export const activityLogsError = (error) => {
  return {
    type: ActionConstants.ACTIVITY_LOGS_ERROR,
    error,
  };
};
export const activityLogsFlush = () => {
  return {
    type: ActionConstants.ACTIVITY_LOGS_FLUSH,
  };
};
