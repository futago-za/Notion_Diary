import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTask } from '../utils/connection';
 
type Props = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  tasks: Task[]
}
 
const TaskInput: React.FC<Props> = ({setTasks, tasks}) => {
  const [ title, setTitle ] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddButton = () => {
    if (title.length !== 0) {
      (async () => {
        const newTask = await createTask(title);
        if (newTask) {
          setTasks([newTask, ...tasks]);
        }
        setTitle('')
      })();
    } else {
      setTitle('')
    }
  }

  return (
    <Stack direction={"row"} spacing={2}>
      <TextField
        id="outlined-basic"
        label="タスク名"
        variant="outlined"
        fullWidth
        value={title}
        onChange={handleInputChange}
      />
      <Button variant="contained" sx={{minWidth: 100}} onClick={handleAddButton}>追加する</Button>
    </Stack>
  )
}
 
export default TaskInput