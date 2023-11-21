/*
  # TODO:
  1. Add items
  2. Remove checked items
  3. Input validation
*/

import {useState} from 'react';

// MUI imports
import { Box, Button, Container, TextField } from '@mui/material';
import { FormControl, FormHelperText, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

export default function App() {
  const [todoItems, setTodoItems] = useState([
    { id: 0, value: "Snacks", isChecked: false },
    { id: 1, value: "Some water", isChecked: false },
    { id: 2, value: "Food for pets", isChecked: false },
  ]);
  const [inputText, setInputText] = useState("");
  const [isHasError, setIsHasError] = useState(false)
  const [helperStr, setHelperStr] = useState("");

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsHasError(false);
    setHelperStr("");
  }

  const addNewItem = () => {
    if (inputText == "") {
      setIsHasError(true);
      setHelperStr("Input is empty!");
    }
    else {
      let newItem = {
        id: todoItems.length,
        value: inputText,
        isChecked: false
      }
      setTodoItems(current => [...current, newItem]);
      setInputText("");
    }
  };
  
  const FormField = (
    <Box>
      <FormControl>
        <TextField 
          id="standard-basic"
          variant="standard"
          label="New todo"
          value={inputText}
          onChange={inputTextChange}
          error={isHasError}
          helperText={helperStr}
        />
      </FormControl>
      <Button 
        variant="contained"
        onClick={addNewItem}
      >
        Add todo
      </Button>
    </Box>
  );

  const isCheckedToggle = (item : object) => {
    todoItems.forEach(element => {
      if (element.id == item.id) {
        return {...element, isChecked: !element.isChecked}
      }
    })
  }

  const todoList = todoItems.map((todoItem) => 
    <FormGroup key={todoItem.id}>
      <FormControlLabel
        control={<Checkbox />}
        label={todoItem.value}
        onClick={() => isCheckedToggle(todoItem)}
      />
    </FormGroup>
  );

  const removeCheckedItems = () => {
    return 0;
  }

  return (
    <Container>
      {FormField}
      {todoList}
      <Button
        variant="contained"
        onClick={removeCheckedItems}
      >
        Remove checked
      </Button>
    </Container>
  )
}
