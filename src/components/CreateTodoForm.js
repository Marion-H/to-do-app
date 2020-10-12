import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

function CreateTodoForm({ add, item, index }) {
    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        e.preventDefault()
        add(value)
        setValue("")
    }
    return (
        <Form onSubmit={handleOnChange}>
            <Form.Field>
                <input
                    placeholder='Todo'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
            </Form.Field>
            <Button type='submit'>Ajoutez une {item}</Button>
        </Form>
    )
}



export default CreateTodoForm