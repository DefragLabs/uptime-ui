import axios from 'axios';
import { receiveSampleDataResponse, revieveRegisterResponse } from '../actions/app-actions';

export function apiEndPoint() {
  // return `${window.location.protocol}//${window.location.hostname}:9999`;
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

export function getSampleData(dispatch) {
  let url = "https://jsonplaceholder.typicode.com/comments";
  axios.get(
    url,{
      headers: getHeaders(),
    })
  .then(response => {
    const successResponse = response.data;
    dispatch(receiveSampleDataResponse(successResponse));
  })
  .catch(error => {
    if (error) {
      const errorResponse = error.response;
      dispatch(receiveSampleDataResponse(errorResponse));
    }
  });
};

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