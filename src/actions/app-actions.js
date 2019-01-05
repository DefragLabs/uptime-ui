import ActionTypes from '../constants/action-type';
import { 
  register, 
  login, 
  logout, 
  getMonitoringUrls, 
  addMonitoringUrls, 
  deleteMonitoringURL, 
  getMonitoringUrlDetails, 
  getMonitoringUrlResults, 
  updateMonitoringUrls,
  getDashboardStats
} from '../utils/app-api-utils';

// Register
export function requestRegister(params) {
  return(dispatch) => {
    register(dispatch, params);
  }
}
export function receiveRegisterSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_REGISTER_REQUEST_SUCCESS,
    response
  }
}
export function receiveRegisterFailure(response) {
  return{
    type: ActionTypes.RECEIVE_REGISTER_REQUEST_FAILURE,
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

// Get dashboard stats
export function requestGetDashboardStats(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.GET_DASHBOARD_STATS_REQUEST_ATTEMPTED,
    })
    getDashboardStats(dispatch, params);
  }
}
export function receiveGetDashboardStatsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_GET_DASHBOARD_STATS_REQUEST_SUCCESS,
    response
  }
}
export function receiveGetDashboardStatsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_GET_DASHBOARD_STATS_REQUEST_FAILURE,
    response
  }
}

// Get monitoring urls
export function requestMonitoringUrls(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.GET_MONITORING_URLS_REQUEST_ATTEMPTED,
    })
    getMonitoringUrls(dispatch, params);
  }
}
export function receiveMonitoringUrlsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS,
    response
  }
}
export function receiveMonitoringUrlsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE,
    response
  }
}

// Add monitoring urls
export function requestAddMonitoringUrls(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.ADD_MONITORING_URLS_REQUEST_ATTEMPTED,
    })
    addMonitoringUrls(dispatch, params);
  }
} 
export function receiveAddMonitoringUrlsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_ADD_MONITORING_URLS_REQUEST_SUCCESS,
    response
  }
}
export function receiveAddMonitoringUrlsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_ADD_MONITORING_URLS_REQUEST_FAILURE,
    response
  }
}

// Update monitoring urls
export function requestUpdateMonitoringUrls(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_MONITORING_URLS_REQUEST_ATTEMPTED,
    })
    updateMonitoringUrls(dispatch, params);
  }
} 
export function receiveUpdateMonitoringUrlsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_UPDATE_MONITORING_URLS_REQUEST_SUCCESS,
    response
  }
}
export function receiveUpdateMonitoringUrlsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_UPDATE_MONITORING_URLS_REQUEST_FAILURE,
    response
  }
}

// Delete monitoring url
export function requestDeleteMonitoringUrls(urlId){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.DELETE_MONITORING_URLS_REQUEST_ATTEMPTED,
    })
    deleteMonitoringURL(dispatch, urlId);
  }
}
export function receiveDeleteMonitoringUrlsSuccess(response, urlId) {
  return{
    type: ActionTypes.RECEIVE_DELETE_MONITORING_URLS_REQUEST_SUCCESS,
    response,
    urlId
  }
}
export function receiveDeleteMonitoringUrlsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_DELETE_MONITORING_URLS_REQUEST_FAILURE,
    response
  }
}

// Get monitoring url details
export function requestGetUrlDetails(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.GET_URL_DETAILS_REQUEST_ATTEMPTED,
    })

    getMonitoringUrlDetails(dispatch, params);
  }
}
export function receiveGetUrlDetailsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_GET_URL_DETAILS_REQUEST_SUCCESS,
    response
  }
}
export function receiveGetUrlDetailsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_GET_URL_DETAILS_REQUEST_FAILURE,
    response
  }
}

// Get monitoring url results
export function requestGetUrlResults(params){
  return(dispatch) => {
    dispatch({
      type: ActionTypes.GET_URL_RESULTS_REQUEST_ATTEMPTED,
    })

    getMonitoringUrlResults(dispatch, params);
  }
}
export function receiveGetUrlResultsSuccess(response) {
  return{
    type: ActionTypes.RECEIVE_GET_URL_RESULTS_REQUEST_SUCCESS,
    response
  }
}
export function receiveGetUrlResultsFailure(response) {
  return{
    type: ActionTypes.RECEIVE_GET_URL_RESULTS_REQUEST_FAILURE,
    response
  }
}