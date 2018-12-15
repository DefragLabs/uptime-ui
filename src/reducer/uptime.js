import ActionTypes from '../constants/action-type';

export const initialState =  {
  isLoading: false
};

const uptime = (state=initialState, action)=> {

  if (!action.type) {
    console.log('Payload missing a type!', action);
  }

  switch (action.type) {
    // Get monitoring urls
    case ActionTypes.GET_MONITORING_URLS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }

    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS: {
      const monitoringURLs = {
        monitoringURLs: action.response.data.monitoringURLs
      };
      return { 
        ...state,
        monitoringURLs,
        isLoading: false
      };
    }

    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Add monitoring URL.
    case ActionTypes.ADD_MONITORING_URLS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }

    case ActionTypes.RECEIVE_ADD_MONITORING_URLS_REQUEST_SUCCESS: {
      let urlsCopy = JSON.parse(JSON.stringify(state.monitoringURLs));
      // Insert new url object at 0th index.
      urlsCopy['monitoringURLs'].splice(0, 0, action.response.data);
      return {
        ...state, 
        isLoading: false,
        monitoringURLs: urlsCopy
      };
    }

    case ActionTypes.RECEIVE_ADD_MONITORING_URLS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Delete monitoring URL.
    case ActionTypes.DELETE_MONITORING_URLS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }

    case ActionTypes.RECEIVE_DELETE_MONITORING_URLS_REQUEST_SUCCESS: {
      let urlsCopy = JSON.parse(JSON.stringify(state.monitoringURLs));
      const urlsCopyLen = urlsCopy.monitoringURLs.length;
      for(let urlIndx=0; urlIndx<urlsCopyLen; urlIndx++){
        let urlDetails = urlsCopy['monitoringURLs'][urlIndx];
        if(urlDetails.id === action.urlId){
          urlsCopy['monitoringURLs'].splice(urlIndx, 1);
          break;
        }
      }

      return {
        ...state, 
        isLoading: false,
        monitoringURLs: urlsCopy
      };
    }

    case ActionTypes.RECEIVE_DELETE_MONITORING_URLS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    default:{
      return state;
    }
  };

};

export default uptime;