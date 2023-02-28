import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface MonthTasksState {
  month: string;
  tasks: Task[];
};

const initialState = { month: format(new Date(), 'yyyy-MM-dd'), tasks: [] } as MonthTasksState;

export const monthTasksSlice = createSlice({
  name: "monthTasks",
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    assignTasks: (state, action: PayloadAction<Task[]>) => {
      const tasks = action.payload;
      state.tasks.splice(0, state.tasks.length);
      for (const task of tasks) {
        state.tasks.push(task);
      }
    },
  }
});

export const { setMonth, assignTasks } = monthTasksSlice.actions;
export default monthTasksSlice.reducer;