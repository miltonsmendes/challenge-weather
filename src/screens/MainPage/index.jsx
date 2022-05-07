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

      cities.map((city) => {
        api.get(`/weather?q=${city}&appid=${key}&units=metric`).then((res) => {
          setData((prevState) => ({ ...prevState, [city]: res.data }));
          localStorage.removeItem(`@challenge-wether:${city}}`);
          localStorage.setItem(
            `@challenge-wether:${city}`,
            JSON.stringify(res.data)
          );
        });
      });

      setLastUpdate(time);
    }
    getData();

    // setInterval(getData, 600000);
  }, []);

  // console.log("Resposta setada", data);

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
