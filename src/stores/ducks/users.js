export const Types = {
    ADD_REQUEST: 'users/ADD_REQUEST',
    ADD_SUCCESS: 'users/ADD_SUCCESS',
    REMOVE_REQUEST: 'users/REMOVE_REQUEST',
    REMOVE_SUCCESS: 'users/REMOVE_SUCCESS',
};

const INITIAL_STATE = [];

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ADD_REQUEST:
            return [...state];
        case Types.ADD_SUCCESS:
            return [ ...state, action.payload.data];
        case Types.REMOVE_SUCCESS:
            return [...action.payload.data];
        default:
            return state;
    }
}

export const Creators = {
    addUserRequest: (user, coordinates) => ({
        type: Types.ADD_REQUEST,
        payload: { user, coordinates }
    }),
    addUserSuccess: data => ({
        type: Types.ADD_SUCCESS,
        payload: { data }
    }),
    removeUserRequest: id => ({
        type: Types.REMOVE_REQUEST,
        payload: { id }
    }),
    removeUserSuccess: data => ({
        type: Types.REMOVE_SUCCESS,
        payload: { data }
    })
};
