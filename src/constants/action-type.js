import { zipObject } from 'lodash';

const ACTION_TYPES = [
  'RECEIVE_REGISTER_RESPONSE',

  'LOGIN_REQUEST_ATTEMPTED',
  'RECEIVE_LOGIN_REQUEST_SUCCESS',
  'RECEIVE_LOGIN_REQUEST_FAILURE',

  'LOGOUT_REQUEST_ATTEMPTED',
  'RECEIVE_LOGOUT_REQUEST_SUCCESS',

  'GET_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_GET_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_GET_MONITORING_URLS_REQUEST_FAILURE',

  'ADD_MONITORING_URLS_REQUEST_ATTEMPTED',
  'RECEIVE_ADD_MONITORING_URLS_REQUEST_SUCCESS',
  'RECEIVE_ADD_MONITORING_URLS_REQUEST_FAILURE',

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
];

export default zipObject(ACTION_TYPES, ACTION_TYPES);