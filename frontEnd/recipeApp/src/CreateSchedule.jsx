/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addMonths, isSameMonth } from "date-fns";

export default function CreateSchedule() {
  const today = new Date();
  const nextmonth = addMonths(today, 1);
  const [month, setMonth] = useState(today);
  const footer = <button disabled={isSameMonth(today, month)}></button>;
  return (
    <div>
      <DayPicker month={month} onMonthChange={setMonth} footer={footer} />
    </div>
  );
}
