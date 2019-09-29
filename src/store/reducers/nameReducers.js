const initState = {
    name: null
};

const nameReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_NAME' : console.log(action.msg); return {...state, ...{name: action.msg}};
        default: return state
    }
}

export default nameReducer;