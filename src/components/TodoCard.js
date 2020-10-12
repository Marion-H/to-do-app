import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'

import { ADD_TASK } from './store/action/actionTypes'
import CreateTodoForm from './CreateTodoForm'

function TodoCard({ columns, tasks, addTask, onDragEnd, deleteButton}) {

    const renderCardItem = (taskId) => {
        if (taskId === undefined) {
            return <></>
        } else {
            return taskId.map(id => {
                return tasks.map((task, index) => {
                    if (task.id === id) {
                        return (
                            <Draggable
                                draggableId={task.id}
                                index={index}
                                key={task.id}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <Card >
                                            <Card.Content>
                                                <Card.Header>
                                                    {task.content}
                                                </Card.Header>
                                                <Button onClick={(e)=>deleteButton(e, id)}>Delete</Button>
                                            </Card.Content>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        )
                    }
                })
            })
        }
    }

    const renderInput = (index) => {
        return <CreateTodoForm add={addTask} item='carte' index={index} />
    }

    const renderCard = () => {
        return columns.map((column, index) => {
            const { taskId, title } = column
            return (
                <Droppable
                    droppableId={column.title}
                    key={title}
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <Card >
                                <Card.Content>
                                    <Card.Header>
                                        {title}
                                        
                                    </Card.Header>
                                    {renderCardItem(taskId)}
                                    {renderInput(index)}
                                </Card.Content>
                            </Card>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {renderCard()}
        </DragDropContext>

    )

}
const mapStateToProps = (state) => {
    const tasks = state.tasks
    const columns = state.columns
    return {
        tasks,
        columns
    }
}

const mapDispatchToProps = (dispatch) => {
 return {
    addTask: (value) => dispatch({ type: ADD_TASK, payload: value })
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)