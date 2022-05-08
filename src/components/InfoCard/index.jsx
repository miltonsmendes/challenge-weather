import {useState} from 'react';
import "./styles.scss";

export function InfoCard(props) {
  const { info, updatedAt } = props;
  const [selectedCard, setSelectedCard] = useState(false);

  const time = new Date(updatedAt).toLocaleTimeString("en-US");

  function handleSelect(){
    setSelectedCard(!selectedCard);
  }

  return (
    <div className="card-container" onClick={handleSelect}>
      <div className="title-container">
        <div className="city-name">
          {info.name}, {info.sys && info.sys.country}
        </div>
      </div>
      <div className="info-container">
           <div
          className={
            (info.main && info.main.temp) > 24
              ? "info-temperature hot"
              : (info.main && info.main.temp) > 4
              ? "info-temperature warm"
              : "info-temperature cold"
          }
        >
          {info.main && info.main.temp.toFixed(0)}°
        </div>
      </div>

      <div className="footer-container">
        <div className={selectedCard ? "info-details" : "hidden"}>
          <div className="details-container">
            <div className="detail-label">HUMIDITY</div>
            <div className="detail-humidity">
              {info.main && info.main.humidity}
            </div>
          </div>
          <div className="details-container">
            <div className="detail-label">PRESSURE</div>
            <div className="detail-pressure">
              {info.main && info.main.pressure}
            </div>
          </div>
        </div>
        <div className="update-text">Updated at {time}</div>
      </div>
    </div>
  );
}
