import { useState, useEffect } from "react";

import { Logo } from "../../components/Logo";
import { InfoCard } from "../../components/InfoCard";

import api from "../../services/api";

import "./styles.scss";

const key = process.env.REACT_APP_API_KEY;

export function MainPage() {
  //   const [data, setData] = useState({
  //     city1: {},
  //     city2: {},
  //     city3: {},
  //   });
  const [city1, setCity1] = useState({});
  const [city2, setCity2] = useState({});
  const [city3, setCity3] = useState({});
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    async function getData() {
      const cities = ["Nuuk", "Urubici", "Nairobi"];
      const time = new Date().toLocaleTimeString("en-US");

      await api
        .get(
          `/weather?q=${cities[0]}&appid=${key}&units=metric`
        )
        .then((res) => {
          //   setData({ ...data, city1: res.data });
          setCity1(res.data);
          localStorage.removeItem(`@challenge-wether:${cities[0]}`);
          localStorage.setItem(`@challenge-wether:${cities[0]}`, JSON.stringify(res.data));
        })

      await api
        .get(
          `/weather?q=${cities[1]}&appid=${key}&units=metric`
        )
        .then((res) => {
          //   setData({ ...data, city2: res.data });
          setCity2(res.data);
          localStorage.removeItem(`@challenge-wether:${cities[1]}`);
          localStorage.setItem(`@challenge-wether:${cities[1]}`, JSON.stringify(res.data));
        });

      await api
        .get(
          `/weather?q=${cities[2]}&appid=${key}&units=metric`
        )
        .then((res) => {
          //   setData({ ...data, city3: res.data });
          setCity3(res.data);
          localStorage.removeItem(`@challenge-wether:${cities[2]}`);
          localStorage.setItem(`@challenge-wether:${cities[2]}`, JSON.stringify(res.data));
        });

      setLastUpdate(time);
    }
    getData();
    
    // setInterval(getData, 600000);
  }, []);

  return (
    <div className="container">
      <div className="header-container"><Logo /></div>
      <div className="content-container">
        <div className="cards-container">
          {/* {data.city1 && data.city2 && data.city3 && ( */}
          {city1 && city2 && city3 && (
            <>
              {/* <InfoCard info={data.city1} />
              <InfoCard info={data.city2} />
              <InfoCard info={data.city3} /> */}

              <InfoCard info={city1} updatedAt={lastUpdate} />
              <InfoCard info={city2} updatedAt={lastUpdate} />
              <InfoCard info={city3} updatedAt={lastUpdate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
