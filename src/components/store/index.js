import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import columns from './reducer/columns'
import tasks from './reducer/tasks'

const reducers = combineReducers({
    columns,
    tasks
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store