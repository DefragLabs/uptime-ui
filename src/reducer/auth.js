import ActionTypes from '../constants/action-type';

export const initialState =  {
  isLoading: false
};

const auth = (state=initialState, action)=> {

  if (!action.type) {
    console.log('Payload missing a type!', action);
  }

  switch (action.type) {

    case ActionTypes.LOGIN_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }

    case ActionTypes.RECEIVE_LOGIN_REQUEST_SUCCESS: {
      const userSession = {
        token: action.response.data.token
      };
      return { ...state, userSession };
    }

    case ActionTypes.RECEIVE_LOGIN_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    case ActionTypes.LOGOUT_REQUEST_ATTEMPTED: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ActionTypes.RECEIVE_LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        userSession: null,
        isLoading: false
       };
    }

    default:{
      return state;
    }
  };

};

export default auth;