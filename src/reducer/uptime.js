import ActionTypes from '../constants/action-type';
import { EMAIL , SLACK} from '../constants/misc';

export const initialState =  {
  isLoading: false
};

const uptime = (state=initialState, action)=> {

  if (!action.type) {
    console.log('Payload missing a type!', action);
  }

  switch (action.type) {
    // Get dashboard stats
    case ActionTypes.GET_DASHBOARD_STATS_REQUEST_ATTEMPTED: {
      return state;
    }
    case ActionTypes.RECEIVE_GET_DASHBOARD_STATS_REQUEST_SUCCESS: {
      const dashboardStats = {
        dashboardStats: action.response.data
      };
      return{
        ...state,
        dashboardStats : dashboardStats
      }

    }
    case ActionTypes.RECEIVE_GET_DASHBOARD_STATS_REQUEST_FAILURE: {
      return state;
    }

    // Get monitoring urls
    case ActionTypes.GET_MONITORING_URLS_REQUEST_ATTEMPTED: {
      return state;
    }
    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS: {
      const monitoringURLs = {
        monitoringURLs: action.response.data
      };
      return{
        ...state,
        monitoringURLs : monitoringURLs
      }

    }
    case ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE: {
      return state;
    }
    case ActionTypes.RECEIVE_RESET_MONITORING_URL_VARIABLES: {
      return {
        ...state,
        isURLResponseModified: false
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
        monitoringURLs: urlsCopy,
        isURLResponseModified: true
      };
    }
    case ActionTypes.RECEIVE_ADD_MONITORING_URLS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Update monitoring URL.
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
        monitoringURLs: urlsCopy,
        isURLResponseModified: true
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
        monitoringURLs: urlsCopy,
        isURLResponseModified: true
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

    // Get integrations
    case ActionTypes.GET_INTEGRATIONS_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }
    case ActionTypes.RECEIVE_GET_INTEGRATIONS_REQUEST_SUCCESS: {
      return {
        ...state, 
        isLoading: false,
        integrations: action.response.data
      };
    }
    case ActionTypes.RECEIVE_GET_INTEGRATIONS_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Add integration
    case ActionTypes.RECEIVE_ADD_INTEGRATION_REQUEST_ATTEMPTED: {
      return{
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.RECEIVE_ADD_INTEGRATION_REQUEST_SUCCESS: {
      let integrationsCopy = JSON.parse(JSON.stringify(state.integrations));
      const newIntegration = action.response.data;
      const integrationType = newIntegration.type;
      if(integrationsCopy.hasOwnProperty(integrationType)){
        integrationsCopy[integrationType].splice(0, 0, newIntegration);
      } else {
        integrationsCopy[integrationType] = [];
        integrationsCopy[integrationType].push(newIntegration);
      }

      return {
        ...state, 
        isLoading: false,
        integrations: integrationsCopy
      };
    }
    case ActionTypes.RECEIVE_ADD_INTEGRATION_REQUEST_FAILURE: {
      return {
        ...state, 
        isLoading: false
      };
    }

    // Delete integration.
    case ActionTypes.RECEIVE_DELETE_INTEGRATION_REQUEST_ATTEMPTED: {
      return {
        ...state, 
        isLoading: true
      };
    }
    case ActionTypes.RECEIVE_DELETE_INTEGRATION_REQUEST_SUCCESS: {
      let integrationsCopy = JSON.parse(JSON.stringify(state.integrations));
      for(let type in integrationsCopy){
        let isIntegrationFound = false;
        let integrationTypeList = integrationsCopy[type];
        const listLen = integrationTypeList.length;
        for(let integrationIndx=0; integrationIndx<listLen; integrationIndx++){
          let integrationDetails = integrationTypeList[integrationIndx];
          if(integrationDetails.id === action.integrationId){
            integrationTypeList.splice(integrationIndx, 1);
            isIntegrationFound = true;
            break;
          }
        }
        if(isIntegrationFound){
          break;
        }
      }

      return {
        ...state, 
        isLoading: false,
        integrations: integrationsCopy
      };
    }
    case ActionTypes.RECEIVE_DELETE_INTEGRATION_REQUEST_FAILURE: {
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