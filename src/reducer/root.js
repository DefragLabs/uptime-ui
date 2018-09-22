import ActionType from '../constants/action-type';
import { Map as makeMap } from 'immutable';

export const initialState =  makeMap({

});

const rootReducer = (state=initialState, action)=> {

  if (!action.type) {
    console.log('Payload missing a type!', action);
  }

  switch (action.type) {

    case ActionType.SAMPLE_DATA_RESPONSE: {
      state = state.set('sampleResponse', action.response);
      return state;
    }

    default:{
      return state;
    }

  };

};

export default rootReducer;