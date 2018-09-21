import ActionTypes from '../constants/action-type';

import { getSampleData } from '../utils/app-api-utils';

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