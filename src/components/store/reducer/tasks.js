import {ADD_TASK} from '../action/actionTypes'

const initialState = []

const tasks = (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case ADD_TASK:
            const id = `item ${tasks.length + 1}`
            return [...state, {id, value: payload}]
        default:
            return state
    }
}

export default tasks