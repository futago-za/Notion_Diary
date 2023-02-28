import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTask, fetchMonthTasks } from '../utils/connection';
import { RootState } from '../redux/store';
import { getDayTasks } from '../redux/DayTasks/selector';
import { assignTasks } from '../redux/MonthTasks/slice';
import { getMonthTasks } from '../redux/MonthTasks/selector';
 
type Props = {
  addDayTask: (task: Task) => {
    payload: Task;
    type: "dayTasks/addTask";
  },
  tasks: Task[]
}
 
const TaskInput: React.FC<Props> = ({addDayTask, tasks}) => {
  const dayTasks = useSelector((state: RootState) => getDayTasks(state));
  const monthTasks = useSelector((state: RootState) => getMonthTasks(state));
  const dispatch = useDispatch();

  const [ title, setTitle ] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddButton = () => {
    if (title.length !== 0) {
      (async () => {
        const newTask = await createTask(title, dayTasks.date);
        if (newTask) {
          addDayTask(newTask);
          reloadMonthTasks();
        }
        setTitle('')
      })();
    } else {
      setTitle('')
    }
  }

  const reloadMonthTasks = async () => {
    const tasks = await fetchMonthTasks(monthTasks.month);
    if (tasks) {
      dispatch(assignTasks(tasks));
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