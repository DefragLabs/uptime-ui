import axios from 'axios';
import {
  revieveRegisterResponse,
  receiveLoginSuccess , 
  receiveLoginFailure, 
  receiveLogoutSuccess, 
  receiveMonitoringUrlsSuccess,
  receiveMonitoringUrlsFailure, 
  receiveAddMonitoringUrlsSuccess, 
  receiveAddMonitoringUrlsFailure, 
  receiveDeleteMonitoringUrlsSuccess, 
  receiveDeleteMonitoringUrlsFailure, 
  receiveGetUrlDetailsSuccess,
  receiveGetUrlDetailsFailure
} from '../actions/app-actions';
import { getAuthToken } from '../helpers/auth-helpers';

export function apiEndPoint() {
  // return `${window.location.protocol}//${window.location.hostname}:9999`;
  return "http://18.235.105.251/api"
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
  let url = `${apiEndPoint()}/auth/login`;
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
  let url = `${apiEndPoint()}/auth/logout`;
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

export function getMonitoringUrls(dispatch, params) {
  let url = `${apiEndPoint()}/monitoring-urls`;
  axios.get(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveMonitoringUrlsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveMonitoringUrlsFailure(errorResponse));
      }
    }
  });
}

export function addMonitoringUrls(dispatch, params) {
  let url = `${apiEndPoint()}/monitoring-urls`;
  axios.post(
    url,
    params,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      }
    }
  )
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveAddMonitoringUrlsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveAddMonitoringUrlsFailure(errorResponse));
      }
    }
  })
}

export function deleteMonitoringURL(dispatch, urlId) {
  let url = `${apiEndPoint()}/monitoring-urls/${urlId}`;
  axios.delete(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveDeleteMonitoringUrlsSuccess(successResponse, urlId));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveDeleteMonitoringUrlsFailure(errorResponse));
      }
    }
  });
};

export function getMonitoringUrlDetails(dispatch, params) {
  let url = `${apiEndPoint()}/monitoring-urls/${params.urlId}`;
  axios.get(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveGetUrlDetailsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveGetUrlDetailsFailure(errorResponse));
      }
    }
  });
}