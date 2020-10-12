import tasks from '../reducer/tasks'
import {ADD_TASK, ADD_TASKID} from './actionTypes'

export const addTaskId = (content, index) => {
    return (dispatch, getState) => {
        const state = getState()
        const {columns, tasks} = state
        console.log(tasks)
        const id = `item ${tasks.length + 1}`
        const newTask = [...tasks, { id, content }]
        dispatch({ type: ADD_TASK, payload: newTask })
        const newColumnTaskId = columns.map((column, i) => {
            if (index === i) {
                if (column.taskId === undefined) {
                    return { ...column, taskId: [id] }
                } else {
                    return { ...column, taskId: [...column.taskId, id] }
                }
            } else {
                return column
            }
        })
        dispatch({type: ADD_TASKID, payload:newColumnTaskId})
    }
}