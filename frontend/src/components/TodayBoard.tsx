import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from "./Board";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { fetchDayTasks } from '../utils/connection';
import { RootState } from '../redux/store';
import { getDayTasks } from '../redux/DayTasks/selector';
import { assignTasks, addTask } from '../redux/DayTasks/slice';
import { format } from 'date-fns';

const TodayBoard = () => {
  const dayTasks = useSelector((state: RootState) => getDayTasks(state));
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const tasks = await fetchDayTasks(dayTasks.date);
      if (tasks) {
        dispatch(assignTasks(tasks));
      }
    })();
  }, [dispatch, dayTasks.date]);

  const addDayTask = useCallback((task: Task) =>  dispatch(addTask(task)), [dispatch]);
  const getTitle = () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      return today === dayTasks.date ? "TODAY" : dayTasks.date.replaceAll('-', '/');
  }

  return (
    <Board title={`${getTitle()}`}>
      <TaskInput tasks={dayTasks.tasks} addDayTask={addDayTask} />
      <TaskList />
  </Board>
  )
}

export default TodayBoard;