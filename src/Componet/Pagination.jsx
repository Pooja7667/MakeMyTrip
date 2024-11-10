import axios from "axios";
import React, { useEffect, useState } from "react";
import PageCard from "./PageCard";
import { useSelector } from "react-redux";

const Pagination = () => {
  const [data, setData] = useState([]); // All data from API
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Set data per page (10 items)
  const [loading, setLoading] = useState(false);

  // Redux state for search keyword
  const selecter = useSelector((state) => state.search.keyWord);

  // Fetch data from the API
  const fData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.elixirtrips.com/wp-json/wp/v2/hotels?per_page=100&page=1"
      );
      setData(res.data); // Set the fetched data
      setFilteredData(res.data); // Initially, set filtered data as the full data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fData();
  }, []);

  // Filter data based on the search keyword
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.acf.hotel_address.toLowerCase().includes(selecter.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [selecter, data]);

  // Get current data for pagination
  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination controls
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Hotel Listings</h2>

      {/* Loading state */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* Display filtered and paginated data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.length > 0 ? (
              currentData.map((item) => <PageCard key={item.id} item={item} />)
            ) : (
              <p className="text-center col-span-2">No results found.</p>
            )}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>

            <p className="text-gray-700">
              Page {currentPage} of {totalPages}
            </p>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
