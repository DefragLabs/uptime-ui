import { zipObject } from 'lodash';

const ACTION_TYPES = [

  'REGISTER_REQUEST_ATTEMPTED',
  'RECEIVE_REGISTER_REQUEST_SUCCESS',
  'RECEIVE_REGISTER_REQUEST_FAILURE',

  'LOGIN_REQUEST_ATTEMPTED',
  'RECEIVE_LOGIN_REQUEST_SUCCESS',
  'RECEIVE_LOGIN_REQUEST_FAILURE',

  'LOGOUT_REQUEST_ATTEMPTED',
  'RECEIVE_LOGOUT_REQUEST_SUCCESS',

  'GET_DASHBOARD_STATS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_DASHBOARD_STATS_REQUEST_SUCCESS',
  'RECEIVE_GET_DASHBOARD_STATS_REQUEST_FAILURE',

  'GET_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE',

  'ADD_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_ADD_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_ADD_MONITORING_URLS_REQUEST_FAILURE',
  'RECEIVE_RESET_MONITORING_URL_VARIABLES',

  'UPDATE_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_UPDATE_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_UPDATE_MONITORING_URLS_REQUEST_FAILURE',

  'DELETE_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_DELETE_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_DELETE_MONITORING_URLS_REQUEST_FAILURE',

  'GET_URL_DETAILS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_URL_DETAILS_REQUEST_SUCCESS',
  'RECEIVE_GET_URL_DETAILS_REQUEST_FAILURE',

  'GET_URL_RESULTS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_URL_RESULTS_REQUEST_SUCCESS',
  'RECEIVE_GET_URL_RESULTS_REQUEST_FAILURE',

  'GET_INTEGRATIONS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_INTEGRATIONS_REQUEST_SUCCESS',
  'RECEIVE_GET_INTEGRATIONS_REQUEST_FAILURE',

  'ADD_INTEGRATION_REQUEST_ATTEMPTED',
  'RECEIVE_ADD_INTEGRATION_REQUEST_SUCCESS',
  'RECEIVE_ADD_INTEGRATION_REQUEST_FAILURE',

  'RECEIVE_DELETE_INTEGRATION_REQUEST_ATTEMPTED',
  'RECEIVE_DELETE_INTEGRATION_REQUEST_SUCCESS',
  'RECEIVE_DELETE_INTEGRATION_REQUEST_FAILURE'
];

export default zipObject(ACTION_TYPES, ACTION_TYPES);