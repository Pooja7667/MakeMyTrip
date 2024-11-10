import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../Redux/searchSlice";

const Search = () => {
  const [word, setWord] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const hendalSubmitt = (e) => {
    e.preventDefault();
    dispatch(search(word));
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <form className="bg-red-800 p-4 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6">
        {/* Destination Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            className="block text-gray-900 font-medium mb-1"
            htmlFor="destination"
          >
            Destination
          </label>
          <input
            id="destination"
            type="text"
            value={word}
            onChange={handleChange}
            placeholder="Enter destination"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Occupancy Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            className="block text-gray-900 font-medium mb-1"
            htmlFor="occupancy"
          >
            Occupancy
          </label>
          <input
            id="occupancy"
            type="number"
            placeholder="Guests"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            className="block text-gray-900 font-medium mb-1"
            htmlFor="price"
          >
            Price Range
          </label>
          <input
            id="price"
            type="text"
            placeholder="Price range"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Check-in Date Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            className="block text-gray-900 font-medium mb-1"
            htmlFor="check-in"
          >
            Check-in
          </label>
          <input
            id="check-in"
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Check-out Date Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            className="block text-gray-900 font-medium mb-1"
            htmlFor="check-out"
          >
            Check-out
          </label>
          <input
            id="check-out"
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          onClick={hendalSubmitt}
          className="bg-black text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-md mt-4 md:mt-0 w-full md:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
