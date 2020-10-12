import {ADD_COLUMN, ADD_TASKID} from '../action/actionTypes'

const initialState = []

const columns = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case ADD_COLUMN:
            return [...state, { title: payload, taskId: [] }]
        case ADD_TASKID:
            return [ payload ]
        default:
            return state
    }
}

export default columns