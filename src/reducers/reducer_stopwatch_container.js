import { ADD_SNAPSHOT, DELETE_SNAPSHOT } from '../actions/index';
export default function( state = [], action ) {
    switch(action.type) {
        case ADD_SNAPSHOT:  return [...state, action.payload];
                             break;
        case DELETE_SNAPSHOT: let newState = [...state]; 
                              newState.splice(action.payload, 1);
                              return newState;
                              break;
        default: return state; 
    }
    return state;
}