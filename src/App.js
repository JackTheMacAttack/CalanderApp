import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import React, {useState, useEffect} from 'react';

import CalanderFace from './calanderFace';

// const getWikipediaSummary = async (holidayName) => {
//   const apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${holidayName}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const pages = response.data.query.pages;
//     const pageId = Object.keys(pages)[0];
//     const summary = pages[pageId].extract;
//     return summary;
//   } catch (error) {
//     console.error('Error fetching holiday summary from Wikipedia:', error);
//     throw error;
//   }
// };

// const fetchHolidayFacts = async (holidayName) => {
//   try {
//     const summary = await getWikipediaSummary(holidayName);
//     console.log('Holiday summary:', summary);
//   } catch (error) {
//     console.error('Error fetching holiday facts:', error);
//   }
// };



// fetchHolidayFacts("Christmas");

// async function getPublicHolidays(year, countryCode) {
//   const apiUrl = `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const holidays = response.data;
//     return holidays;
//   } catch (error) {
//     console.error('Error fetching public holidays:', error);
//     throw error;
//   }
// }

// (async () => {
//   const year = 2023;
//   const countryCode = 'US'; // Replace with your desired country code

//   try {
//     const holidays = await getPublicHolidays(year, countryCode);
//     console.log(`Public holidays in ${countryCode} for ${year}:`, holidays);
//   } catch (error) {
//     console.error('Error fetching public holidays:', error);
//   }
// })();

function App() {



  return (
    <div className="App">
      <CalanderFace />
    </div>
  );
}

export default App;
