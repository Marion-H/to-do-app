import React from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';

import TodoCard from './components/TodoCard';
import CreateTodoForm from './components/CreateTodoForm';
import { ADD_COLUMN } from './components/store/action/actionTypes'

import styles from "./components/css/app.module.css"



function App({addColumn}) {


  const renderCard = () => {
    return (

      <TodoCard/>

    )

  }

  return (
    <Container fluid>
      <Card.Group className={styles.cardGroup}>
        {renderCard()}
        <Card>
          <Card.Content >
            <CreateTodoForm 
            add={addColumn} 
            item="liste" />
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      addColumn: (value) => dispatch({ type: ADD_COLUMN, payload: value })
  }
}

export default connect(null,mapDispatchToProps)(App);
