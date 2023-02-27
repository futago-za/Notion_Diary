import fetcher from './fetcher'
import { format } from 'date-fns'

const getDateString = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
}

export const createTask = async (title: string): Promise<Task | null> => {
  const task = await fetcher<Task>(`http://localhost:8000/api/tasks/`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title})
  }).catch((err) => {
    console.log(err);
    return null;
  });
  return task;
}

export const fetchDayTasks = async (date: Date): Promise<Task[] | null> => {
  const query = `date=${getDateString(date)}`;
  return await fetchTasks(query); 
}

export const fetchMonthTasks = async (date: Date): Promise<Task[] | null> => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const query = `start=${getDateString(start)}&end=${getDateString(end)}`;
  return await fetchTasks(query);
}

const fetchTasks = async (query: string): Promise<Task[] | null> => {
  const tasks = await fetcher<Task[]>(`http://localhost:8000/api/tasks?${query}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((err) => {
    console.log(err);
    return null;
  });
  return tasks;
}

export const updateTask = async (task: Task) => {
  await fetcher<void>(`http://localhost:8000/api/tasks/${task.id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).catch((err) => {
    console.log(err);
  });
}
