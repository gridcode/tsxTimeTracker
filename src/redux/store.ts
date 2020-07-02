import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import userEventsReducer from './user-events';
import recorderReducer from './recorder'
const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer
})
export type RootState = ReturnType<typeof rootReducer>
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store