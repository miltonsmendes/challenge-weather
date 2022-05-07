import { useState, useEffect } from "react";

import { Logo } from "../../components/Logo";
import { InfoCard } from "../../components/InfoCard";

import api from "../../services/api";

import "./styles.scss";

const key = process.env.REACT_APP_API_KEY;

export function MainPage() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    async function getData() {
      const cities = ["Nuuk", "Urubici", "Nairobi"];
      const time = new Date().toLocaleTimeString("en-US");

      await api
        .get(`/weather?q=${cities[0]}&appid=${key}&units=metric`)
        .then((res) => {
          setData(prevState => ({ ...prevState, city1: res.data }));
          localStorage.removeItem(`@challenge-wether:${cities[0]}`);
          localStorage.setItem(
            `@challenge-wether:${cities[0]}`,
            JSON.stringify(res.data)
          );
        });

      await api
        .get(`/weather?q=${cities[1]}&appid=${key}&units=metric`)
        .then((res) => {
          setData(prevState => ({ ...prevState, city2: res.data }));
          localStorage.removeItem(`@challenge-wether:${cities[1]}`);
          localStorage.setItem(
            `@challenge-wether:${cities[1]}`,
            JSON.stringify(res.data)
          );
        });

      await api
        .get(`/weather?q=${cities[2]}&appid=${key}&units=metric`)
        .then((res) => {
          setData(prevState => ({ ...prevState, city3: res.data }));
          localStorage.removeItem(`@challenge-wether:${cities[2]}`);
          localStorage.setItem(
            `@challenge-wether:${cities[2]}`,
            JSON.stringify(res.data)
          );
        });

      setLastUpdate(time);
    }
    getData();

    // setInterval(getData, 600000);
  }, []);

  console.log("Resposta setada", data);

  return (
    <div className="container">
      <div className="header-container">
        <Logo />
      </div>
      <div className="content-container">
        <div className="cards-container">
          {data &&
          Object.values(data).map(card => 
              <InfoCard info={card} updatedAt={lastUpdate} />
            )}
        </div>
      </div>
    </div>
  );
}
