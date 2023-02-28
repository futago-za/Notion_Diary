import fetcher from './fetcher'
import { format } from 'date-fns'

const HOST_NAME = process.env.REACT_APP_BACKEND_HOST_NAME;
const PORT = process.env.REACT_APP_BACKEND_PORT;

const getDateString = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
}

export const createTask = async (title: string, date: string): Promise<Task | null> => {
  const task = await fetcher<Task>(`http://${HOST_NAME}:${PORT}/api/tasks/`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title, date})
  }).catch((err) => {
    console.log(err);
    return null;
  });
  return task;
}

export const fetchDayTasks = async (date: string): Promise<Task[] | null> => {
  const query = `date=${date}`;
  return await fetchTasks(query); 
}

export const fetchMonthTasks = async (date: string): Promise<Task[] | null> => {
  const tmp = new Date(date);
  const start = new Date(tmp.getFullYear(), tmp.getMonth() -2, 1);
  const end = new Date(tmp.getFullYear(), tmp.getMonth() + 3, 0);
  const query = `start=${getDateString(start)}&end=${getDateString(end)}`;
  return await fetchTasks(query);
}

const fetchTasks = async (query: string): Promise<Task[] | null> => {
  const tasks = await fetcher<Task[]>(`http://${HOST_NAME}:${PORT}/api/tasks?${query}`, {
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
  await fetcher<void>(`http://${HOST_NAME}:${PORT}/api/tasks/${task.id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).catch((err) => {
    console.log(err);
  });
}

export const deleteTask = async (id: string) => {
  await fetcher<void>(`http://${HOST_NAME}:${PORT}/api/tasks/${id}`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((err) => {
    console.log(err);
  });
}
