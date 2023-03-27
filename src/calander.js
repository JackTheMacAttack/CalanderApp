import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
  format,
} from "date-fns";
import axios from "axios";

const getWikipediaSummary = async (holidayName) => {
  const apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${holidayName}`;

  try {
    const response = await axios.get(apiUrl);
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const summary = pages[pageId].extract;
    return summary;
  } catch (error) {
    console.error("Error fetching holiday summary from Wikipedia:", error);
    throw error;
  }
};

const fetchHolidayFacts = async (holidayName) => {
  try {
    const summary = await getWikipediaSummary(holidayName);

    console.log("Holiday summary:", summary);
    return summary;
  } catch (error) {
    console.error("Error fetching holiday facts:", error);
  }
};

const Calendar = ({
  year,
  month,
  holidays,
  setHolidaySummaries,
  setModuleOpen,
  setHolidayName,
}) => {
  const startDate = startOfMonth(new Date(year, month));
  const endDate = endOfMonth(startDate);

  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const holidayDates = holidays.map((holiday) => holiday.date);

  return (
    <div className="calendar">
      <h2>{format(startDate, "MMMM yyyy")}</h2>
      <div className="calendar-grid">
        {dates.map((date) => {
          const isHoliday = holidayDates.includes(format(date, "yyyy-MM-dd"));
          let name = "";

          if (isHoliday) {
            const holiday = holidays.find(
              (h) => h.date === format(date, "yyyy-MM-dd")
            );
            name = holiday.name;
          }

          return (
            <div
              key={date}
              className={`calendar-date ${isHoliday ? "holiday" : ""}`}
              title={
                isHoliday
                  ? holidays.find((h) => h.date === format(date, "yyyy-MM-dd"))
                      .name
                  : ""
              }
            >
              <h1>{date.getDate()}</h1>
              <h2>{isHoliday ? name : ""}</h2>
              {isHoliday ? (
                <button
                  onClick={async () => {
                    try {
                      const holidaySum = await fetchHolidayFacts(name);
                      setHolidaySummaries(holidaySum);
                      setHolidayName(name);
                      setModuleOpen(true);
                    } catch (error) {}
                  }}
                >
                  Click
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
