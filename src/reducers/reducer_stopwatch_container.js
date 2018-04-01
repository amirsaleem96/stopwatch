import { GET_SNAPSHOTS } from '../actions/index';
export default function( state = [], action ) {
    switch(action.type) {
        case GET_SNAPSHOTS:  return action.payload
    }
    return state;
}