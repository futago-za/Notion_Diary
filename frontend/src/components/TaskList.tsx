import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { updateTask } from '../utils/connection';

type Props = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  tasks: Task[]
}

const TaskList: React.FC<Props> = ({setTasks, tasks}) => {
  const handleToggle = (index: number) => async () => {
    tasks[index].done = !tasks[index].done;
    updateTask(tasks[index]);
    setTasks([...tasks]);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <ListItem
            key={value.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
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
