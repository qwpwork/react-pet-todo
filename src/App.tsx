import { useState } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Box, Button, Container, TextField} from '@mui/material';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material'

export default function App() {
  // Interfaces
  interface ITodoItems {
    id: number;
    value: string;
    isChecked: boolean;
  }

  // States init
  const [todoItems, setTodoItems] = useState([
    { id: 0, value: "Snacks", isChecked: false },
    { id: 1, value: "Some water", isChecked: false },
    { id: 2, value: "Food for pets", isChecked: false },
  ]);
  const [inputText, setInputText] = useState("");
  const [isHasError, setIsHasError] = useState(false)
  const [helperStr, setHelperStr] = useState("");

  // Methods


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  /*
    * Sets listener on input str changes. 
    * When input value changing:
    * 1. updating inputText state (set input value instead of state value);
    * 2. removing error-status.
  */
  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsHasError(false);
    setHelperStr("");
  }

  /*
    * 1. pass validation (input text isn't empty);
    * 2. update todoItems state (add new obj to array);
    * 3. set input value to empty "".
  */
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

  /*
    * Removing checked items and updates todoItems state
  */
  const removeCheckedItems = () => {
    setTodoItems(todoItems.filter(item => item.isChecked == false))
  }

  /*
    @params {id: number, value: string, isChecked: boolean}
    * update todoItems state (toggle todoItems.isChecked)
  */
  const isCheckedToggle = (todoItem : ITodoItems) => {
    setTodoItems(prevState =>
      prevState.map(item =>
        item.id == todoItem.id
          ? {...item, isChecked: !todoItem.isChecked }
          : item
      )
    )    
  }

  // Components
  const FormField = (
    <Box sx={{mt: 5, mb: 5}}>
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
        sx={{mt: 1, ml: 1}}
      >
        Add todo
      </Button>
    </Box>
  );

  const TodoList = todoItems.map((todoItem) => 
    <div key={todoItem.id}>
      <FormControlLabel
        control={<Checkbox onClick={() => isCheckedToggle(todoItem)}/>}
        label={todoItem.value}
      />
    </div>
  );

  const ClearBtn = (
    <Button
      className="btn"
      variant="contained"
      onClick={removeCheckedItems}
      sx={{mt: 5, width: 315}}
    >
      Clear selected
    </Button>
  )
  // Render
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        {FormField}
        {TodoList}
        {ClearBtn}
      </Container>
    </ThemeProvider>
  )
}
