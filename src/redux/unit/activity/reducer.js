import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function activityLogs(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.ACTIVITY_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.ACTIVITY_LOGS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        isSuccess: true,
      };
    case ActionConstants.ACTIVITY_LOGS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionConstants.ACTIVITY_LOGS_FLUSH:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: '',
      };

    default:
      return state;
  }
}

export default activityLogs;
