import { getDaysInMonth, subMonths } from "date-fns";
import { useState } from "react";

const DAYS_IN_WEEK = 7;
const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
const DEFAULT_TRASH_VALUE = 0;
const CALENDER_LENGTH = 35;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  const prevDays = Array.from({
    length: Math.max(0, currentDate.getDay()),
  }).map(() => DEFAULT_TRASH_VALUE);
  const currentDays = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );
  const nextDays = Array.from({
    length: CALENDER_LENGTH - currentDays.length - prevDays.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const allDays = [...prevDays, ...currentDays, ...nextDays];
  const weeks = [];
  for (let i = 0; i < allDays.length; i += DAYS_IN_WEEK) {
    weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
  }

  const setPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const setNextMonth = () => {
    setCurrentDate(subMonths(currentDate, -1));
  };

  return {
    weeks,
    currentDate,
    setPreviousMonth,
    setNextMonth,
    DAY_LIST,
  };
};

export default useCalendar;
