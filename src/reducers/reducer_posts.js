import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions';
import _ from 'lodash';

export default function(state = {},action){
  switch(action.type){
    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POST:

      // ES5
      // const newState ={...state};
      // newState[post.id] = post;
      // return newState
      // ES6
      return { ...state, [action.payload.data.id]: action.payload.data };
      break;
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