import { useState, useEffect } from 'react';
import Board from "./Board";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { fetchDayTasks } from '../utils/connection';

const TodayBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const todayTasks = await fetchDayTasks(new Date());
      if (todayTasks) {
        setTasks(todayTasks);
      }
    })();
  }, []);

  return (
    <Board title="TODAY'S TASK">
      <TaskInput tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
  </Board>
  )
}

export default TodayBoard;