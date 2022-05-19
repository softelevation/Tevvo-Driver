import {ActionConstants} from '../../constants';

const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function planning(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.PLANNING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.PLANNING_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        isSuccess: true,
      };
    case ActionConstants.PLANNING_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default planning;
