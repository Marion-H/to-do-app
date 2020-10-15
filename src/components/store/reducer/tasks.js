import {ADD_TASK, DELETE_TASK} from '../action/actionTypes'

const initialState = []

const tasks = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case ADD_TASK:
            return payload
        case DELETE_TASK:
            return payload
        default:
            return state
    }
}

export default tasks