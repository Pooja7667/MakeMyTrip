import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [hotelDetail, setHotelDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(id);
  // Fetch hotel details based on the ID
  const api = "http://api.elixirtrips.com/wp-json/wp/v2/hotels/20979";
  const fetchHotelDetail = async () => {
    try {
      const response = await axios(api);

      console.log("dd", response.data);

      setHotelDetail(response.data);
    } catch (err) {
         console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetail();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{hotelDetail.title.rendered}</h2>
      <img
        src={
          hotelDetail.acf?.hotel_image ||
          "http://api.elixirtrips.com/wp-content/uploads/2024/03/Lapita-Dubai-Parks-and-Resorts-Autograph-Collection-44.webp"
        }
        alt={hotelDetail.acf?.hotel_name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700">
        {hotelDetail.acf?.hotel_description || "No description available."}
      </p>
    </div>
  );
};

export default DetailPage;
