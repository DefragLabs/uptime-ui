import axios from 'axios';
import {
  revieveRegisterResponse,
  receiveLoginSuccess , 
  receiveLoginFailure, 
  receiveLogoutSuccess
} from '../actions/app-actions';
import { getAuthToken } from '../helpers/auth-helpers';

export function apiEndPoint() {
  // return `${window.location.protocol}//${window.location.hostname}:9999`;
  return "http://18.235.105.251/api/auth"
}

export function getHeaders(authToken) {
  if (authToken){
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Token'
    }
  }
  else{
    return{
      'Content-Type': 'application/json'
    }
  }
}

export function register(dispatch, params) {
  let url = "";
  axios.post(
    url,
    params,{
      headers: getHeaders(),
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(revieveRegisterResponse(successResponse));
  })
  .catch(error => {
    if (error) {
      const errorResponse = error.response;
      dispatch(revieveRegisterResponse(errorResponse));
    }
  });
};

export function login(dispatch, params) {
  let url = `${apiEndPoint()}/login`;
  axios.post(
    url,
    params,{
      headers: getHeaders(),
    }
  )
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveLoginSuccess(successResponse));
  })
  .catch(error => {
    if(error){
      const errorResponse = error.response;
      dispatch(receiveLoginFailure(errorResponse));
    }
  })
}

export function logout(dispatch) {
  let url = `${apiEndPoint()}/logout`;
  axios.delete(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const logoutResponse = response.data;
    dispatch(receiveLogoutSuccess(logoutResponse));
  })
  .catch(error => {
    if (error.response.status === 401) {
      logout(dispatch);
    }
  });
};