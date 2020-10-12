import { ADD_TASK, ADD_TASKID, DELETE_TASK, MOVE_TASKID, REORDER_TASKID } from './actionTypes'

export const addTaskId = (content, index) => {
    return (dispatch, getState) => {
        const state = getState()
        const { columns, tasks } = state
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
        dispatch({ type: ADD_TASKID, payload: newColumnTaskId })
    }
}

export const onDragEnd = (result) => {
    return (dispatch, getState) => {
        const state = getState()
        const { columns } = state
        const { destination, source } = result
        if (!destination) {
            return
        }

        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;

        if (sourceId === destinationId) {
            const items = reorder(columns, source.index, destination.index, destinationId, dispatch)
            return items
        } else {
            const items = move(columns, result, dispatch)
            return items
        }
    }
}

const reorder = (list, startIndex, endIndex, destinationId, dispatch) => {
    const newState = list.map(column => {
        if (column.title === destinationId) {
            const result = Array.from(column.taskId);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            const newState = { ...column, taskId: result }
            return newState;
        }
        return column
    })
    dispatch({ type: REORDER_TASKID, payload: newState })
};

const move = (list, result, dispatch) => {
    const { destination, draggableId, source } = result
    const newState = list.map(col => {
        if (col.title === destination.droppableId) {
            const result = Array.from(col.taskId);
            result.push(draggableId)
            const newState = { ...col, taskId: result }
            return newState;
        }
        if (col.title === source.droppableId) {
            const result = Array.from(col.taskId);
            const newArray = result.filter(res => res !== draggableId)
            const newState = { ...col, taskId: newArray }
            return newState;
        }
        return col
    })
    dispatch({ type: MOVE_TASKID, payload: newState })
};

export const deleteButton = (e, id) => {
    return (dispatch, getState) => {
        e.preventDefault()
        const state = getState()
        const { tasks } = state
        const result = Array.from(tasks);
        const newArray = result.filter(res => res.id !== id)
        // setTasks(newArray)
        dispatch({ type: DELETE_TASK, payload: newArray})
    }
  }