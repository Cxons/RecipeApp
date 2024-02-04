/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addMonths, isSameMonth } from "date-fns";

export default function CreateSchedule() {
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState(nextMonth);

  const check = isSameMonth(today, month);
  console.log("the check", check);

  const footer = (
    <button
      disabled={isSameMonth(today, month)}
      onClick={() => setMonth(today)}
    >
      Go to Today
    </button>
  );

  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      month={month}
      onMonthChange={setMonth}
      footer={footer}
      fromYear={2019}
      toYear={2025}
      showOutsideDays
    />
  );
}
