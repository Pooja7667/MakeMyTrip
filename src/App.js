import React, { useEffect, useState } from "react";
import axios from "axios";
import HotalCard from "./Componet/HotalCard";
import Search from "./Componet/Search";
import Pagination from "./Componet/Pagination";

const App = () => {
  const [data, setData] = useState([]);

  const fatchData = async () => {
    try {
      const respones = await axios(
        "https://api.elixirtrips.com/wp-json/wp/v2/hotels"
      );
      setData(respones.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  console.log("data", data);

  return (
    <>
      <div>
        <Search />
        <Pagination />
      </div>
    </>
  );
};

export default App;
