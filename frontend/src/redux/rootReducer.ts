import { combineReducers } from "@reduxjs/toolkit";
import dayTasks from './DayTasks/slice';
import monthTasks from './MonthTasks/slice';

const rootReducer = combineReducers({
  dayTasks,
  monthTasks,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;