import axios from "axios";
import React, { useEffect, useState } from "react";

const HotalCard = ({ item }) => {
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
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg border my-4 p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <img
          src={
            hotelData?.guid?.rendered ||
            "http://api.elixirtrips.com/wp-content/uploads/2024/03/Lapita-Dubai-Parks-and-Resorts-Autograph-Collection-44.webp"
          }
          alt="Hotel Image"
          className="w-full h-48 md:h-40 lg:h-48 object-cover rounded-lg"
        />
        <div className="flex flex-wrap justify-start space-x-2 mt-2">
          {/* Gallery Thumbnails */}
          {Array(3)
            .fill("")
            .map((_, index) => (
              <img
                key={index}
                src={hotelData?.guid?.rendered}
                alt="Gallery"
                className="w-10 h-10 object-cover rounded-lg"
              />
            ))}
         
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="w-full md:w-2/3 pl-0 md:pl-4 flex flex-col justify-between">
        {/* Hotel Title and Ratings */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              {item.title.rendered}
            </h3>
            <p className="text-blue-600 underline text-sm">
              {item.acf?.hotel_name || "Near City Center"}
            </p>
          </div>
          <div className="flex items-center space-x-1 mt-2 md:mt-0">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm">
              4.0
            </span>
            <p className="text-gray-600 text-sm">(2352 Ratings)</p>
          </div>
        </div>

        {/* Features Badges */}
        <div className="flex flex-wrap gap-2 text-gray-600 mt-2">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-xs">
            Couple Friendly
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-xs">
            Gym
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-xs">
            Breakfast Included
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          {item.acf?.description ||
            "Convenient airport proximity, courteous staff, clean and cozy rooms"}
        </p>

        {/* Pricing and Booking Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 space-y-4 md:space-y-0">
          <div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">
              ₹9,323
            </p>
            <p className="text-gray-600 text-sm">+ ₹1,656 taxes & fees</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 w-full md:w-auto">
            Login to Book Now & Pay Later!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotalCard;
