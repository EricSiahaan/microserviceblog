const initialState = {
    name: 'Eric'
}
const globalReducer = (state = initialState, action) => {
    if (action.type === "UPDATE_NAME") {
        return {
            ...state,
            name: 'Hansdeka'
        }
    }
    return state
}


export default globalReducer;