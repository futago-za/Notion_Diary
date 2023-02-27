import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled'
import Board from "./Board";
import FullCalendar from '@fullcalendar/react'
import { DatesSetArg, DayCellContentArg } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { fetchMonthTasks } from '../utils/connection';
import '../calendar.css';
import { format } from 'date-fns';

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
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const monthTasks = await fetchMonthTasks(new Date());
      if (monthTasks) {
        setTasks(monthTasks);
      }
    })();
  }, [currentMonth]);

  // const handleDateChanges = (arg: DatesSetArg) => {
  //   let month = arg.start;
  //   if (month.getMonth() + 1 !== arg.end.getMonth()) {
  //     month.setMonth(month.getMonth() + 1);
  //   }
    
  //   if (month.getMonth() !== currentMonth.getMonth()) {
  //     setCurrentMonth(month);
  //   }
  // };

  const handleDateClick = useCallback((arg: DateClickArg) => {
    alert(arg.dateStr);
  }, []);

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
        events={tasks.map((task: Task) => { return {title: task.title, date: task.date }})}
        // datesSet={handleDateChanges}
        dateClick={handleDateClick}
      />
    </Board>
  )
}

export default CalendarBoard;