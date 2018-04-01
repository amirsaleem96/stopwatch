export const GET_SNAPSHOTS = 'get_snapshots'
export function getSnapshots( snapshots ) {
    return {
        type: GET_SNAPSHOTS,
        payload: snapshots 
    }
}