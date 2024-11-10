import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PageCard = ({ item }) => {
  const [hotelData, setHotelData] = useState(null);
  const hotelAPI = item._links?.["acf:attachment"]?.[0]?.href;

  const fetchData = async () => {
    try {
      if (hotelAPI) {
        const res = await axios.get(hotelAPI);
        setHotelData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch hotel data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hotelAPI]);

  return (
    <div className="flex flex-col md:flex-row rounded-lg shadow-lg border my-4 p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <Link to={`/home/${item.id}`}>
          <img
            src={
              hotelData?.guid?.rendered ||
              "http://api.elixirtrips.com/wp-content/uploads/2024/03/Lapita-Dubai-Parks-and-Resorts-Autograph-Collection-44.webp"
            }
            alt="Hotel"
            className="w-full h-40 object-cover rounded-lg"
          />
        </Link>

        <div className="flex flex-wrap justify-start space-x-2 mt-2">
          {/* Sample Gallery Images */}
          {Array(4)
            .fill("")
            .map((_, index) => (
              <img
                key={index}
                src={hotelData?.guid?.rendered}
                alt="Gallery"
                className="w-10 h-10 object-cover rounded"
              />
            ))}
          <button className="text-blue-600 underline">View All</button>
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        {/* Hotel Title and Rating */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-2 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800">
              {item.title.rendered}
            </h3>
            {/* <p className="text-blue-600 underline">
              {item.acf?.hotel_name || "Near City Center"}
            </p> */}
          </div>

          {/* <div className="text-sm md:text-base text-gray-700">
            {item.acf?.hotel_address}
          </div> */}

          <div className="flex items-center space-x-1 mt-2 md:mt-0">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm">
              4.0
            </span>
            <p className="text-gray-600 text-sm">(500 Ratings)</p>
          </div>
        </div>

        {/* Hotel Features */}
        <div className="flex flex-wrap gap-2 text-gray-600 mt-2">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
            Couple Friendly
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
            Gym
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
            Breakfast Included
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          {item.acf?.hotel ||
            "Convenient airport proximity, polite and courteous staff, clean and cozy rooms"}
        </p>

        {/* Pricing and Booking Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 space-y-4 md:space-y-0">
          <div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {item.acf?.["rate-per-night"] || "₹4,500"}
            </p>
            <p className="text-gray-600 text-sm">+ ₹1,656 taxes & fees</p>
          </div>
          <h1 className="text-sm md:text-base font-medium">
            Occupancy: {item.acf?.occupancy || "2 Adults"}
          </h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full md:w-auto">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
