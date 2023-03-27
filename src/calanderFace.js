import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./calander";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
// import fetchHolidayFacts from './wikiFacts';
import Module from "./module";

const getPublicHolidays = async (year, countryCode) => {
  const apiUrl = `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`;

  try {
    const response = await axios.get(apiUrl);
    const holidays = response.data;
    return holidays;
  } catch (error) {
    console.error("Error fetching public holidays:", error);
    throw error;
  }
};

const CalanderFace = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  //   const [month, setMonth] = useState(0);
  const year = 2023;
  const month = currentDate.getMonth();

  const [holidaySummaries, setHolidaySummaries] = useState("");
  const [holidayName, setHolidayName] = useState("");

  const [moduleOpen, setModuleOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const countryCode = "US"; // Replace with your desired country code

      try {
        const data = await getPublicHolidays(year, countryCode);
        setHolidays(data);

        console.log(holidaySummaries);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching public holidays.</div>;

  return (
    <div>
      <h1>Public holidays in {2023}:</h1>
      <Calendar
        year={2023}
        month={month}
        holidays={holidays}
        setHolidaySummaries={setHolidaySummaries}
        setModuleOpen={setModuleOpen}
        setHolidayName={setHolidayName}
      />
      <div className={"buttonbox"}>
        <button className={"calendarButton"} onClick={handlePrevMonth}>
          {" "}
          PREV MONTH{" "}
        </button>
        <button className="calendarButton" onClick={handleNextMonth}>
          {" "}
          NEXT MONTH{" "}
        </button>
      </div>

      <Module
        isOpen={moduleOpen}
        setModuleOpen={setModuleOpen}
        holidayInfo={holidaySummaries}
        holidayName={holidayName}
      />
    </div>
  );
};

export default CalanderFace;
