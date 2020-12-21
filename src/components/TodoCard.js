import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'

import { addTaskId, onDragEnd, deleteButton } from './store/action/todoList'
import CreateTodoForm from './CreateTodoForm'

import styles from "./css/todoCard.module.css"

function TodoCard({ columns, tasks, addTaskId, onDragEnd, deleteButton}) {

    const renderCardItem = (taskId) => {
        if (taskId === undefined) {
            return <></>
        } else {
            return taskId.map((id, index) => {
                return tasks.map((task) => {
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
                                        className={styles.cardItemRender}
                                    >
                                        <Card >
                                            <Card.Content>
                                                <Card.Header className={styles.cardItemDelete}>
                                                    {task.content}
                                                </Card.Header>
                                                <Button color="red" onClick={(e)=>deleteButton(e, id)}>Delete</Button>
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
        return <CreateTodoForm add={addTaskId} item='carte' index={index} color="purple"/>
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
                            className={styles.cardRender}
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
    addTaskId: (value, index) => dispatch(addTaskId(value, index)),
    onDragEnd: (result) => dispatch(onDragEnd(result)),
    deleteButton: (e, id) => dispatch(deleteButton(e, id))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)