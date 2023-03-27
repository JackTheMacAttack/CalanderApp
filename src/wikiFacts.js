import React, { useState, useEffect } from "react";
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
  } catch (error) {
    console.error("Error fetching holiday facts:", error);
  }
};

fetchHolidayFacts("Christmas");

export default fetchHolidayFacts;
