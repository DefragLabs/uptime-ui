import ActionTypes from '../constants/action-type';

import { getSampleData, register } from '../utils/app-api-utils';

export function fetchSampleData() {
  return(dispatch)=> {
    getSampleData(dispatch);
  }
}

export function receiveSampleDataResponse(response) {
  return {
    type: ActionTypes.SAMPLE_DATA_RESPONSE,
    response
  }
}

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