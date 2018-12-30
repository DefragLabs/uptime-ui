import ActionTypes from '../constants/action-type';
import { SEARCH_CHARACTER_LIMIT } from '../constants/misc';

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
        ...state
      };
    }
    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS: {
      // let query = action.searchQuery, monitoringURLs;
      // let results={}, filteredResult;
      // if(query.length > SEARCH_CHARACTER_LIMIT){
      //   let urlsCopy = JSON.parse(JSON.stringify(state.monitoringURLs));
      //   if(urlsCopy.hasOwnProperty('monitoringURLs')){
      //     filteredResult = urlsCopy.monitoringURLs.filter(urlObj => urlObj.url.toLowerCase().includes(action.query.toLowerCase()));
      //   }
      // } else{
      //   monitoringURLs = {
      //     monitoringURLs: action.response.data.monitoringURLs
      //   };
      // }
      // if(filteredResult && filteredResult.length){
      //   results['monitoringURLs'] = filteredResult
      //   const mockResponse = results;
      //   return {
      //     ...state,
      //     monitoringURLs: mockResponse
      //   }
      // } else{
      //   return{
      //     ...state,
      //     monitoringURLs : monitoringURLs
      //   }
      // }
      const monitoringURLs = {
        monitoringURLs: action.response.data.monitoringURLs
      };
      return{
        ...state,
        monitoringURLs : monitoringURLs
      }

    }
    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE: {
      return {
        ...state
      };
    }
    // case ActionTypes.FILTER_MONITORING_URLS_SUCCESS: {
    //   let urlsCopy = JSON.parse(JSON.stringify(state.monitoringURLs));
    //   let results={}, filteredResult;
    //   if(urlsCopy.hasOwnProperty('monitoringURLs')){
    //     filteredResult = urlsCopy.monitoringURLs.filter(
    //       urlObj => urlObj.url.toLowerCase().includes(action.query.toLowerCase())
    //     );
    //   }
    //   if(filteredResult && filteredResult.length){
    //     results['monitoringURLs'] = filteredResult
    //     const mockResponse = results;
    //     console.log(mockResponse)
    //     return {
    //       ...state,
    //       monitoringURLs: mockResponse
    //     }
    //   } else{
    //     return{
    //       ...state,
    //       monitoringURLs : urlsCopy
    //     }
    //   }
    // }

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

    // Add monitoring URL.
    case ActionTypes.UPDATE_MONITORING_URLS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }
    case ActionTypes.RECEIVE_UPDATE_MONITORING_URLS_REQUEST_SUCCESS: {
      let urlsCopy = JSON.parse(JSON.stringify(state.monitoringURLs));
      // Replace old url details with new one.
      for(let urlIndx=0; urlIndx<urlsCopy.monitoringURLs.length; urlIndx++){
        let urlDetails = urlsCopy.monitoringURLs[urlIndx];
        if(urlDetails.id === action.response.data.id){
          urlsCopy['monitoringURLs'][urlIndx] = action.response.data;
          break;
        }
      }
      return {
        ...state, 
        isLoading: false,
        monitoringURLs: urlsCopy
      };
    }
    case ActionTypes.RECEIVE_UPDATE_MONITORING_URLS_REQUEST_FAILURE: {
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

    // Get monitoring details
    case ActionTypes.GET_URL_DETAILS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }
    case ActionTypes.RECEIVE_GET_URL_DETAILS_REQUEST_SUCCESS: {
      return {
        ...state, 
        isLoading: false,
        monitoringURLDetails: action.response.data
      };
    }
    case ActionTypes.RECEIVE_GET_URL_DETAILS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Get monitoring results
    case ActionTypes.GET_URL_RESULTS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }
    case ActionTypes.RECEIVE_GET_URL_RESULTS_REQUEST_SUCCESS: {
      return {
        ...state, 
        isLoading: false,
        monitoringURLResults: action.response.data
      };
    }
    case ActionTypes.RECEIVE_GET_URL_RESULTS_REQUEST_FAILURE: {
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