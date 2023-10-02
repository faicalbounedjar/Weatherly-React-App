import axios from "axios";
import React, { useState } from "react";

function App() {
  // fetch data data.coord.lon + lat
  // const url =
  //   "http://api.openweathermap.org/geo/1.0/direct?q=algeria&appid=521c6049f18e4cad09713edd93bbae71";
  const [data, setData] = useState({});
  const [location, setlocation] = useState("");
  const [lat, setLat] = useState(36.4702);
  const [lon, setLon] = useState(2.8288);
  // const [obj, setObj] = useState({ lat: 36.7753606, lon: 3.0601882 });

  // change this
  const url1 = `check openweatherapi to get your api`;
  // this code changes based on the api you are fetching from
  // in my case i had to get the coordination of each location in order to get the information on it that's why i used two urls
  const searchLocation = async (event) => {
    if (location !== "") {
      if (event.key === "Enter") {
        setlocation(location);

        try {
          const locationResponse = await axios.get(url1);
          const { lat, lon } = locationResponse.data[0];

          setLat(lat);
          setLon(lon);

          const weatherResponse = await axios.get(
            `check openweatherapi to get your api`
          );
          // Update the data after both lat and lon are set and the weather data is fetched
          setData(weatherResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  return (
    <div className=" h-screen w-full absolute   bg-black/40 text-white bg-special">
      <div className=" text-center py-5    ">
        <input
          type="text"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          className="  md:w-[400px] lg:w-[700px]  relative left-0 right-0 px-5 placeholder:text-white/20 focus:outline-none duration-300  text-white bg-white/10 py-2 text-center border border-white rounded-lg"
        />
      </div>
      <div className=" m-auto px-4 relative top-[10%] flex flex-col justify-between">
        <div className="w-full my-4 mx-auto ">
          <div>
            <p className="font-bold text-2xl lg:text-4xl">{data.name}</p>
          </div>
          <div>
            {data.main ? (
              <h1 className=" text-6xl md:text-9xl font-bold">
                {data.main.temp} °F
              </h1>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {data.weather ? (
              <p className="relative right-[-90%] text-2xl md:text-4xl rotated">
                {data.weather[0].main}
              </p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* bottom */}
        <div className=" left-0 right-0 h-full mt-96 mx-4 absolute">
          <div className="  flex justify-evenly text-center my-4 relative  bottom-0 p-4 rounded-lg  bg-white/20">
            {data.main && data.wind ? (
              <>
                <div>
                  <p className="font-bold text-2xl">{data.main.feels_like}</p>
                  <p>Feels Like</p>
                </div>
                <div>
                  <p className="font-bold text-2xl">{data.main.humidity} %</p>
                  <p>Humidity</p>
                </div>
                <div>
                  <p className="font-bold text-2xl">{data.wind.speed}</p>
                  <p>Wind speed</p>
                </div>
              </>
            ) : (
              <div className="text-4xl">
                Insert The Location you want to see
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
