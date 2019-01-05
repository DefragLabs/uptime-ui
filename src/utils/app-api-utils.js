import axios from 'axios';
import {
  receiveLoginSuccess, 
  receiveLoginFailure, 
  receiveLogoutSuccess, 
  receiveMonitoringUrlsSuccess,
  receiveMonitoringUrlsFailure, 
  receiveAddMonitoringUrlsSuccess, 
  receiveAddMonitoringUrlsFailure, 
  receiveDeleteMonitoringUrlsSuccess, 
  receiveDeleteMonitoringUrlsFailure, 
  receiveGetUrlDetailsSuccess,
  receiveGetUrlDetailsFailure, 
  receiveGetUrlResultsSuccess, 
  receiveGetUrlResultsFailure, 
  receiveUpdateMonitoringUrlsSuccess, 
  receiveUpdateMonitoringUrlsFailure, 
  receiveRegisterSuccess, 
  receiveRegisterFailure, 
  receiveGetDashboardStatsSuccess, 
  receiveGetDashboardStatsFailure
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
  let url = `${apiEndPoint()}/auth/register`;
  axios.post(
    url,
    params,{
      headers: getHeaders(),
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveRegisterSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      const errorResponse = error.response;
      dispatch(receiveRegisterFailure(errorResponse));
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

export function getDashboardStats(dispatch) {
  let url = `${apiEndPoint()}/dashboard/stats`;
  axios.get(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveGetDashboardStatsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveGetDashboardStatsFailure(errorResponse));
      }
    }
  });
}

export function getMonitoringUrls(dispatch, searchQuery) {
  let url = `${apiEndPoint()}/monitoring-urls`;
  if(searchQuery.length > 2){
    url = `${url}?search=${searchQuery}`;
  }
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

export function updateMonitoringUrls(dispatch, params) {
  let url = `${apiEndPoint()}/monitoring-urls/${params.id}`;
  axios.put(
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
    dispatch(receiveUpdateMonitoringUrlsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveUpdateMonitoringUrlsFailure(errorResponse));
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

export function getMonitoringUrlResults(dispatch, params) {
  let url = `${apiEndPoint()}/monitoring-urls/${params.urlId}/stats`;
  axios.get(
    url,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveGetUrlResultsSuccess(successResponse));
  })
  .catch(error => {
    if (error) {
      if (error.response.status === 401) {
        logout(dispatch);
      }
      else {
        const errorResponse = error.response;
        dispatch(receiveGetUrlResultsFailure(errorResponse));
      }
    }
  });
}