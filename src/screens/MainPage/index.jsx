import { useState, useEffect } from "react";

import { Logo } from "../../components/Logo";
import { InfoCard } from "../../components/InfoCard";

import api from "../../services/api";

import "./styles.scss";

const key = process.env.REACT_APP_API_KEY;

export function MainPage() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  async function getData() {
    const cities = ["Nuuk", "Urubici", "Nairobi"];

    const promises = cities.map(async (city) => {
      const res = await api.get(`/weather?q=${city}&appid=${key}&units=metric`);

      return res;
    });

    const results = await Promise.all(promises.map((p) => p.catch((e) => e)));

    const formattedResult = results.map((res) => {
      if (!(res instanceof Error)) {
        return res;
      } else {
        return {
          data: {
            id: "Error",
            name: "City not found",
            cod: "404",
            message: "city not found",
          },
        };
      }
    });

    const citiesWeather = formattedResult.map((res) => res.data);

    setData(citiesWeather);

    const localStorageData = {
      time: new Date(),
      data: citiesWeather,
    };

    localStorage.setItem(
      `@challenge-wether:cities`,
      JSON.stringify(localStorageData)
    );
  }

  function validateTime(time) {
    // Calculation in milliseconds between the current time and the time stored in localstorage
    const currentTime = new Date();
    const formattedStorageTime = new Date(time);
    const resultTime = currentTime - formattedStorageTime;

    if (resultTime < 600000) {
      return true;
    } else {
      return false;
    }
  }

  const localStorageDataString = localStorage.getItem(
    "@challenge-wether:cities"
  );
  const localStorageData = localStorageDataString
    ? JSON.parse(localStorageDataString)
    : null;

  if (localStorageDataString != null) {
    const nextUpdate = 600000 - (new Date() - new Date(localStorageData.time));
    setTimeout(renewData, nextUpdate);
  }

  function renewData() {
    if (localStorageData) {
      const error = localStorageData.data.filter((e) => {
        return e.id === "Error";
      });

      if (error.length > 0) {
        getData();
        const time = new Date();
        setLastUpdate(time);
      } else {
        if (validateTime(localStorageData.time)) {
          setData(localStorageData.data);
          const time = localStorageData.time;
          setLastUpdate(time);
        } else {
          getData();
          const time = new Date();
          setLastUpdate(time);
        }
      }
    } else {
      getData();
      const time = new Date();
      setLastUpdate(time);
    }
  }

  useEffect(() => {
    renewData();
    setInterval(renewData, 600000);
  }, []);

  return (
    <div className="container">
      <div className="header-container">
        <Logo />
      </div>
      <div className="content-container">
        <div className="cards-container">
          {data &&
            Object.values(data).map((card) => (
              <div key={card.id}>
                <InfoCard
                  info={card}
                  updatedAt={lastUpdate}
                  newRequest={renewData}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
