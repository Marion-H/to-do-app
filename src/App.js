import React, { useState } from 'react';

import TodoCard from './components/TodoCard';
import CreateTodoForm from './components/CreateTodoForm';

import { Container, Card } from 'semantic-ui-react';



function App() {

  const [tasks, setTasks] = useState(
    [
      // {
      //   id: 'id1',
      //   content: 'Tache 1'
      // },
      // {
      //   id: 'id2',
      //   content: 'tache 2'
      // }
    ]
  )
  const [columns, setColums] = useState(
    [
      // {
      //   title: 'To do',
      //   taskId: ['id1','id2']
      // }
    ]
  )
  const addTodo = (title, index) => {
    const newColum = [...columns, { title, taskId: [] }]
    setColums(newColum)
  }

  const addItemTodo = (content, index) => {
    const id = `item ${tasks.length + 1}`
    const newTask = [...tasks, { id, content }]
    setTasks(newTask)
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
    setColums(newColumnTaskId)
  }

  const reorder = (list, startIndex, endIndex, destinationId) => {
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
    setColums(newState)
  };

  const move = (list, result) => {
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
    setColums(newState)
  };


  const onDragEnd = (result) => {
    const { destination, source } = result
    if (!destination) {
      return
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === destinationId) {
      const items = reorder(columns, source.index, destination.index, destinationId)
      return items
    } else {
      const items = move(columns, result)
      return items
    }
  }

  const deleteButton = (e, id) => {
    e.preventDefault()
    const result = Array.from(tasks);
    const newArray = result.filter(res => res.id !== id)
    setTasks(newArray)
  }

  const renderCard = () => {
    return (

      <TodoCard
        tasks={tasks}
        columns={columns}
        addTodo={addItemTodo}
        onDragEnd={onDragEnd}
        deleteButton={deleteButton}
      />

    )

  }

  return (
    <Container fluid>
      <Card.Group>
        {renderCard()}
        <Card>
          <Card.Content>
            <CreateTodoForm addTodo={addTodo} item="liste" />
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  )
}

export default App;
