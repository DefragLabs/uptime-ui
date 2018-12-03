import ActionTypes from '../constants/action-type';

import { register, login , logout } from '../utils/app-api-utils';
import { getErrorMessage } from '../utils/string-utils';

export function requestRegister(params) {
  return(dispatch) => {
    register(dispatch, params);
  }
}

export function revieveRegisterResponse(response) {
  if (response.data.hasOwnProperty('success') && !response.data.success){
    response.isSuccess = false;
    response.isError = true;
    response.response = getErrorMessage(response.data.error);
  } else {
    response.isSuccess = true;
    response.isError = false;
    response.response = response.data;
  }
  return{
    type: ActionTypes.RECEIVE_REGISTER_RESPONSE,
    response
  }
}

// Login
export function requestLogin(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST_ATTEMPTED,
    })
    login(dispatch, params);
  }
}

export function receiveLoginSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_LOGIN_REQUEST_SUCCESS,
    response
  }
}

export function receiveLoginFailure(response) {
  return{
    type: ActionTypes.RECEIVE_LOGIN_REQUEST_FAILURE,
    response
  }
}

// Logout
export function requestLogout(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.LOGOUT_REQUEST_ATTEMPTED,
    })
    logout(dispatch, params);
  }
}

export function receiveLogoutSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_LOGOUT_REQUEST_SUCCESS,
    response
  }
}

export function receiveLogoutFailure(response) {
  return{
    type: ActionTypes.RECEIVE_LOGOUT_REQUEST_FAILURE,
    response
  }
}