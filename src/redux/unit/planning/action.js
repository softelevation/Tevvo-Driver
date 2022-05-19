import {ActionConstants} from '../../constants';
// Agent List
export const planningRequest = (payload) => {
  return {
    type: ActionConstants.PLANNING_REQUEST,
    payload,
  };
};
export const planningSuccess = (data) => {
  return {
    type: ActionConstants.PLANNING_SUCCESS,
    data,
  };
};
export const planningError = (error) => {
  return {
    type: ActionConstants.PLANNING_ERROR,
    error,
  };
};
