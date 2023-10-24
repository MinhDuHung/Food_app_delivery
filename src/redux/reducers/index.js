import { combineReducers } from 'redux'
import orderReducer from './ordersReducers'
import userReducer from './userReducers'
const reducers = combineReducers({
    orderReducer: orderReducer,
    userReducer: userReducer
})
export default (state, action) => reducers(state, action)