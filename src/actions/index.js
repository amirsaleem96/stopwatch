export const ADD_SNAPSHOT = 'get_snapshots';
export const DELETE_SNAPSHOT = 'remove_snapshot';

export function addSnapshot( snapshot ) {
    return {
        type: ADD_SNAPSHOT,
        payload: snapshot 
    }
}

export function removeSnapShot( index ) {
    return {
        type: DELETE_SNAPSHOT,
        payload: index
    }
}