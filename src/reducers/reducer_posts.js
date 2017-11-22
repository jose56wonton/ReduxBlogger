import {FETCH_POSTS} from '../actions';
import _ from 'lodash';
export default function(state = {},action){
  switch(action.type){
    case FETCH_POSTS :
      
      // This is done with lodash!!!
      // Takes an array of objects and creates a dictionary basically with the key being id
      // and the object of that id being the value
      return _.mapKeys(action.payload.data, 'id');
      break;
    default: 
      return state;
  }
}