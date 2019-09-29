import nameReducer from './nameReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    name: nameReducer
});

export default rootReducer;