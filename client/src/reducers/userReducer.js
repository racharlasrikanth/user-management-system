const userReducer = (state, action) => {
    if (action.type === "GET_CURRENT_USER") {
        return {
            ...state,
            user: action.payload
        }
    }

    throw new Error(`No Matching "${action.type}" - action type`);
}

export default userReducer;