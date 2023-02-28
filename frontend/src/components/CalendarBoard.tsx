import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'
import Board from "./Board";
import FullCalendar from '@fullcalendar/react'
import { DatesSetArg, DayCellContentArg } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { fetchMonthTasks } from '../utils/connection';
import { format } from 'date-fns';
import { RootState } from '../redux/store';
import { getMonthTasks } from '../redux/MonthTasks/selector';
import '../calendar.css';
import { setDate } from '../redux/DayTasks/slice';
import { assignTasks, setMonth } from '../redux/MonthTasks/slice';

const CircleNumber = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-flow: column;
  vertical-align: top;
  background: #eb5757;
  color: white;
  width: 30px;
  height: 30px;
`

const renderDayCell = (e: DayCellContentArg) => {
  const { date, dayNumberText, isToday } = e
  const replaceDayNumberText = dayNumberText.replace('日', '')

  return isToday ? (
    <CircleNumber>{replaceDayNumberText}</CircleNumber>
  ) : dayNumberText === '1日' ? (
    <>{format(date, 'M月d日')}</>
  ) : (
    <>{replaceDayNumberText}</>
  )
}

const CalendarBoard = () => {
  const monthTasks = useSelector((state: RootState) => getMonthTasks(state));
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const tasks = await fetchMonthTasks(monthTasks.month);
      if (tasks) {
        dispatch(assignTasks(tasks));
      }
    })();
  }, [dispatch, monthTasks.month]);

  const handleDateChanges = (arg: DatesSetArg) => {
    const startDate = new Date(arg.start.getFullYear(), arg.start.getMonth());
    const endDate = new Date(arg.end.getFullYear(), arg.end.getMonth());
    let displayedDate = startDate;
    if (startDate.getMonth() + 1 !== endDate.getMonth()) {
      displayedDate.setMonth(displayedDate.getMonth() + 1);
    }
    let monthStr = format(displayedDate, 'yyyy-MM-dd');
    if (monthStr !== monthTasks.month) {
      dispatch(setMonth(monthStr));
    }
  };

  const handleDateClick = useCallback((arg: DateClickArg) => {
    dispatch(setDate(format(new Date(arg.dateStr), 'yyyy-MM-dd')));
  }, [dispatch]);

  return (
    <Board title="SCHEDULE">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locales={[jaLocale]}
        locale="ja"
        initialView="dayGridMonth"
        aspectRatio={1.6}
        dayCellContent={renderDayCell}
        headerToolbar={{ left: 'title', center: '', right: 'prev today next' }}
        businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
        eventBackgroundColor={'#FFFFFF'}
        eventBorderColor={'#acaba9'}
        eventTextColor={'#37362f'}
        events={monthTasks.tasks}
        datesSet={handleDateChanges}
        dateClick={handleDateClick}
      />
    </Board>
  )
}

export default CalendarBoard;