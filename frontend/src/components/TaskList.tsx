import { useSelector, useDispatch } from 'react-redux';import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, updateTask, fetchMonthTasks } from '../utils/connection';
import { RootState } from '../redux/store';
import { getDayTasks } from '../redux/DayTasks/selector';
import { getMonthTasks } from '../redux/MonthTasks/selector';
import { updateTask as updateDayTask, deleteTask as deleteDayTask} from '../redux/DayTasks/slice';
import { assignTasks } from '../redux/MonthTasks/slice';

const TaskList = () => {
  const dayTasks = useSelector((state: RootState) => getDayTasks(state));
  const monthTasks = useSelector((state: RootState) => getMonthTasks(state));
  const dispatch = useDispatch();

  const handleToggle = (index: number) => {
    (async () => {
      const task: Task = Object.assign({}, dayTasks.tasks[index]);
      task.done = !task.done;
      await updateTask(task);
      dispatch(updateDayTask({index, done: task.done}));
    })();
  };

  const handleDeleteIcon = (index: number) => {
    (async () => {
      const taskId = dayTasks.tasks[index].id;
      await deleteTask(taskId);
      dispatch(deleteDayTask(taskId));
      const tasks = await fetchMonthTasks(monthTasks.month);
      if (tasks) {
        dispatch(assignTasks(tasks));
      }
    })();
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {dayTasks.tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={
              value.done ? (
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteIcon(index)}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                <>
                </>
              )}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value.title}
                sx={{
                  textDecoration: value.done ? 'line-through' : 'none'
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}

export default TaskList;
