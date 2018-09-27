import { zipObject } from 'lodash';

const ACTION_TYPES = [
  'SAMPLE_DATA_RESPONSE',
  'RECEIVE_REGISTER_NEW_USER_RESPONSE',
];

export default zipObject(ACTION_TYPES, ACTION_TYPES);