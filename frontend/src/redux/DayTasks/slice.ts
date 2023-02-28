import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface dayTasksState {
  date: string;
  tasks: Task[];
};

const initialState = {date: format(new Date(), 'yyyy-MM-dd'), tasks: []} as dayTasksState;

export const dayTasksSlice = createSlice({
  name: "dayTasks",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    assignTasks: (state, action: PayloadAction<Task[]>) => {
      const tasks = action.payload;
      state.tasks.splice(0, state.tasks.length);
      for (const task of tasks) {
        state.tasks.push(task);
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{index: number, done: boolean}>) => {
      const { index, done } = action.payload; 
      state.tasks[index].done = done;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const index = state.tasks.findIndex((elem) => elem.id === taskId);
      state.tasks.splice(index, 1);
    },
  }
});

export const { setDate, assignTasks, addTask, updateTask, deleteTask} = dayTasksSlice.actions;
export default dayTasksSlice.reducer;