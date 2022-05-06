import "./styles.scss";

export function InfoCard(props) {

  const {info, updatedAt} = props;

  return (
    <div className="card-container">
      <div className="title-container">
        <div className="city-name">{info.name}</div>
      </div>
      <div className="info-container">
        <div className="info-temperature">{info.main && info.main.temp}</div>

        <div className="info-details">
          <div className="info-humidity">{info.main && info.main.humidity}</div>
          <div className="info-pressure">{info.main && info.main.pressure}</div>
        </div>
      </div>
      <div className="footer-container">
        <div className="update-text">{updatedAt}</div>
      </div>
    </div>
  );
}
