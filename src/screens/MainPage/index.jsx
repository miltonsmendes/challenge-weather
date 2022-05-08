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
      return await api.get(`/weather?q=${city}&appid=${key}&units=metric`);
    });

    try {
      const citiesWeatherRes = await Promise.all(promises);

      const citiesWeather = citiesWeatherRes.map((res) => res.data);

      setData(citiesWeather);

      const localStorageData = {
        time: new Date(),
        data: citiesWeather,
      };

      localStorage.setItem(
        `@challenge-wether:cities`,
        JSON.stringify(localStorageData)
      );
    } catch (error) {
      // setError(error);
    }
  }

  function validateTime(time) {
    // Calculo em milisegundos entre a hora atual atual e a armazenada no localstorage
    const currentTime = new Date();
    const formattedStorageTime = new Date(time);
    const resultTime = currentTime - formattedStorageTime;

    if (resultTime < 599999) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const localStorageDataString = localStorage.getItem(
      "@challenge-wether:cities"
    );
    const localStorageData = localStorageDataString
      ? JSON.parse(localStorageDataString)
      : null;

    function renewData() {
      if (localStorageData && validateTime(localStorageData.time)) {
        setData(localStorageData.data);

        const time = localStorageData.time;
        setLastUpdate(time);
      } else {
        getData();
        const time = new Date();
        setLastUpdate(time);
      }
    }

    if (localStorageDataString != null) {
      const nextUpdate =
        600000 - (new Date() - new Date(localStorageData.time));
      setTimeout(renewData, nextUpdate);
    }

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
                <InfoCard info={card} updatedAt={lastUpdate} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
