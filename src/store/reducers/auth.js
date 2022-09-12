import { AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  status_auth: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        status_auth: action.params.status_auth,
      };

    default:
      return state;
  }
}
